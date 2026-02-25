import { Page } from '@playwright/test';
import { config } from '../config/env';

export async function loginToGoogle(page: Page) {
  await page.goto('https://accounts.google.com');
  await page.fill('input[type="email"]', config.credentials.email);
  await page.click('#identifierNext');
  await page.fill('input[type="password"]', config.credentials.password);
  await page.click('#passwordNext');
}