import { Client, ClientUser } from 'discord.js';
import { deployEvents } from '../functions';

export const execute = (client: Client) => {
  try {
    console.log(`Logged in as ${(client.user as ClientUser).username} (${(client.user as ClientUser).id})!`);
    deployEvents(client);
  } catch (error) {
    console.log(error);
  }
};
