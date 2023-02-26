let instance: AccessToken;
const globalState = {
  accessToken: "",
};

class AccessToken {
  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");
    }

    instance = this;
  }

  getToken() {
    return globalState.accessToken;
  }

  setToken(token: string) {
    globalState.accessToken = token;
  }
}

const AccessTokenInstance: Readonly<AccessToken> = Object.freeze(
  new AccessToken()
);

export default AccessTokenInstance;
