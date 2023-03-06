import { ResponseError, AbortError, GenericError } from "@/types/Errors";

const ErrorHelper = {
  isResponseError(error: unknown): error is ResponseError {
    return typeof error === "object" && error != null && "response" in error;
  },
  isAbortError(error: unknown): error is AbortError {
    return typeof error === "object" && error != null && "name" in error && error.name == "AbortError";
  },
  isGenericError(error: unknown): error is GenericError {
    return typeof error === "object" && error != null && "message" in error;
  },
};

export default ErrorHelper;
