import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validationBody } from '../middlewares/validateBody.js';
import {
  contactCreateValidationSchema,
  contactUpdateValidationSchema,
} from '../validation/contact.js';

export const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get(
  '/contacts/:contactsId',
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/contacts',
  validationBody(contactCreateValidationSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/contacts/:contactsId',
  validationBody(contactUpdateValidationSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/contacts/:contactsId',
  ctrlWrapper(deleteContactController),
);