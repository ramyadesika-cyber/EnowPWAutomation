import { BasePage } from '../core/base.page';

export class WorkspacePage extends BasePage {

  async openWorkspace(baseUrl: string) {
    await this.navigate(baseUrl);
  }

  async uploadDocument(filePath: string) {
    await this.uploadFile('input[type="file"]', filePath);
  }

  async verifyUploadSuccess(successSelector: string) {
    await this.assertVisible(successSelector);
  }
}