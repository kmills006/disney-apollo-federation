import { context } from '../../graphql/context';

describe('graphql', () => {
  describe('context', () => {
    it('returns the context object ', () => {
      const ctx = context();
      expect(ctx.repositories.parks).toBeDefined();
    });
  });
});
