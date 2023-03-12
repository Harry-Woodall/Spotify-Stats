export interface PlaylistData {
  id?: string;
  name?: string;
  image?: string;
  activity?: Object;
  trackCount?: number;
  oldestTrack?: {
    addedAt: string;
    name: string;
    id: string;
    artists: string[];
    image: Image;
  };
  newestTrack?: {
    addedAt: string;
    name: string;
    id: string;
    artists: string[];
    image: Image;
  };
  longestTrack?: {
    duration_ms: number;
    name: string;
    id: string;
    artists: string[];
    image: Image;
  };
  shortestTrack?: {
    duration_ms: number;
    name: string;
    id: string;
    artists: string[];
    image: Image;
  };
  highestEnergy?: {
    energy: number;
    name: string;
    id: string;
    artists: string[];
    image: Image;
  };
  highestDanceability?: {
    danceability: number;
    name: string;
    id: string;
    artists: string[];
    image: Image;
  };
  highestValence?: {
    valence: number;
    name: string;
    id: string;
    artists: string[];
    image: Image;
  };
  analysis?: Analysis;
}

interface Image {
  width: number;
  height: number;
  url: string;
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
