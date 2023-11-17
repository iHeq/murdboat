import { gotoLocation } from './functions';

function calculateDistance(
  entityPosition: { x: number; y: number; z: number },
  botPosition: { x: number; y: number; z: number }
): number {
  const dx = entityPosition.x - botPosition.x;
  const dy = entityPosition.y - botPosition.y;
  const dz = entityPosition.z - botPosition.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export const findNearestDroppedGold = () => {
  global.state.minecraft = 'IN_MURDER_MYSTERY_GAME:FINDING_GOLD';
  const botPosition = {
    x: global.bot.entity.position.x,
    y: global.bot.entity.position.y,
    z: global.bot.entity.position.z,
  };
  const closestGoldIngot = Object.values(global.bot.entities)
    .filter((entity) => entity.displayName === 'Dropped item')
    .sort((a, b) => {
      const distanceA = calculateDistance(a.position, botPosition);
      const distanceB = calculateDistance(b.position, botPosition);
      return distanceA - distanceB;
    })[0];

  if (!closestGoldIngot) return;
  console.log(closestGoldIngot);
  gotoLocation({ x: closestGoldIngot.position.x, y: closestGoldIngot.position.y, z: closestGoldIngot.position.z });
};
