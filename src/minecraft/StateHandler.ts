import { sendMessage } from '../discord/functions';
import { connect } from './Manager';

export const onLogin = () => {
  global.loginAttempts = 0;
  global.exactDelay = 0;
  console.log(`Client ready, logged in as ${global.bot.username}`);
  sendMessage('log', 'Minecraft bot has connected to the server!');
  global.state.minecraft = 'in lobby';
};

export const onKicked = (reason: string) => {
  global.state.minecraft = 'offline';
  console.log(`Minecraft bot has been kicked from the server for "${reason}"`);
  sendMessage('log', `Minecraft bot has been kicked from the server for "${reason}"`);
  global.loginAttempts++;
};

export const onEnd = (reason: string) => {
  if (reason === 'restart') return;
  global.state.minecraft = 'offline';
  const loginDelay = global.exactDelay > 60000 ? 60000 : (global.loginAttempts + 1) * 5000;
  console.log(`Minecraft bot has disconnected! Attempting reconnect in ${loginDelay / 1000} seconds`);
  sendMessage('log', `Minecraft bot has disconnected! Attempting reconnect in ${loginDelay / 1000} seconds`);
  setTimeout(() => connect(), loginDelay);
};
