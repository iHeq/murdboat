/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bot } from 'mineflayer';

declare global {
  // eslint-disable-next-line no-var
  var state: string;
  // eslint-disable-next-line no-var
  var loginAttempts: number;
  // eslint-disable-next-line no-var
  var exactDelay: number;
  // eslint-disable-next-line no-var
  var bot: Bot;
  // eslint-disable-next-line no-var
}

