import { chromium, FullConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

async function globalSetup(config: FullConfig) {
  if (!process.env.GOOGLE_EMAIL || !process.env.GOOGLE_PASSWORD) {
    console.warn('Skipping storage state setup - credentials missing');
    return;
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://accounts.google.com');
  await page.fill('input[type="email"]', process.env.GOOGLE_EMAIL);
  await page.click('#identifierNext');
  await page.fill('input[type="password"]', process.env.GOOGLE_PASSWORD);
  await page.click('#passwordNext');

  await page.waitForLoadState('networkidle');

  await page.context().storageState({
    path: process.env.STORAGE_STATE_PATH || 'storage-state.json',
  });

  await browser.close();
}

export default globalSetup;