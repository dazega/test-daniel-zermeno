import { User } from "../models";
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email
    }
  });

  if(!user) res.status(404).json({message: "Email not found"});

  if(user.password !== password) res.status(404).json({message: "Wrong answer"});

  const payload = {
    id: user.id,
    email: user.email,
    username: `${user.name} ${user.lastName}`
  };

  const token = await jwt.sign(payload, 'SECRET_KEY', {
    expiresIn: '5h'
  });

  res.json({token});
};

