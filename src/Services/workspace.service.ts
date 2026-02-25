import { Page } from '@playwright/test';
import { WorkspacePage } from '../pages/workspace.page';
import { config } from '../config/env';

export class WorkspaceService {
  private workspacePage: WorkspacePage;

  constructor(page: Page) {
    this.workspacePage = new WorkspacePage(page);
  }

  async uploadFile(filePath: string, successSelector: string) {
    await this.workspacePage.openWorkspace(config.baseUrls.workspace);
    await this.workspacePage.uploadDocument(filePath);
    await this.workspacePage.verifyUploadSuccess(successSelector);
  }
}