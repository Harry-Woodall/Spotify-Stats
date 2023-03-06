import AppSettings from "@/config/appsettings";
import Query from "@/interfaces/gatewayInterfaces";

const Gateway = {
  getAsync: (token: string, url: string, querys?: Query[], timeout?: number): Promise<Response> | Promise<any> => {
    return fetch(`${AppSettings.baseEndpoint}${url}/?accessToken=${token}${buildQueryString(querys)}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      signal: AbortSignal.timeout(timeout || 20000),
    });
  },
  refreshToken: (refreshToken: string) => {
    return fetch(`${AppSettings.baseEndpoint}/refreshToken?refreshToken=${refreshToken}`, {
      signal: AbortSignal.timeout(10000),
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
