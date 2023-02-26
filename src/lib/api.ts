import Gateway from "@/lib/gateway";
import localStorageEnums from "@/enums/localStorageEnums";

const Api = {
  async verifyToken() {
    const token = localStorage.getItem(localStorageEnums.ACCESS_TOKEN);

    if (token) {
      const res = await Gateway.getAsync(token, "/access/verify");
      console.log(res);
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
  async getTopArtists() {},
  async getTopTracks() {},
  async getPlaylists() {},
};
export default Api;
