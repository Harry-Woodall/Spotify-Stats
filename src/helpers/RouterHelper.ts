import { Router } from "vue-router";
import StorageHelpers from "@/Helpers/StorageHelper";
import ErrorHelper from "@/Helpers/ErrorHelper";
import Api from "@/lib/api";

const RouterHelper = {
  async HandleErrorResponse(router: Router, response: Response, tokenRefreshCallback: Function) {
    switch (response.status) {
      case 401:
        try {
          await Api.refreshToken();
        } catch (error) {
          StorageHelpers.DestroyLocalStorage();
          router.push(`/`);
        }

        tokenRefreshCallback();
        break;

      default:
        router.push(`/error?status=${response.status}&message=${response.statusText}`);
        break;
    }
  },
};

export default RouterHelper;
