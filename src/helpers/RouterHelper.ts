import { Router } from "vue-router";
import StorageHelpers from "./StorageHelper";

const RouterHelper = {
  HandleErrorResponse(router: Router, response: Response) {
    switch (response.status) {
      case 400:
      case 401:
        StorageHelpers.DestroyLocalStorage();
        router.push("/");
        break;
      default:
        router.push(`/error?status=${response.status}&message=${response.statusText}`);
        break;
    }
  },
};

export default RouterHelper;
