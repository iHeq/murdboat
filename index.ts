import { connect as connectMinecraft } from './src/minecraft/Manager';
import { connect as connectDiscord } from './src/discord/Manager';

global.oldState.minecraft = 'offline';
global.oldState.discord = 'offline';
global.state.minecraft = 'offline';
global.state.discord = 'offline';
connectMinecraft();
connectDiscord();
