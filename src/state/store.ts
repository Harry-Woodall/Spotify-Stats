// store
import StorageHelper from "@/helpers/StorageHelper";
import { PlaylistOverview, PlaylistOverviewWrapper } from "@/interfaces/playlistCardInterfaces";
import { reactive } from "vue";

type NextPlaylist = {
  hasNext: boolean;
  nextOffset: number;
  gettingPlaylists: boolean;
};

const nextPlaylists: NextPlaylist = {
  hasNext: false,
  nextOffset: -1,
  gettingPlaylists: false,
};

const playlistOverviewStore = reactive({
  overviewData: new Array<PlaylistOverviewWrapper>(),
  nextPlaylists: nextPlaylists,
});

export const getPlaylistOverviewStore = () => {
  if (playlistOverviewStore.overviewData.length <= 0) {
    const response = StorageHelper.GetOverviewData();

    if (response) {
      playlistOverviewStore.overviewData = response.overviewData;

      playlistOverviewStore.nextPlaylists.hasNext = response.nextPlaylists.hasNext;
      playlistOverviewStore.nextPlaylists.nextOffset = response.nextPlaylists.nextOffset;
    }
  }

  return playlistOverviewStore;
};

export const printOverviewStore = () => {
  console.log(playlistOverviewStore.overviewData);
};

export const addOverviewData = (data: PlaylistOverview, index: number) => {
  if (playlistOverviewStore.overviewData.some((item: PlaylistOverviewWrapper) => item.data.id == data.id)) return;

  playlistOverviewStore.overviewData.push({ data: data, index: index });
};

export const getOverviewIds = (): string[] =>
  playlistOverviewStore.overviewData.map((dataWrapper) => dataWrapper.data.id);

export const getOverviewData = (id: string): PlaylistOverview | false => {
  const result = playlistOverviewStore.overviewData.find((item: PlaylistOverviewWrapper) => item.data.id == id);

  return result?.data || false;
};

export const clearOverviewData = () => {
  playlistOverviewStore.overviewData = [];
  playlistOverviewStore.nextPlaylists.hasNext = false;
  playlistOverviewStore.nextPlaylists.nextOffset = -1;
};
