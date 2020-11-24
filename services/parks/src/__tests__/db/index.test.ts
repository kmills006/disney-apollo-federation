import * as E from 'fp-ts/lib/Either';
import { mock } from 'jest-mock-extended';

import { parse } from '../../db';
import { ReadFile } from '../../db/readFile';
import { ParseJsonContent } from '../../db/parseJsonContent';

jest.mock('fs');

describe('db', () => {
  describe('parseJsonFile', () => {
    const mockRead = jest.fn();
    const mockParse = jest.fn();

    const mockReadFile = mock<ReadFile>(mockRead);
    const mockParseJsonContect = mock<ParseJsonContent>(mockParse);
    const systemUnderTest = parse(mockReadFile, mockParseJsonContect);

    const jsonString = '{ "isTest": true }';

    beforeEach(() => {
      mockRead.mockReset();
      mockParse.mockReset();
    });

    it('successfully reads and parses a json file and returns right', () => {
      mockRead.mockReturnValue(E.right(jsonString));
      mockParse.mockReturnValue(E.right(JSON.parse(jsonString)));

      const actual = systemUnderTest('filename.json');

      expect(mockRead).toBeCalledTimes(1);
      expect(mockParse).toBeCalledTimes(1);
      expect(E.isRight(actual)).toBeTruthy();
    });

    it('cannot read a file and returns left', () => {
      mockRead.mockReturnValue(E.left('forced left'));

      const actual = systemUnderTest('filename.json');

      expect(mockRead).toBeCalledTimes(1);
      expect(mockParse).toBeCalledTimes(0);
      expect(E.isLeft(actual)).toBeTruthy();
    });

    it('cannot parseJsonFile and returns left', () => {
      mockRead.mockReturnValue(E.right(''));
      mockParse.mockReturnValue(E.left('forced left'));

      const actual = systemUnderTest('filename.json');

      expect(mockRead).toBeCalledTimes(1);
      expect(mockParse).toBeCalledTimes(1);
      expect(E.isLeft(actual)).toBeTruthy();
    });
  });
});
