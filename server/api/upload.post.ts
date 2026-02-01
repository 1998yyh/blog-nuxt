import { readFiles } from 'h3-formidable';
import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { defineEventHandler, createError, getHeader } from 'h3';

const execPromise = promisify(exec);

// Git 同步函数
async function gitSync() {
    try {
        console.log('Git sync: Starting...');
        // 1. Add
        await execPromise('git add content/');
        // 2. Commit
        try {
            await execPromise('git commit -m "cms: auto upload content"');
        } catch (e) {
            console.log('Git sync: Nothing to commit');
            return;
        }
        // 3. Push
        await execPromise('git push');
        console.log('Git sync: Push successful');
    } catch (error) {
        console.error('Git sync failed:', error);
    }
}

// 简单的 Markdown Frontmatter 解析/生成工具
function parseFrontmatter(content: string) {
    const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) return { data: {}, content };

    const data: Record<string, string> = {};
    const yamlLines = match[1].split('\n');
    yamlLines.forEach(line => {
        const [key, ...values] = line.split(':');
        if (key && values.length) {
            data[key.trim()] = values.join(':').trim();
        }
    });

    return { data, content: match[2].trim() };
}

function stringifyFrontmatter(data: Record<string, any>, content: string) {
    let yaml = '---\n';
    for (const [key, value] of Object.entries(data)) {
        if (value !== undefined && value !== null) {
            yaml += `${key}: ${value}\n`;
        }
    }
    yaml += '---\n';
    return yaml + content;
}

export default defineEventHandler(async (event) => {
    // 1. 验证 API Key
    const config = useRuntimeConfig();
    const apiKey = config.apiKey || process.env.API_KEY;
    const authHeader = getHeader(event, 'Authorization');

    if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized: Invalid API Key',
        });
    }

    // 2. 解析表单数据
    const { fields, files } = await readFiles(event);

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No file uploaded',
        });
    }

    const category = (Array.isArray(fields.category) ? fields.category[0] : fields.category) || 'tech';
    const slug = (Array.isArray(fields.slug) ? fields.slug[0] : fields.slug) || file.originalFilename?.replace(/\.md$/, '') || 'untitled';

    // 3. 读取并处理内容
    const rawContent = await fs.readFile(file.filepath, 'utf-8');
    const { data: internalData, content: bodyContent } = parseFrontmatter(rawContent);

    // 4. 合并元数据
    const getFieldValue = (key: string) => {
        const val = fields[key];
        return Array.isArray(val) ? val[0] : val;
    };

    const finalData = {
        title: getFieldValue('title') || internalData.title || (bodyContent.split('\n')[0].replace(/^#\s*/, '').trim()) || slug,
        description: getFieldValue('description') || internalData.description || '',
        date: getFieldValue('date') || internalData.date || new Date().toISOString().split('T')[0],
        tags: getFieldValue('tags') ? (getFieldValue('tags') as string).split(',').map(t => t.trim()) : internalData.tags || [],
        category,
    };

    const finalMarkdown = stringifyFrontmatter(finalData, bodyContent);

    // 5. 写入磁盘
    const targetDir = path.join(process.cwd(), 'content', category as string);
    await fs.mkdir(targetDir, { recursive: true });

    const targetPath = path.join(targetDir, `${slug}.md`);
    await fs.writeFile(targetPath, finalMarkdown, 'utf-8');

    // 6. 执行 Git 同步 (异步执行，不阻塞 API)
    gitSync();

    return {
        success: true,
        path: `/content/${category}/${slug}.md`,
        data: finalData
    };
});
