import Api from "@/lib/api";

const ValidationHelper = {
  async validatePage() {
    const verifyTokenResponse = await Api.verifyToken();

    if (!verifyTokenResponse.ok) {
      if (verifyTokenResponse.status == 401) {
        await Api.refreshToken();
        return;
      }

      throw {
        response: verifyTokenResponse,
      };
    }

    const isVerified = await verifyTokenResponse.json();

    if (!isVerified) {
      await Api.refreshToken();
    }
  },
};

export default ValidationHelper;
