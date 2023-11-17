import { connect as connectMinecraft } from './src/minecraft/Manager';
import { connect as connectDiscord } from './src/discord/Manager';
import { findNearestDroppedGold } from './src/minecraft/EventHandler';

global.oldState = { discord: 'offline', minecraft: 'offline' };
global.state = { discord: 'offline', minecraft: 'offline' };

connectMinecraft();
connectDiscord();

let searching = global.searching;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let intervalId: any;

function startSearchingLoop() {
  intervalId = setInterval(() => {
    if (searching) {
      findNearestDroppedGold();
    }
  }, 5000);
}

function stopSearchingLoop() {
  clearInterval(intervalId);
}

startSearchingLoop();

global.searching = false;
setInterval(() => {
  console.log(global.searching);
  if (global.searching !== searching) {
    searching = global.searching;
    if (searching) {
      startSearchingLoop();
    } else {
      stopSearchingLoop();
    }
  }
}, 1000);
