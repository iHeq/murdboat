import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder().setName('status').setDescription('Gets the currnet status of the bot');

export const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.reply(`The bot is currently ${global.state}`);
};
