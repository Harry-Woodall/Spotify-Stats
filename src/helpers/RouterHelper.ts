import { Router } from "vue-router";
import StorageHelpers from "@/Helpers/StorageHelper";
import Api from "@/lib/api";

const RouterHelper = {
  HandleErrorResponse(router: Router, response: Response, tokenRefreshCallback: Function) {
    switch (response.status) {
      case 400:
      case 401:
        Api.refreshToken();
        tokenRefreshCallback();
        break;
      default:
        router.push(`/error?status=${response.status}&message=${response.statusText}`);
        break;
    }
  },
};

export default RouterHelper;
