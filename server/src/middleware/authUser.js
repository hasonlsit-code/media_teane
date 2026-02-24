const authUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { authUser };
