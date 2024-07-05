import { ContactsCollection } from '../db/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { KEYS_OF_CONTACT } from '../constants/constants.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name', 
  sortOrder = 'asc', 
  filter = {},
} = {}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsFilters = ContactsCollection.find();

  if (filter.isFavourite !== undefined) {
    contactsFilters
      .where(KEYS_OF_CONTACT.isFavourite)
      .equals(filter.isFavourite);
  }

  const [totalItems, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsFilters).countDocuments(),
    ContactsCollection.find()
      .merge(contactsFilters)
      .skip(skip)
      .limit(limit)
      .sort({
        [sortBy]: sortOrder,
      })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(page, perPage, totalItems);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) =>
  await ContactsCollection.findById(contactId);

export const createContact = async (payload) =>
  await ContactsCollection.create(payload);

export const upsertContact = async (contactId, payload) => {
  const upsertedContact = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    { new: true },
  );

  return upsertedContact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};