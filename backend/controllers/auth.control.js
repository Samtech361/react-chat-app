export const signup = (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
  } catch (error) {}
};

export const login = (req, res) => {
  res.send("login page");
};

export const logout = (req, res) => {
  res.send("logout page");
};
