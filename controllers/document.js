import { Document } from "../models";

export const createDocument = async (req, res) => {
  const {
    name = '',
    category = '',
    content = ''
  } = req.body;

  const {
    id: userId
  } = req.decoded;

  if(name === '' || category === '' || content === ''){
    return res.status(400).json({ message: 'wrong parameters' }); 
  }
  
  const document = await Document.create({
    name,
    category,
    content,
    userId
  });

  return res.status(200).json({ document }); 
}