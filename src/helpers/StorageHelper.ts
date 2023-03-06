import localStorageEnums from "@/enums/LocalStorageEnums";

const StorageHelpers = {
  DestroyLocalStorage() {
    localStorage.removeItem(localStorageEnums.ACCESS_TOKEN);
    localStorage.removeItem(localStorageEnums.REFRESH_TOKEN);
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
  GetAccessToken() {
    return localStorage.getItem(localStorageEnums.ACCESS_TOKEN);
  },
};

export default StorageHelpers;
