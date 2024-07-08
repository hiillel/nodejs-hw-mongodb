import { KEYS_OF_CONTACT } from '../constants/constants.js';
import { ContactsCollection } from '../db/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsFilters = ContactsCollection.find();

  if (filter.contactType) {
    contactsFilters
      .where(KEYS_OF_CONTACT.contactType)
      .equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactsFilters
      .where(KEYS_OF_CONTACT.isFavourite)
      .equals(filter.isFavourite);
  }
  if (userId) {
    contactsFilters.where('userId').equals(userId);
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

export const getContactById = async (contactId, userId) => {
  return await ContactsCollection.findOne({ _id: contactId, userId: userId });
};

export const createContact = async (payload, userId) =>
  await ContactsCollection.create({ ...payload, userId: userId });

export const upsertContact = async (contactId, userId, updateData) => {
  return await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId: userId },
    updateData,
    { new: true },
  );
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId: userId,
  });

  return contact;
};