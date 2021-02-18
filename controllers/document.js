import { Document, RecordHistory } from "../models";

export const createDocument = async (req, res) => {
  const {
    name = '',
    category = '',
    content = ''
  } = req.body;

  const {
    id: userId,
    username: ownerName
  } = req.decoded;

  if(name === '' || category === '' || content === ''){
    return res.status(400).json({ message: 'wrong parameters' }); 
  }
  
  const document = await Document.create({
    name,
    category,
    content,
    userId,
    ownerName
  });

  return res.status(200).json({ document }); 
}

export const updateDocument = async (req, res) => {
  let {
    documentId
  } = req.params;

  const {
    content = '',
    name = '',
    category = ''
  } = req.body;

  const {
    id: userId
  } = req.decoded;

  documentId = parseInt(documentId);
  if (isNaN(documentId) || content === '' || name === '' || category === '') return res.status(400).json({ message: 'wrong parameters' });

  
  const document = await Document.findOne({
    where: {
      id: documentId
    }
  });
  
  if(!document) return res.status(404).json({ message: 'Document not found' });
  
  if(document.userId !== userId) return res.status(403).json({ message: 'You are not the owner of the document' });

  await RecordHistory.create({
    category: document.category,
    content: document.content,
    documentId: document.id,
    name: document.name  
  });
  
  await document.update({
    content,
    name,
    category
  });

  return res.status(200).json({ document });
}
