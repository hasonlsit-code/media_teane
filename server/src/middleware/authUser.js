const { verifyToken } = require("../auth/checkAuth");
const { AuthFailureError } = require("../core/error.response");

const authUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const loggoed = req.cookies.logged;
    if ((loggoed && !accessToken) || (!loggoed && accessToken)) {
      res.clearCookie("logged");
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      throw new AuthFailureError("Vui lòng đăng nhập lại");
    }
    if (!accessToken) {
      throw new AuthFailureError("Vui lòng đăng nhập lại");
    }
    const decoded = await verifyToken(accessToken);
    if (!decoded) {
      throw new AuthFailureError("Vui lòng đăng nhập lại");
    }
    req.user = decoded.id;
    next();
  } catch (error) {
    throw new AuthFailureError("Vui lòng đăng nhập lại");
  }
};
module.exports = { authUser };
