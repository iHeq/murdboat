/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
import { Collection, SlashCommandBuilder, ChatInputCommandInteraction } from 'discord';
import { Client } from 'discord.js';
import { Bot } from 'mineflayer';

export interface SlashCommand {
  data: SlashCommandBuilder;
  // eslint-disable-next-line
  execute: (interaction: ChatInputCommandInteraction) => void;
}
declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, SlashCommand>;
  }
}

interface state {
  discord: string;
  minecraft: string;
}

declare global {
  var oldState: state;
  var state: state;
  var loginAttempts: number;
  var exactDelay: number;
  var bot: Bot;
  var client: Client;
  var searching: boolean;
}

export interface Position {
  x: number;
  y: number;
  z: number;
}
