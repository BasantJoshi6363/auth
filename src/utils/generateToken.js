import jwt from "jsonwebtoken"
export const generateToken = async (res,id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    const options = {
        expires: new Date(Date.now() +  24 * 60 * 60 * 1000),
        httpOnly: true,
        secure : true
    };
    res.cookie("token", token, options);
    return token;
}