import { Client, ClientUser } from 'discord.js';
import { deployEvents } from '../functions';

export const execute = (client: Client) => {
  try {
    console.log(`Logged in as ${(client.user as ClientUser).username} (${(client.user as ClientUser).id})!`);
    global.oldState.discord = global.state.discord;
    global.state.discord = 'ONLINE';
    deployEvents(client);
  } catch (error) {
    console.log(error);
  }
};
