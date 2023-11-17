import { gotoLocation } from './functions';

export const findNearestDroppedGold = () => {
  global.state.minecraft = 'IN_MURDER_MYSTERY_GAME:FINDING_GOLD';
  const closestGoldIngot = global.bot.nearestEntity((entity) => {
    return entity.name === 'Gold Ingot';
  });
  if (!closestGoldIngot) return;
  gotoLocation({ x: closestGoldIngot.position.x, y: closestGoldIngot.position.y, z: closestGoldIngot.position.z });
};
