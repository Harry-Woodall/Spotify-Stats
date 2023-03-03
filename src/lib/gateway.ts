import AppSettings from "@/config/appsettings";
import Query from "@/interfaces/gatewayInterfaces";

const Gateway = {
  getAsync: (token: string, url: string, querys?: Query[]): Promise<Response> | Promise<any> => {
    const controller = new AbortController();
    const controllerId = setTimeout(() => controller.abort(), 20000);

    return fetch(`${AppSettings.baseEndpoint}${url}/?accessToken=${token}${buildQueryString(querys)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "force-cache",
      signal: controller.signal,
    })
      .then((playlistResponse) => {
        clearTimeout(controllerId);
        if (playlistResponse.ok) return playlistResponse.json();
        console.log(playlistResponse);

        throw {
          response: playlistResponse,
        };
      })
      .then((data) => {
        return data;
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
