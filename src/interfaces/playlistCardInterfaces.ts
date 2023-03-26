export interface PlaylistData {
  id?: string;
  name?: string;
  image?: string;
  trackCount?: number;
  isFullyComplete?: boolean;
  stats?: {
    analysis?: Analysis;
    activity?: {
      date: string;
      frequency: number;
    }[];
    earliestTrack?: {
      addedAt: string;
      releaseDate: string;
      name: string;
      id: string;
      artists: DataObject[];
      image: Image;
    };
    latestTrack?: {
      addedAt: string;
      releaseDate: string;
      name: string;
      id: string;
      artists: DataObject[];
      image: Image;
    };
    newestTrack?: {
      addedAt: string;
      releaseDate: string;
      name: string;
      id: string;
      artists: DataObject[];
      image: Image;
    };
    oldestTrack?: {
      addedAt: string;
      releaseDate: string;
      name: string;
      id: string;
      artists: DataObject[];
      image: Image;
    };
    longestTrack?: {
      duration_ms: number;
      releaseDate: string;
      name: string;
      id: string;
      artists: DataObject[];
      image: Image;
    };
    shortestTrack?: {
      duration_ms: number;
      releaseDate: string;
      name: string;
      id: string;
      artists: DataObject[];
      image: Image;
    };
    highestEnergy?: {
      energy: number;
      releaseDate: string;
      name: string;
      id: string;
      artists: DataObject[];
      image: Image;
    };
    lowestEnergy?: {
      energy: number;
      releaseDate: string;
      name: string;
      id: string;
      artists: DataObject[];
      image: Image;
    };
    highestDanceability?: {
      danceability: number;
      releaseDate: string;
      name: string;
      id: string;
      artists: DataObject[];
      image: Image;
    };
    lowestDanceability?: {
      danceability: number;
      releaseDate: string;
      name: string;
      id: string;
      artists: DataObject[];
      image: Image;
    };
    highestValence?: {
      valence: number;
      releaseDate: string;
      name: string;
      id: string;
      artists: DataObject[];
      image: Image;
    };
    lowestValence?: {
      valence: number;
      releaseDate: string;
      name: string;
      id: string;
      artists: DataObject[];
      image: Image;
    };
    artistFrequency?: ArtistFrequencyObject[];
    albumFrequency?: AlbumFrequencyObject[];
    genreFrequency?: FrequencyObject[];
  };
}

export interface DataObject {
  name: string;
  id: string;
}

export interface AlbumFrequencyObject {
  name: string;
  artists: string[];
  frequency: number;
}

export interface ArtistFrequencyObject {
  artist: {
    name: string;
    smallImage?: string;
    largeImage?: string;
    id: string;
  };
  frequency: number;
}

export interface FrequencyObject {
  name: string;
  frequency: number;
}

export interface Activity {
  date: string;
  frequency: number;
}

interface Image {
  width: number;
  height: number;
  url: string;
}

export interface PlaylistOverview {
  id: string;
  title?: string;
  image?: string;
  owner?: string;
  trackCount?: number;
}

export interface PlaylistOverviewWrapper {
  data: PlaylistOverview;
  index: number;
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
