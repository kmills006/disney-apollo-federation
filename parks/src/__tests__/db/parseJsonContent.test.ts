import * as E from 'fp-ts/lib/Either';

import { parseJsonContent } from '../../db/parseJsonContent';

jest.mock('fs');

describe('db', () => {
  describe('parseJsonContent', () => {
    it('successfully parses a json string and returns right', () => {
      const actual = parseJsonContent('{"name": "parks"}');
      expect(E.isRight(actual)).toBeTruthy();
    });

    it('cannot parse a json string and returns left', () => {
      const actual = parseJsonContent('');
      expect(E.isLeft(actual)).toBeTruthy();
    });
  });
});
