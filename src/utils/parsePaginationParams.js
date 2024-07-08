import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PER_RAGE,
} from '../constants/constants.js';

const parseNumber = (number, defaultValue) => {
  return Number.isNaN(parseInt(number)) ? defaultValue : parseInt(number);
};
export const parsePaginationParams = (query) => {
  const { page, perPage } = query;
  const parsedPage = parseNumber(page, DEFAULT_PAGE_NUMBER);
  const parsedPerPage = parseNumber(perPage, DEFAULT_PER_RAGE);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};