import Gateway from "@/lib/gateway";
import StorageHelpers from "@/helpers/StorageHelper";

// const token = StorageHelpers.GetAccessToken();

const Api = {
  async verifyToken() {
    const token = StorageHelpers.GetAccessToken();

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
  async getAllPlaylists() {
    const token = StorageHelpers.GetAccessToken();

    if (token) {
      const response = await Gateway.getAsync(token, "/api/playlists/all");
      return response;
    }
  },
  async getPlaylistOverview(playlistId: string) {
    const token = StorageHelpers.GetAccessToken();

    if (token) {
      const response = await Gateway.getAsync(token, "/api/playlists/overview", [{ key: "id", value: playlistId }]);
      return response;
    }
  },
  async getPlaylistData(playlistId: string) {
    const token = StorageHelpers.GetAccessToken();

    const response = await Gateway.getAsync(token!, `/api/playlists`, [{ key: "id", value: playlistId }]);
    return response;
  },
};
export default Api;
