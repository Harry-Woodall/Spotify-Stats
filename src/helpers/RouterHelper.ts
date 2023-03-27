import { Router } from "vue-router";
import StorageHelpers from "@/Helpers/StorageHelper";
import ErrorHelper from "@/Helpers/ErrorHelper";
import Api from "@/lib/api";

const RouterHelper = {
  async HandleErrorResponse(router: Router, response: Response, tokenRefreshCallback: Function) {
    switch (response.status) {
      case 400:
        console.log("bad request");
        console.log(response);

        router.push(`/error?status=${response.status}&message=${response.statusText}`);
        break;

      case 401:
        try {
          await Api.refreshToken();
        } catch (error) {
          StorageHelpers.DestroyLocalStorage();
          router.push(`/`);
        }

        console.log("token refreshed, re-runing function");
        tokenRefreshCallback();
        break;

      default:
        router.push(`/error?status=${response.status}&message=${response.statusText}`);
        break;
    }
  },
};

export default RouterHelper;
