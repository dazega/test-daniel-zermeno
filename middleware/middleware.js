import jwt from 'jsonwebtoken';

export const checkToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token)
    return res.status(401).json({message: 'please login'});

  jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
    if (err) {
      return res.status(401).json({message: 'please login token not valid'});
    } else {
      req.decoded = decoded;
      next();
    }
  });
}