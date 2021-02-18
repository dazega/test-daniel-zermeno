import {
  Document,
  RecordHistory,
  User,
  SharedDocument
} from "../models";

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
    id: userId,
    username: ownerName
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
    name: document.name,
    ownerName
  });
  
  await document.update({
    content,
    name,
    category,
  });

  return res.status(200).json({ document });
}

export const shareDocumentWith = async (req, res) => {
  let {
    documentId
  } = req.params;

  const {
    emails
  } = req.body;

  const {
    id: userId,
    email: userEmail
  } = req.decoded;

  documentId = parseInt(documentId);

  if (isNaN(documentId) || !Array.isArray(emails)) return res.status(400).json({ message: 'wrong parameters' });

  const document = await Document.findOne({
    where: {
      id: documentId
    },
    attributes: ['id', 'userId']
  });

  if(!document) return res.status(404).json({ message: 'Document not found' });

  if(document.userId !== userId) return res.status(403).json({ message: 'You are not the owner of the document' });

  const emailError = [];

  const promises = emails.map(async (email)=>{
    if(email !== userEmail){
      const user = await User.findOne({
        where: { email },
        attributes: ['id']
      });

      if(user){
        await SharedDocument.create({
          userId: user.id,
          documentId: document.id
        });
      } else {
        emailError.push(email);
      }
    } else {
      emailError.push(email);
    }
  });
  
  await Promise.all(promises);

  if(emailError.length === 0)
    return res.status(200).json({ message: 'Documento compartido correctamente' });
  else if (emailError.length === emails.length)
    return res.status(200).json({ message: 'Error al compartir el documento, no fueron encontrados los usuarios' });
  else
    return res.status(200).json({ message: 'Documento compartido correctamente aunque no se encontraron todos los usuarios', emailError });
}

export const getDocuments = async (req, res) => {
  const {
    id: userId
  } = req.decoded;

  const ownDocuments = await Document.findAll({
    where: { userId },
    attributes: ['url', 'id', 'name', 'category', 'content', 'ownerName']
  });

  const sharedDocumentsArray = await SharedDocument.findAll({
    where: { userId },
    include: [{
      model: Document,
      required: true,
      as: 'document'
    }],
  });

  const sharedDocuments = sharedDocumentsArray.map((document) => document.document);

  return res.status(200).json({ documents: [...ownDocuments, ...sharedDocuments] });
}

export const getDocument = async (req, res) => {
  let {
    documentId
  } = req.params;

  const {
    id: userId
  } = req.decoded;

  documentId = parseInt(documentId);
  if (isNaN(documentId)) return res.status(400).json({ message: 'wrong parameters' });

  const document = await Document.findOne({
    where: { id: documentId },
    attributes: ['url', 'id', 'name', 'category', 'content', 'ownerName', 'userId']  
  });

  if(!document) return res.status(404).json({ message: 'Document not found' });

  if (document.userId === userId) return res.status(200).json({ document });
  else {
    const sharedDocument = await SharedDocument.findOne({
      where: {
        userId,
        documentId
      }
    });

    if(sharedDocument) return res.status(200).json({ document });
    else return res.status(403).json({ message: 'You are not allow to see the document' });

  }
}
