import fs from 'fs';
import * as E from 'fp-ts/lib/Either';

import { readJsonFile } from '../../db';

jest.mock('fs');

describe('db', () => {
  describe('readJsonFile', () => {
    beforeEach(() => {
      (fs.readFileSync as jest.Mock).mockReset();
    });

    it('reads a file from the filesystem and returns right', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue('');

      const actual = readJsonFile('filename.json');
      expect(E.isRight(actual)).toBeTruthy();
    });

    it('cannot read a file from the filesystem and returns left', () => {
      const actual = readJsonFile('filename.json');

      expect(E.isLeft(actual)).toBeTruthy();
    });
  });
});
