import localStorageEnums from "@/enums/LocalStorageEnums";
import ErrorEnum from "@/enums/ErrorEnum";
import { PlaylistOverviewStoreData } from "@/interfaces/playlistDataInterface";
import { PlaylistsOverviewStorageWrapper } from "@/interfaces/storageInterfaces";

const StorageHelpers = {
  DestroyLocalStorage() {
    localStorage.removeItem(localStorageEnums.ACCESS_TOKEN);
    localStorage.removeItem(localStorageEnums.REFRESH_TOKEN);
  },
  DestroySessionStorage() {
    sessionStorage.removeItem(localStorageEnums.OVERVIEW_DATA);
  },
  TokenExists() {
    return (
      localStorage.getItem(localStorageEnums.ACCESS_TOKEN) && localStorage.getItem(localStorageEnums.REFRESH_TOKEN)
    );
  },
  SetToken(accessToken: string, refreshToken: string) {
    localStorage.setItem(localStorageEnums.ACCESS_TOKEN, accessToken);
    localStorage.setItem(localStorageEnums.REFRESH_TOKEN, refreshToken);
  },
  UpdateAccessToken(accessToken: string) {
    localStorage.setItem(localStorageEnums.ACCESS_TOKEN, accessToken);
  },
  GetAccessToken() {
    const token = localStorage.getItem(localStorageEnums.ACCESS_TOKEN);

    if (!token)
      throw {
        message: ErrorEnum.NO_TOKEN,
      };

    return token;
  },

  GetRefreshToken() {
    const token = localStorage.getItem(localStorageEnums.REFRESH_TOKEN);

    if (!token)
      throw {
        message: ErrorEnum.NO_TOKEN,
      };

    return token;
  },

  StoreOverviewData(data: PlaylistOverviewStoreData) {
    const cacheTime = new Date();
    cacheTime.setTime(cacheTime.getTime() + 30 * 60 * 1000);

    data.overviewData.sort((a, b) => a.index - b.index);

    const storageData: PlaylistsOverviewStorageWrapper = {
      cacheTime: cacheTime.getTime(),
      overviewStorageData: data,
    };

    sessionStorage.setItem(localStorageEnums.OVERVIEW_DATA, JSON.stringify(storageData));
  },

  GetOverviewData(): PlaylistOverviewStoreData | null {
    const raw = sessionStorage.getItem(localStorageEnums.OVERVIEW_DATA);
    if (!raw) return null;

    const storageWrapper = JSON.parse(raw) as PlaylistsOverviewStorageWrapper;

    if (new Date().getTime() > storageWrapper.cacheTime) return null;

    return storageWrapper.overviewStorageData;
  },

  ClearOverviewData() {
    sessionStorage.removeItem(localStorageEnums.OVERVIEW_DATA);
  },
};

export default StorageHelpers;
