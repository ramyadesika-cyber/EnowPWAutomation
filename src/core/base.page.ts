import { Page, expect } from '@playwright/test';
import { config } from '../config/env';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url, { timeout: config.timeouts.default });
  }

  async click(locator: string) {
    await this.page.locator(locator).click();
  }

  async type(locator: string, value: string) {
    await this.page.locator(locator).fill(value);
  }

  async uploadFile(locator: string, filePath: string) {
    await this.page.locator(locator).setInputFiles(filePath);
  }

  async assertVisible(locator: string) {
    await expect(this.page.locator(locator)).toBeVisible();
  }
}