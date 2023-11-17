import { connect } from './MinecraftManager';

export const onLogin = () => {
  console.log('Client ready, logged in as ' + global.bot.username);
  global.state = 'in lobby';
  global.loginAttempts = 0;
  global.exactDelay = 0;
};

export const onEnd = (reason: string) => {
  if (reason === 'restart') return;
  global.state = 'offline';
  const loginDelay = global.exactDelay > 60000 ? 60000 : (global.loginAttempts + 1) * 5000;
  console.log(`Minecraft bot has disconnected! Attempting reconnect in ${loginDelay / 1000} seconds`);
  setTimeout(() => connect(), loginDelay);
};

export const onKicked = (reason: string) => {
  global.state = 'offline';
  console.log(`Minecraft bot has been kicked from the server for "${reason}"`);
  global.loginAttempts++;
};
