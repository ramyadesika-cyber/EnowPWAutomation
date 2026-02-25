import { BasePage } from '../core/base.page';

export class CalendarPage extends BasePage {

  async openCalendar(baseUrl: string) {
    await this.navigate(baseUrl);
  }

  async createEvent(title: string, date: string) {
    await this.click('button[aria-label="Create"]');
    await this.type('input[aria-label="Add title"]', title);
    await this.type('input[type="date"]', date);
  }

  async saveEvent() {
    await this.click('button:has-text("Save")');
  }

  async verifyEventCreated(eventTitle: string) {
    await this.assertVisible(`text=${eventTitle}`);
  }
}