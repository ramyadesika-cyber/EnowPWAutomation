import dotenv from 'dotenv';
dotenv.config();

export const config = {
  baseUrls: {
    workspace: process.env.WORKSPACE_URL!,
    calendar: process.env.CALENDAR_URL!
  },
  credentials: {
    email: process.env.GOOGLE_EMAIL!,
    password: process.env.GOOGLE_PASSWORD!
  },
  timeouts: {
    default: Number(process.env.DEFAULT_TIMEOUT) || 30000
  }
};