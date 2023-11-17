import { discord } from '../../../config.json';
import { Message } from 'discord.js';

export const execute = async (message: Message) => {
  try {
    if (message.channelId !== discord.channels.debug) return;
    if (message.author.bot) return;
    return global.bot.chat(message.content);
  } catch (error) {
    console.log(error);
  }
};
