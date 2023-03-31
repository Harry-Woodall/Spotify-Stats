import Gateway from "@/lib/gateway";
import StorageHelpers from "@/helpers/StorageHelper";

// const token = StorageHelpers.GetAccessToken();

const Api = {
  async verifyToken(): Promise<Response> {
    return await Gateway.getAsync(StorageHelpers.GetAccessToken(), "/api/verify");
  },

  async refreshToken(): Promise<string> {
    const response = await Gateway.refreshToken(StorageHelpers.GetRefreshToken());

    if (!response.ok)
      throw {
        response: response,
      };

    const token = await response.text();
    StorageHelpers.UpdateAccessToken(token);

    return token;
  },

  async getDisplayName() {
    // if (!AccessTokenInstance.getToken()) {
    //   console.log("no token found");
    //   return;
    // }
    // const me = await Gateway.getAsync(AccessTokenInstance.getToken(), "/me");
    // console.log(me);
  },

  async getAllPlaylists(offset?: number, clearCache: boolean = false): Promise<Response> {
    const queries = [];

    if (offset) queries.push({ key: "offset", value: offset.toString() });
    if (clearCache) queries.push({ key: "cache", value: new Date().getTime().toString() });

    return await Gateway.getAsync(
      StorageHelpers.GetAccessToken(),
      "/api/playlists/all",
      queries.length ? queries : undefined
    );
  },

  async getPlaylistOverview(playlistId: string): Promise<Response> {
    return await Gateway.getAsync(StorageHelpers.GetAccessToken(), "/api/playlists/overview", [
      { key: "id", value: playlistId },
    ]);
  },

  async getPlaylistData(playlistId: string): Promise<Response> {
    return await Gateway.getAsync(
      StorageHelpers.GetAccessToken(),
      `/api/playlists`,
      [{ key: "id", value: playlistId }],
      60000
    );
  },

  async postUserDetails(user: { name: string; email: string }): Promise<Response> {
    return await Gateway.postAsync(user, `/requestAccess`);
  },

  async pollForCurrentTrack(): Promise<Response> {
    return await Gateway.getAsync(StorageHelpers.GetAccessToken(), `/api/player/current`);
  },

  async getPlaylistName(id: string): Promise<Response> {
    return await Gateway.getAsync(StorageHelpers.GetAccessToken(), `/api/playlists/name`, [{ key: "id", value: id }]);
  },

  async getTrackAnalysis(id: string): Promise<Response> {
    return await Gateway.getAsync(StorageHelpers.GetAccessToken(), `/api/player/current/analysis`, [
      { key: "id", value: id },
    ]);
  },
};
export default Api;
