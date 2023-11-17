import { onLogin, onEnd, onKicked } from './StateHandler';
import { ChatMessage } from 'prismarine-chat';
import { onMessage } from './ChatHandler';
import { createBot } from 'mineflayer';

function createBotConnection() {
  return createBot({
    host: 'mc.hypixel.net',
    port: 25565,
    username: 'username',
    auth: 'microsoft',
    version: '1.8.9',
    viewDistance: 'tiny',
    chatLengthLimit: 256,
  });
}

export const connect = () => {
  global.loginAttempts = 0;
  global.exactDelay = 0;

  global.bot = createBotConnection();

  global.bot.on('login', () => onLogin());
  global.bot.on('end', (message: string) => onEnd(message));
  global.bot.on('kicked', (message: string) => onKicked(message));
  global.bot.on('message', (message: ChatMessage) => onMessage(message));
};
