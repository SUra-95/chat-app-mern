
const protectRoutes = async(req, res, next) => {

    const token = req.cookies.jwt;
    if(!token) {
       return res.status(401).json({error: "Unauthorized - No token provided"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
        return res.status(401).json({error: "Unauthorized - invalid token provided"});
    }

    const user = await User.findById(decode.userId).select("-password"); 
    if(!user){
        return res.status(401).json({error: "User not found"});
    }

    req.user = user;

    next();
};

export default protectRoutes;