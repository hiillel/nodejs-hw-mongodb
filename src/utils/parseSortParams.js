import { KEYS_OF_CONTACT, SORT_ORDER } from '../constants/constants.js';

const parseSortOrder = (sortOrder) => {
  if ([SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder)) {
    return sortOrder;
  }
  return SORT_ORDER.ASC;
};
const parseSortBy = (sortBy) => {
  if (Object.values(KEYS_OF_CONTACT).includes(sortBy)) return sortBy;
  return KEYS_OF_CONTACT._id;
};
export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};