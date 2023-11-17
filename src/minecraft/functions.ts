import { Movements, goals } from 'mineflayer-pathfinder';
import { Position } from '../types';
const goalNear = goals.GoalNear;

export const gotoLocation = (position: Position) => {
  global.state.minecraft = 'IN_MURDER_MYSTERY_GAME:MOVING_POS';
  const defaultMove = new Movements(global.bot);
  global.bot.pathfinder.setMovements(defaultMove);
  global.bot.pathfinder.setGoal(new goalNear(position.x, position.y, position.z, 1));
};
