const mapping: Record<string, string> = {
  'favorite-songs': 'favorite_songs',
  'mp-3-players': 'mp3_player',
  organizations: 'organization',
  'selected-mp-3-players': 'selected_mp3_players',
  songs: 'song',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
