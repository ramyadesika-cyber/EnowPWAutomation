import { test } from '@playwright/test';
import { WorkspaceService } from '../src/services/workspace.service';
import { loginToGoogle } from '../src/utils/auth.util';

test('Upload file to Google Workspace', async ({ page }) => {
  const workspace = new WorkspaceService(page);

  await loginToGoogle(page);

  await workspace.uploadFile(
    process.env.TEST_FILE_PATH!,
    process.env.UPLOAD_SUCCESS_SELECTOR!
  );
});