import { Client, Events, GatewayIntentBits } from 'discord.js';
import { deployCommands } from './functions';
import { discord } from '../../config.json';
import { execute } from './events/ready';

export const connect = () => {
  const client = new Client({
    intents: [
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.Guilds,
    ],
  });
  global.client = client;

  deployCommands(client);

  client.on(Events.ClientReady, () => {
    execute(client);
  });

  client.login(discord.token);
};
