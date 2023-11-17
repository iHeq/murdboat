import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('bot')
  .setDescription('Gets the currnet status of the bot')
  .addSubcommand((subcommand) =>
    subcommand
      .setName('info')
      .setDescription('Dispalys info about that bot!')
      .addStringOption((option) =>
        option
          .setName('type')
          .setDescription('The type of info you want to view')
          .setRequired(false)
          .addChoices(
            { name: 'username', value: 'username' },
            { name: 'uuid', value: 'uuid' },
            { name: 'version', value: 'version' },
            { name: 'location', value: 'location' },
            { name: 'location x', value: 'locationX' },
            { name: 'location y', value: 'locationY' },
            { name: 'location z', value: 'locationZ' },
            { name: 'ping', value: 'ping' }
          )
      )
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const subcommand = interaction.options.getSubcommand();
  if (subcommand === 'info') {
    const type = interaction.options.getString('type') || null;
    if (type === 'username') {
      return await interaction.reply({ content: `Username: \`${global.bot.username}\`` });
    } else if (type === 'uuid') {
      return await interaction.reply({ content: `UUID: \`${global.bot.player.uuid}\`` });
    } else if (type === 'version') {
      return await interaction.reply({ content: `Version: \`${global.bot.version}\`` });
    } else if (type === 'location') {
      return await interaction.reply({
        content: `Location: \`X: ${global.bot.entity.position.x} Y: ${global.bot.entity.position.y} Z: ${global.bot.entity.position.z}\``,
      });
    } else if (type === 'locationX') {
      return await interaction.reply({ content: `Location X: \`${global.bot.entity.position.x}\`` });
    } else if (type === 'locationY') {
      return await interaction.reply({ content: `Location Y: \`${global.bot.entity.position.y}\`` });
    } else if (type === 'locationZ') {
      return await interaction.reply({ content: `Location Z: \`${global.bot.entity.position.z}\`` });
    } else if (type === 'ping') {
      return await interaction.reply({ content: `Ping: \`${global.bot.player.ping}\`` });
    } else {
      const embed = new EmbedBuilder()
        .setColor('#ff538e')
        .setDescription(
          `Username: \`${global.bot.username} (${global.bot.player.uuid})\`\nLocation: \`X: ${global.bot.entity.position.x} Y: ${global.bot.entity.position.y} Z: ${global.bot.entity.position.z}\`\nPing: \`${global.bot.player.ping}\`\nVersion: \`${global.bot.version}\`\n\n`
        );
      await interaction.reply({ embeds: [embed] });
    }
  }
};
