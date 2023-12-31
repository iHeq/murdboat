import { findNearestDroppedGold } from './EventHandler';
import { ChatMessage } from 'prismarine-chat';
import { debug } from '../../config.json';
import { sendMessage } from '../discord/functions';

function isLobbyJoinMessage(message: string) {
  return (message.endsWith(' the lobby!') || message.endsWith(' the lobby! <<<')) && message.includes('[MVP+');
}

function isDetectiveMessage(message: string) {
  return message.includes('Detective:');
}

function isDeadMessage(message: string) {
  return (
    message.endsWith('YOU DIED! A Murderer stabbed you!') ||
    message.endsWith('YOU DIED! The Murderer stabbed you!') ||
    message.endsWith('YOU DIED! A Murderer threw their knifw at you!') ||
    message.endsWith('YOU DIED! The Murderer threw their knifw at you!')
  );
}

function isDynamicLobbyMessage(message: string) {
  return message.includes('dynamiclobby');
}

function isInGameMessage(message: string) {
  return (
    message.endsWith('Teaming with the Murderers is not allowed!') ||
    message.endsWith('Teaming with the Murderer is not allowed!') ||
    (message.endsWith('The Murderers get their swords in') && message.endsWith('seconds!')) ||
    (message.endsWith('The Murderer get their swords in') && message.endsWith('seconds!')) ||
    message.endsWith('The Murderers have received your sword!') ||
    message.endsWith('The Murderer have received your sword!')
  );
}

function isMurdererMessage(message: string) {
  return (
    message.startsWith('Teaming with the Detectives/Innocents is not allowed!') ||
    message.startsWith('Teaming with the Detective/Innocent is not allowed!') ||
    (message.startsWith('You get your sword in') && message.endsWith('seconds!')) ||
    message.startsWith('You have received your sword!')
  );
}

export const onMessage = (message: ChatMessage) => {
  const rawMessage = message.toString();

  console.log(isInGameMessage(rawMessage));

  if (debug) sendMessage('debug', rawMessage);

  if (isLobbyJoinMessage(rawMessage)) {
    global.bot.chat('/play murder_classic');
    global.oldState.minecraft = global.state.minecraft;
    global.state.minecraft = 'IN_MURDERY_MYSTERY_QUEUE';
    sendMessage('log', `Minecraft State Changed | \`${global.oldState.minecraft}\` to \`${global.state.minecraft}\``);
  } else if (isDetectiveMessage(rawMessage)) {
    global.bot.chat('/play murder_classic');
    global.oldState.minecraft = global.state.minecraft;
    global.state.minecraft = 'IN_MURDERY_MYSTERY_QUEUE';
    sendMessage('log', `Minecraft State Changed | \`${global.oldState.minecraft}\` to \`${global.state.minecraft}\``);
  } else if (isDeadMessage(rawMessage)) {
    global.bot.chat('/play murder_classic');
    global.state.minecraft = 'IN_MURDERY_MYSTERY_QUEUE';
  } else if (isDynamicLobbyMessage(rawMessage)) {
    global.bot.chat('/play murder_classic');
    global.oldState.minecraft = global.state.minecraft;
    global.state.minecraft = 'IN_MURDERY_MYSTERY_QUEUE';
    sendMessage('log', `Minecraft State Changed | \`${global.oldState.minecraft}\` to \`${global.state.minecraft}\``);
  } else if (isInGameMessage(rawMessage)) {
    global.oldState.minecraft = global.state.minecraft;
    global.state.minecraft = 'IN_MURDER_MYSTERY_GAME';
    sendMessage('log', `Minecraft State Changed | \`${global.oldState.minecraft}\` to \`${global.state.minecraft}\``);
    findNearestDroppedGold();
  } else if (isMurdererMessage(rawMessage)) {
    global.bot.chat('/play murder_classic');
    global.oldState.minecraft = global.state.minecraft;
    global.state.minecraft = 'IN_MURDERY_MYSTERY_QUEUE';
    sendMessage('log', `Minecraft State Changed | \`${global.oldState.minecraft}\` to \`${global.state.minecraft}\``);
  } else if (rawMessage.startsWith('<kathund> find gold')) {
    console.log(rawMessage);
    global.searching = true;
  } else if (rawMessage.startsWith('stop finding')) {
    global.searching = false;
  }
};
