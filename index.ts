import { connect as connectMinecraft } from './src/minecraft/Manager';
import { connect as connectDiscord } from './src/discord/Manager';

global.state = 'offline';
connectMinecraft();
connectDiscord();
