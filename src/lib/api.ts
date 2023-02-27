import Gateway from "@/lib/gateway";
import localStorageEnums from "@/enums/LocalStorageEnums";
import StorageHelpers from "@/helpers/StorageHelper";

const token = StorageHelpers.GetAccessToken();

const Api = {
  async verifyToken() {
    if (token) {
      const res = await Gateway.getAsync(token, "/api/verify");
      return res;
    } else {
      return false;
    }
  },
  async getDisplayName() {
    // if (!AccessTokenInstance.getToken()) {
    //   console.log("no token found");
    //   return;
    // }
    // const me = await Gateway.getAsync(AccessTokenInstance.getToken(), "/me");
    // console.log(me);
  },
  async getPlaylistDetails() {
    if (token) {
      const response = await Gateway.getAsync(token, "/api/playlists/details");
      return response;
    }
  },
  async getPlaylistOverview(playlistId: string) {
    if (token) {
      const response = await Gateway.getAsync(
        token,
        "/api/playlists/overview",
        [{ key: "id", value: playlistId }]
      );
      return response;
    }
  },
  async getPlaylistData(playlistId: string) {
    if (token) {
      const response = await Gateway.getAsync(token, `/api/playlists`, [
        { key: "id", value: playlistId },
      ]);
      return response;
    }
  },
};
export default Api;
