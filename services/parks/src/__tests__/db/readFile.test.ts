import * as E from 'fp-ts/lib/Either';
import fs from 'fs';

import { readFile } from '../../db/readFile';

jest.mock('fs');

describe('db', () => {
  describe('readFile', () => {
    beforeEach(() => {
      (fs.readFileSync as jest.Mock).mockReset();
    });

    it('successfully reads a file from the filesystem and returns right', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue('');

      const actual = readFile('filename.json');
      expect(E.isRight(actual)).toBeTruthy();
    });

    it('cannot read a file from the filesystem and returns left', () => {
      const actual = readFile('filename.json');

      expect(E.isLeft(actual)).toBeTruthy();
    });
  });
});
