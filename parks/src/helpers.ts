import { paramCase, snakeCase } from 'change-case';

import { StringCase } from './typings';

export const convertPermalink = (
  permalink: string,
  casing: StringCase = StringCase.SNAKE,
): string => {
  let formatedPermalink = permalink;

  switch (casing) {
    case StringCase.SNAKE:
      formatedPermalink = snakeCase(permalink);
      break;
    case StringCase.PARAM:
      formatedPermalink = paramCase(permalink);
    default:
      break;
  }

  return formatedPermalink;
};
