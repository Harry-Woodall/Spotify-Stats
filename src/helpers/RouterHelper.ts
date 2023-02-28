import { Router } from "vue-router";
import StorageHelpers from "./StorageHelper";

const RouterHelper = {
  HandleErrorResponse(router: Router, response: Response) {
    console.log("Handling Error: ", response.status);

    switch (response.status) {
      case 400:
        switch (response.statusText) {
          case "Missing Access Token":
            StorageHelpers.DestroyLocalStorage();
            router.push("/");
            break;
          default:
            router.push(`/error?status=${response.status}&message=${response.statusText}`);
            break;
        }
        break;
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
