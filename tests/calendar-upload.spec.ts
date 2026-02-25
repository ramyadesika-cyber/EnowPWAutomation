import { test } from '@playwright/test';
import { CalendarService } from '../src/services/calendar.service';
import { loginToGoogle } from '../src/utils/auth.util';

test('Create calendar event', async ({ page }) => {
  const calendar = new CalendarService(page);

  await loginToGoogle(page);

  await calendar.createCalendarEvent(
    process.env.EVENT_TITLE!,
    process.env.EVENT_DATE!
  );
});