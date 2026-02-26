const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { createAccessToken, createRefreshToken } = require("../auth/checkAuth");
const {
  NotFoundError,
  AuthFailureError,
  ConflictRequestError,
} = require("../core/error.response");
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
    const { fullName, email, password, date, dob } = req.body;
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      throw new ConflictRequestError("Email đã tồn tại");
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await userModel.create({
      fullName,
      date,
      dob,
      email,
      password: hashedPassword,
    });

    const accessToken = createAccessToken({ id: newUser._id });
    const refreshToken = createRefreshToken({ id: newUser._id });

    setCookie(res, refreshToken, accessToken);

    return new Created({
      message: "Đăng ký thành công",
      metadata: newUser,
    }).send(res);
  }
  async login(req, res) {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      throw new NotFoundError("Tài khoản hoặc mật khẩu không chính xác !");
    }

    const isMathPassword = await bcrypt.compare(password, findUser.password);

    if (!isMathPassword) {
      throw new AuthFailureError("Tài khoản hoặc mật khẩu không chính xác !");
    }

    const accessToken = createAccessToken({ id: findUser._id });
    const refreshToken = createRefreshToken({ id: findUser._id });

    setCookie(res, accessToken, refreshToken);

    return new OK({
      message: "Đăng nhập thành công",
      metadata: { accessToken, refreshToken },
    }).send(res);
  }

  async authUser(req, res) {
    const userId = req.user;
    if (!userId) {
      throw new AuthFailureError("Vui lòng đăng nhập lại");
    }
    const findUser = await userModel.findById(userId);
    if (!findUser) {
      throw new NotFoundError("Người dùng không tồn tại");
    }

    return new OK({
      message: "Xác thực thành công",
      metadata: findUser,
    }).send(res);
  }

  async logout(req, res) {
    const userId = req.user;
    const findUser = await userModel.findById(userId);
    if (!findUser) {
      throw new NotFoundError("Người dùng không tồn tại");
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("logged");
    return new OK({
      message: "Đăng xuất thành công",
      metadata: findUser,
    }).send(res);
  }
  async forgotPassword(req, res) {
    const { email } = req.body;
    const findUser = await userModel.findOne(email);
    if (!findUser) {
      throw new NotFoundError("Người dùng không tồn tại");
    }
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const tokenForgotPassword = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
    res.cookie("tokenForgotPassword", tokenForgotPassword, {
      httpOnly: false,
      secure: true,
      maxAge: 5 * 60 * 1000,
      sameSite: "strict",
    });
    await otpModel.create({
      otp,
      email,
    });
  }
}
module.exports = new UserController();
