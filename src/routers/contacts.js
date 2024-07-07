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
import { validateMongoId } from '../middlewares/validateMongoId.js';

export const contactsRouter = Router();
contactsRouter.use('/contacts/:contactsId', validateMongoId('contactsId'));

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