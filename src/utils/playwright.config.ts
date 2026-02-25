import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const ENV = process.env.TEST_ENV || 'dev';

const environmentConfig: Record<string, any> = {
  dev: {
    baseURL: process.env.DEV_BASE_URL,
  },
  qa: {
    baseURL: process.env.QA_BASE_URL,
  },
  prod: {
    baseURL: process.env.PROD_BASE_URL,
  },
};

export default defineConfig({
  testDir: './tests',

  timeout: Number(process.env.TEST_TIMEOUT) || 60 * 1000,

  expect: {
    timeout: Number(process.env.EXPECT_TIMEOUT) || 10000,
  },

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 1,

  workers: process.env.CI ? 4 : undefined,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],

  outputDir: 'test-results/',

  use: {
    baseURL: environmentConfig[ENV]?.baseURL,

    headless: process.env.HEADLESS !== 'false',

    viewport: {
      width: Number(process.env.VIEWPORT_WIDTH) || 1280,
      height: Number(process.env.VIEWPORT_HEIGHT) || 720,
    },

    actionTimeout: Number(process.env.ACTION_TIMEOUT) || 0,

    navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT) || 30000,

    screenshot: 'only-on-failure',

    video: process.env.CI ? 'retain-on-failure' : 'off',

    trace: 'retain-on-failure',

    storageState: process.env.STORAGE_STATE_PATH || undefined,
  },

  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  globalSetup: require.resolve('./src/global-setup'),

  globalTeardown: require.resolve('./src/global-teardown'),
});