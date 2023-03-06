import localStorageEnums from "@/enums/LocalStorageEnums";
import ErrorEnum from "@/enums/ErrorEnum";

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
};

export default StorageHelpers;
