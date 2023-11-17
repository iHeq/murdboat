import { ChatMessage } from 'prismarine-chat';

function isLobbyJoinMessage(message: string) {
  return (message.endsWith(' the lobby!') || message.endsWith(' the lobby! <<<')) && message.includes('[MVP+');
}

function isDetectiveMessage(message: string) {
  return message.includes('Detective:');
}

function isDeadMessage(message: string) {
  return (
    message.startsWith('YOU DIED! A Murderer stabbed you!') ||
    message.startsWith('YOU DIED! The Murderer stabbed you!') ||
    message.startsWith('YOU DIED! A Murderer threw their knifw at you!') ||
    message.startsWith('YOU DIED! The Murderer threw their knifw at you!')
  );
}

function isDynamicLobbyMessage(message: string) {
  return message.includes('dynamiclobby');
}

function isInGameMessage(message: string) {
  return (
    message.startsWith('Teaming with the Murderers is not allowed!') ||
    message.startsWith('Teaming with the Murderer is not allowed!') ||
    (message.startsWith('The Murderers get their swords in') && message.endsWith('seconds!')) ||
    (message.startsWith('The Murderer get their swords in') && message.endsWith('seconds!')) ||
    message.startsWith('The Murderers have received your sword!') ||
    message.startsWith('The Murderer have received your sword!')
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

  if (isLobbyJoinMessage(rawMessage)) {
    global.bot.chat('/play murder_classic');
    global.state = 'IN_MURDERY_MYSTERY_QUEUE';
  } else if (isDetectiveMessage(rawMessage)) {
    global.bot.chat('/play murder_classic');
    global.state = 'IN_MURDERY_MYSTERY_QUEUE';
  } else if (isDeadMessage(rawMessage)) {
    global.bot.chat('/play murder_classic');
    global.state = 'IN_MURDERY_MYSTERY_QUEUE';
  } else if (isDynamicLobbyMessage(rawMessage)) {
    global.bot.chat('/play murder_classic');
    global.state = 'IN_MURDERY_MYSTERY_QUEUE';
  } else if (isInGameMessage(rawMessage)) {
    global.state = 'IN_MURDER_MYSTERY_GAME';
  } else if (isMurdererMessage(rawMessage)) {
    global.bot.chat('/play murder_classic');
    global.state = 'IN_MURDERY_MYSTERY_QUEUE';
  }
};
