import Axios from "axios";
import AppSettings from "@/config/appsettings";
import Query from "@/interfaces/gatewayInterfaces";

const Gateway = {
  getAsync: (token: string, url: string, querys?: Query[]) => {
    return Axios.get(
      `${
        AppSettings.baseEndpoint
      }${url}/?accessToken=${token}${buildQueryString(querys)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
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

const buildQueryString = (querys: Query[] | undefined) => {
  let queryString = "";

  if (querys == undefined) return queryString;

  if (querys.length == 0) {
    return queryString;
  }

  querys.forEach((item) => {
    queryString += `&${item.key}=${item.value}`;
  });

  return queryString;
};

export default Gateway;
