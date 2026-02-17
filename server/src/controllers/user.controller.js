const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { createAccessToken, createRefreshToken } = require("../auth/checkAuth");
class UserController {
  async register(req, res) {
    const { fullName, email, password } = req.body;
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
    return res
      .status(201)
      .json({ message: "Đăng kí thành công", metadata: newUser });
    console.log(fullName, email, password);
  }
  async login(req, res) {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "Khong co email nay" });
    }
    const isMathPassword = bcrypt.compare(password, findUser.password);
    if (!isMathPassword) {
      return res.status(400).json({ message: "Mat khau khong chinh xac" });
    }
    const accessToken = createAccessToken({ id: findUser._id });
    const refreshToken = createRefreshToken({ id: findUser._id });
    new OK({
      message: "dang nhap thanh cong",
      metadata: { accessToken, refreshToken },
    }).send(res);
  }
}
module.exports = new UserController();
