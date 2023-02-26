import Axios from "axios";
import AppSettings from "@/config/appsettings";

const Gateway = {
  getAsync: (token: string, url: string) => {
    return Axios.get(`${AppSettings.baseEndpoint}${url}?accessToken=${token}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response: any) {
        if (response.data.error) {
          throw new Error("Error");
        }
        return response.data;
      })
      .catch((error: Error) => {
        throw error;
      });
  },
};

export default Gateway;
