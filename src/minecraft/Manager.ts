import { onLogin, onEnd, onKicked } from './StateHandler';
import { mineflayer as viewer } from 'prismarine-viewer';
import { pathfinder } from 'mineflayer-pathfinder';
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
  global.bot.loadPlugin(pathfinder);

  global.bot.on('login', () => onLogin());
  global.bot.on('end', (message: string) => onEnd(message));
  global.bot.on('kicked', (message: string) => onKicked(message));
  global.bot.on('message', (message: ChatMessage) => onMessage(message));
  global.bot.on('spawn', () => {
    console.log('Bot can now be viewed from http://localhost:3000/');
    viewer(global.bot, { port: 3000, firstPerson: true });
  });
};
