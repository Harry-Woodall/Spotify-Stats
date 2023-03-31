import { PlaylistOverview, PlaylistOverviewWrapper } from "./playlistCardInterfaces";

export interface CurrentTrackResponse {
  isActive: boolean;
  isPlaylist: boolean;
  playlistId: string;
  track: {
    id: string;
    name: string;
    artists: string[];
    image: string;
    releaseDate: number;
  };
}

export interface TrackAnalysis {
  energy: number;
  danceability: number;
  vocals: number;
  positivity: number;
}

export interface TrackData {
  playlistId?: string;
  playlistName?: string;
  trackName?: string;
  trackArtists?: string[];
  trackReleaseDate?: string;
  image?: string;
  analysis?: TrackAnalysis;
}
