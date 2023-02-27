export interface PlaylistData {
  id?: string;
  title?: string;
  image?: string;
  trackCount?: number;
  analysis?: Analysis;
}

export interface PlaylistOverview {
  id?: string;
  title?: string;
  image?: string;
  owner?: string;
  trackCount?: number;
}

export interface Analysis {
  acousticness: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  liveness: number;
  loudness: number;
  speechiness: number;
  tempo: number;
  valence: number;
  duration: number;
}
