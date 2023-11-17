import { EmbedBuilder, TextChannel, Interaction, Guild } from 'discord.js';

export const execute = async (interaction: Interaction) => {
  try {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;
      try {
        try {
          console.log(
            `Interaction Event trigged by ${
              interaction.user.discriminator == '0'
                ? interaction.user.username
                : `${interaction.user.username}#${interaction.user.discriminator}`
            } (${interaction.user.id}) ran command ${interaction.commandName} in ${
              (interaction.guild as Guild).id
            } in ${(interaction.channel as TextChannel).id}`
          );
        } catch (error) {
          console.log(error);
        }
        try {
          await command.execute(interaction);
        } catch (error) {
          console.log(error);
          const errorEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('An error occurred')
            .setDescription('check console')
            .setFooter({ text: `by @kathund. | UwU` });
          if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
          } else {
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
          }
        }
      } catch (error) {
        console.log(error);
        const errorEmbed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle('An error occurred')
          .setDescription('check ur console')
          .setFooter({ text: `by @kathund. | UwU` });
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
        } else {
          await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
