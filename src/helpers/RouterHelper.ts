import { Router } from "vue-router";
import StorageHelpers from "@/Helpers/StorageHelper";
import ErrorHelper from "@/Helpers/ErrorHelper";
import Api from "@/lib/api";
import ErrorMapper from "@/mappers/ErrorMapper";

const RouterHelper = {
  async HandleErrorResponse(router: Router, response: Response, tokenRefreshCallback: Function) {
    let errorText = response.statusText;

    if (response.status && response.statusText == "") errorText = ErrorMapper.MapStatusCodes(response.status);

    switch (response.status) {
      case 401:
        try {
          await Api.refreshToken();
        } catch (error) {
          StorageHelpers.DestroyLocalStorage();
          StorageHelpers.DestroySessionStorage();
          router.push(`/`);
        }

        tokenRefreshCallback();
        break;

      default:
        router.push(`/error?status=${response.status}&message=${errorText}`);
        break;
    }
  },
};

export default RouterHelper;
