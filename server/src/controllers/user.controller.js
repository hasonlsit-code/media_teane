const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { createAccessToken, createRefreshToken } = require("../auth/checkAuth");
const { NotFoundError, AuthFailureError } = require("../core/error.response");
const { OK, Created } = require("../core/success.response");
function setCookie(res, refreshToken, accessToken) {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 days
    sameSite: "strict",
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: "strict",
  });
  res.cookie("logged", 1, {
    httpOnly: false,
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: "strict",
  });
}
class UserController {
  async register(req, res) {
    const { fullName, date, gender, email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });
    const accessToken = createAccessToken({ id: newUser._id });
    const refreshToken = createRefreshToken({ id: newUser._id });
    setCookie(res, accessToken, refreshToken);
    throw new Created({
      message: "Đăng kí thành công",
      metadata: newUser,
    }).send(res);
  }
  async login(req, res) {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      throw new NotFoundError("Tài khoản hoặc mật khẩu không chính xác");
    }
    const isMathPassword = bcrypt.compare(password, findUser.password);
    if (!isMathPassword) {
      throw new AuthFailureError("Tài khoản hoặc mật khẩu không chính xác");
    }
    const accessToken = createAccessToken({ id: findUser._id });
    const refreshToken = createRefreshToken({ id: findUser._id });
    setCookie(res, accessToken, refreshToken);
    new OK({
      message: "dang nhap thanh cong",
      metadata: { accessToken, refreshToken },
    }).send(res);
  }
  async authUser(req, res) {
    const { userId } = req.user;
  }
}
module.exports = new UserController();
