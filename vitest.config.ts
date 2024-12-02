import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        reporters: ['verbose'],
        include: ['src/**/*.spec.ts'],
        // Speed up tests, but also it's a workaround for the browser issue:
        // https://github.com/vitest-dev/vitest/issues/5382
        isolate: false,
        coverage: {
            provider: 'istanbul',
            include: ['src'],
            exclude: ['src/**/*.spec.ts'],
        },
    },
});
