import { findTypeNameInParent } from '../../graphql/resolvers';

describe('graphql', () => {
  describe('resolvers', () => {
    describe('findTypeNameInParent', () => {
      const mockTypeName = 'TestObject';
      const mockMapping = [['name', mockTypeName]];

      type TypeName = typeof mockTypeName;

      it('returns the correct typename', () => {
        const mockParent = { name: 'test' };
        const typename = findTypeNameInParent<TypeName>(mockParent, mockMapping);

        expect(typename).toStrictEqual(mockTypeName);
      });

      it('returns null for unknown typename', () => {
        const mockParent = { doesNotExist: 'test' };
        const typename = findTypeNameInParent<TypeName>(mockParent, mockMapping);

        expect(typename).toBeNull();
      });
    });
  });
});
