import { PlaylistOverview, PlaylistOverviewWrapper } from "./playlistCardInterfaces";

export interface PlaylistsData {
  itemCount?: number;
  returnedItemCount?: number;
  items?: string[];
  nextOffset?: number;
}

export interface PlaylistOverviewStoreData {
  overviewData: PlaylistOverviewWrapper[];
  nextPlaylists: {
    hasNext: boolean;
    nextOffset: number;
  };
}
