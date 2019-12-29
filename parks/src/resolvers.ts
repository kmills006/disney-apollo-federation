import { convertPermalink } from './helpers';
import { mocks } from './mocks';
import { IPark, StringCase } from './typings';

interface IArg {
  permalink: string;
}

export const resolvers = {
  Query: {
    park: (_: undefined, args: IArg) => {
      const permalink = convertPermalink(args.permalink, StringCase.PARAM);

      return mocks.parks.find((p: IPark) => p.permalink === permalink);
    },
    parks: () => mocks.parks,
  },
};
