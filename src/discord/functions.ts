import { Client, Collection, REST, Routes, TextChannel } from 'discord.js';
import { SlashCommand } from '../types/index';
import { discord } from '../../config.json';
import { readdirSync } from 'fs';

export const deployEvents = async (client: Client) => {
  try {
    global.oldState.discord = global.state.discord;
    global.state.discord = 'DEPLOYING_EVENTS';
    const eventFiles = readdirSync('./src/discord/events');
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
      global.oldState.discord = global.state.discord;
      global.state.discord = 'DEPLOYED_EVENTS';
    }
    console.log(`Successfully loaded ${count} event(s).`);
  } catch (error) {
    console.log(error);
  }
};

export const deployCommands = async (client: Client) => {
  try {
    global.oldState.discord = global.state.discord;
    global.state.discord = 'DEPLOYING_COMMANDS';
    client.commands = new Collection<string, SlashCommand>();
    const commandFiles = readdirSync('./src/discord/commands');
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
      global.oldState.discord = global.state.discord;
      global.state.discord = 'DEPLOYED_COMMANDS';
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (channel: 'debug' | 'log', message: string) => {
  console.log(discord.channels[channel]);
  let textChannel = null;
  if (channel === 'log') textChannel = global.client.channels.cache.get(discord.channels.log) as TextChannel;
  if (channel === 'debug') textChannel = global.client.channels.cache.get(discord.channels.debug) as TextChannel;
  if (textChannel == null) return;
  textChannel.send({ content: message });
};
