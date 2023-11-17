function getLocation(rawText) {
  // eslint-disable-next-line prefer-const
  let botLocation = {
    server: null,
    gametype: null,
    lobbyname: null,
    map: null,
  };

  if (!rawText[0] === '{') return;
  try {
    const jsonData = JSON.parse(rawText);

    botLocation['server'] = jsonData['server'] ? jsonData['server'] : null;
    botLocation['lobbyname'] = jsonData['lobbyname'] ? jsonData['lobbyname'] : null;
    botLocation['gametype'] = jsonData['gametype'] ? jsonData['gametype'] : null;
    botLocation['map'] = jsonData['map'] ? jsonData['map'] : null;
  } catch (error) {
    console.log(error);
    return 'Something went wrong';
  }

  return botLocation;
}

module.exports = { getLocation };
