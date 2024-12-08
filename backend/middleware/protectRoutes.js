
const protectRoutes = (req, res, next) => {
    const token = req.cookies.jwt;

    if(!token) {
       return res.status(401).json({error: "Unauthorized - No token provided"});
    }
};

export default protectRoutes;