

const middleware= async (req, res, next) => {
    try {
     const user = res.locals.loggedInUser;
     console.log(user);
     if (!user)
      return res.status(401).json({
       error: {msg: "Log in to perform this action`"}
      });
      req.user = user;
      next();
     } catch (error) {
      next(error);
     }
   }

 module.exports = middleware