import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const contactsRouter = Router();
contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));
contactsRouter.get(
  '/contacts/:contactsId',
  ctrlWrapper(getContactByIdController),
);

// post

contactsRouter.post('/contacts', ctrlWrapper(createContactController));

// patch

contactsRouter.patch(
  '/contacts/:contactsId',
  ctrlWrapper(patchContactController),
);

// delete

contactsRouter.delete(
  '/contacts/:contactsId',
  ctrlWrapper(deleteContactController),
);