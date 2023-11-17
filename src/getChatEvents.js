const chalk = require('chalk');

function getChatEvents(jsonMsg) {
  let clickEvents = [];
  let hoverEvents = [];
  if (jsonMsg['clickEvent']) {
    const cEvent = jsonMsg['clickEvent'];
    if (!['run_command', 'suggest_command', 'open_url'].includes(cEvent['action'])) return;
    if (!clickEvents.includes(cEvent['value'])) {
      clickEvents.push(cEvent['value']);
    } else {
      console.log(chalk.ansi256(212).bgAnsi256(52)(`| NEW CLICK EVENT: ${cEvent['action']}|`));
    }
  } else if (jsonMsg['hoverEvent']) {
    const hEvent = jsonMsg['hoverEvent'];
    if (hEvent['action'] === 'show_text') {
      hoverEvents.push(hEvent['value']['text'].replace(/§[a-z0-9]/g, ''));
    } else {
      console.log(chalk.ansi256(212).bgAnsi256(52)(`| NEW HOVER EVENT: ${hEvent['action']}|`));
    }
  } else if (jsonMsg['extra']) {
    jsonMsg['extra'].forEach((subMsg) => {
      if (subMsg['clickEvent']) {
        const cEvent = subMsg['clickEvent'];
        if (['run_command', 'suggest_command', 'open_url'].includes(cEvent['action'])) {
          if (!clickEvents.includes(cEvent['value'])) clickEvents.push(cEvent['value']);
        } else {
          console.log(chalk.ansi256(212).bgAnsi256(52)(`| NEW CLICK EVENT: ${cEvent['action']}|`));
        }
      } else if (subMsg['hoverEvent']) {
        const hEvent = subMsg['hoverEvent'];
        if (hEvent['action'] === 'show_text') {
          hoverEvents.push(hEvent['value']['text'].replace(/§[a-z0-9]/g, ''));
        } else {
          console.log(chalk.ansi256(212).bgAnsi256(52)(`| NEW HOVER EVENT: ${hEvent['action']}|`));
        }
      }
    });
  }

  clickEvents = [...new Set(clickEvents)];
  hoverEvents = [...new Set(hoverEvents)];

  return [clickEvents, hoverEvents];
}

module.exports = {
  getChatEvents,
};
