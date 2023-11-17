import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder().setName('status').setDescription('Gets the currnet status of the bot');

export const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.reply(`Minecraft: \`${global.state.minecraft}\`\nDiscord: \`${global.state.discord}\``);
};
