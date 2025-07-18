import jwt from "jsonwebtoken";

export function createtoken(res, userId, email) {
  try {
    const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
    //   secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
  } catch (error) {
    console.log(error);
    
  }
}
