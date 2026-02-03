import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Config>{
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            typography: (theme: any) => ({
                DEFAULT: {
                    css: {
                        'code::before': {
                            content: '""'
                        },
                        'code::after': {
                            content: '""'
                        },
                        maxWidth: '65ch',
                        color: 'var(--tw-prose-body)',
                        a: {
                            color: 'var(--tw-prose-links)',
                            textDecoration: 'none',
                            fontWeight: '500',
                            '&:hover': {
                                color: theme('colors.violet.500'),
                                textDecoration: 'underline',
                            },
                        },
                        h1: {
                            color: 'var(--tw-prose-headings)',
                            fontWeight: '800',
                            letterSpacing: '-0.025em',
                        },
                        h2: {
                            color: 'var(--tw-prose-headings)',
                            fontWeight: '700',
                            letterSpacing: '-0.025em',
                            marginTop: '2em',
                        },
                        h3: {
                            color: 'var(--tw-prose-headings)',
                            fontWeight: '600',
                            marginTop: '1.5em',
                        },
                        'code': {
                            color: 'var(--tw-prose-code)',
                            backgroundColor: theme('colors.violet.50'),
                            borderRadius: '0.25rem',
                            paddingLeft: '0.25rem',
                            paddingRight: '0.25rem',
                            paddingTop: '0.125rem',
                            paddingBottom: '0.125rem',
                            fontWeight: '600',
                        },
                        'pre code': {
                            backgroundColor: 'transparent',
                            color: 'inherit',
                            fontSize: 'inherit',
                            fontWeight: 'inherit',
                            padding: '0',
                        },
                        blockquote: {
                            borderLeftColor: theme('colors.violet.500'),
                            color: 'var(--tw-prose-quotes)',
                            fontStyle: 'italic',
                        },
                    },
                },
                zinc: {
                    css: {
                        '--tw-prose-body': theme('colors.zinc.700'),
                        '--tw-prose-headings': theme('colors.zinc.900'),
                        '--tw-prose-links': theme('colors.violet.600'),
                        '--tw-prose-bold': theme('colors.zinc.900'),
                        '--tw-prose-counters': theme('colors.zinc.600'),
                        '--tw-prose-bullets': theme('colors.zinc.400'),
                        '--tw-prose-hr': theme('colors.zinc.200'),
                        '--tw-prose-quotes': theme('colors.zinc.900'),
                        '--tw-prose-quote-borders': theme('colors.violet.500'),
                        '--tw-prose-captions': theme('colors.zinc.500'),
                        '--tw-prose-code': theme('colors.violet.600'),
                        '--tw-prose-pre-code': theme('colors.zinc.100'),
                        '--tw-prose-pre-bg': theme('colors.zinc.900'),
                        '--tw-prose-th-borders': theme('colors.zinc.300'),
                        '--tw-prose-td-borders': theme('colors.zinc.200'),

                        // Dark mode
                        '--tw-prose-invert-body': theme('colors.zinc.200'),
                        '--tw-prose-invert-headings': theme('colors.white'),
                        '--tw-prose-invert-links': theme('colors.violet.400'),
                        '--tw-prose-invert-bold': theme('colors.white'),
                        '--tw-prose-invert-counters': theme('colors.zinc.400'),
                        '--tw-prose-invert-bullets': theme('colors.zinc.600'),
                        '--tw-prose-invert-hr': theme('colors.white/10'),
                        '--tw-prose-invert-quotes': theme('colors.zinc.100'),
                        '--tw-prose-invert-quote-borders': theme('colors.violet.400'),
                        '--tw-prose-invert-captions': theme('colors.zinc.400'),
                        '--tw-prose-invert-code': theme('colors.violet.300'),
                        '--tw-prose-invert-pre-code': theme('colors.zinc.300'),
                        '--tw-prose-invert-pre-bg': 'rgba(0,0,0,0.5)',
                        '--tw-prose-invert-th-borders': theme('colors.zinc.600'),
                        '--tw-prose-invert-td-borders': theme('colors.zinc.700'),
                    },
                },
            }),
        },
    },
}
