export interface League {
  idLeague: string
  strLeague: string
  strSport: string
  strLeagueAlternate: string | null
}

export interface AllLeaguesResponse {
  leagues: League[]
}

export interface Season {
  strSeason: string
  strBadge: string
}

export interface BadgeResponse {
  seasons: Season[]
}
