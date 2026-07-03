import jwt from "jsonwebtoken";
export const genToken = async (User) => {
  try {
    const payload = { id: User._id };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("Oreo", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
  } catch (error) {
    throw next(error)
  }
};
