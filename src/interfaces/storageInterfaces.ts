import { PlaylistOverview } from "./playlistCardInterfaces";
import { PlaylistOverviewStoreData } from "./playlistDataInterface";

export interface PlaylistsOverviewStorageWrapper {
  cacheTime: number;
  overviewStorageData: PlaylistOverviewStoreData;
}
