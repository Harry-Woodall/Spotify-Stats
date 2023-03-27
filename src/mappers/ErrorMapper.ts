const ErrorMapper = {
  MapStatusCodes(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return "Bad Request";
      case 401:
        return "Unauthorized";
      case 403:
        return "User forbidden to access this site";
      case 429:
        return "Rate limit exceeded";
      default:
        return "Internal server error";
    }
  },
};

export default ErrorMapper;
