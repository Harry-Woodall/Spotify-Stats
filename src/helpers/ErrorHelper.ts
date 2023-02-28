import { ResponseError } from "@/types/ResponseError";

const ErrorHelper = {
  isResponseError(error: unknown): error is ResponseError {
    return typeof error === "object" && error != null && "response" in error;
  },
};

export default ErrorHelper;
