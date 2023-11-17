import { Client, Collection, REST, Routes, TextChannel } from 'discord.js';
import { SlashCommand } from '../types/index';
import { discord } from '../../config.json';
import { readdirSync } from 'fs';

export const deployEvents = async (client: Client) => {
  try {
    const eventFiles = readdirSync('./src/discord/events').filter((file) => file.endsWith('.ts'));
    let count = eventFiles.length;

    for (const file of eventFiles) {
      if (file.toLowerCase().includes('disabled')) {
        count--;
        continue;
      }
      const event = await import(`./events/${file}`);
      const name = file.split('.')[0];

      client.on(name, event.execute.bind(null));
      console.log(`Successfully loaded ${name}`);
    }
    console.log(`Successfully loaded ${count} event(s).`);
  } catch (error) {
    console.log(error);
  }
};

export const deployCommands = async (client: Client) => {
  try {
    client.commands = new Collection<string, SlashCommand>();
    const commandFiles = readdirSync('./src/discord/commnads').filter((file) => file.endsWith('.ts'));
    const commands = [];

    for (const file of commandFiles) {
      const command = await import(`./commands/${file}`);
      commands.push(command.data.toJSON());
      if (command.data.name) {
        client.commands.set(command.data.name, command);
      }
    }

    const rest = new REST({ version: '10' }).setToken(discord.token);

    try {
      await rest.put(Routes.applicationCommands(discord.clientId), { body: commands });
      console.log(`Successfully reloaded ${commands.length} application command(s).`);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (channel: 'debug' | 'log', message: string) => {
  await (global.client.channels.cache.get(discord.channels[channel]) as TextChannel).send({
    content: message,
  });
};
