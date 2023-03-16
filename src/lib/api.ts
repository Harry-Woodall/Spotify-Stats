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
  async getAllPlaylists(offset?: number): Promise<Response> {
    return await Gateway.getAsync(
      StorageHelpers.GetAccessToken(),
      "/api/playlists/all",
      offset ? [{ key: "offset", value: offset.toString() }] : undefined
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
};
export default Api;
