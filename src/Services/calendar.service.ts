import { Page } from '@playwright/test';
import { CalendarPage } from '../pages/calendar.page';
import { config } from '../config/env';

export class CalendarService {
  private calendarPage: CalendarPage;

  constructor(page: Page) {
    this.calendarPage = new CalendarPage(page);
  }

  async createCalendarEvent(title: string, date: string) {
    await this.calendarPage.openCalendar(config.baseUrls.calendar);
    await this.calendarPage.createEvent(title, date);
    await this.calendarPage.saveEvent();
    await this.calendarPage.verifyEventCreated(title);
  }
}