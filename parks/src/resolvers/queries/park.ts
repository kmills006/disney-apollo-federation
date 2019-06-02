import { mocks } from '../../mocks';

interface IArg {
  id: number;
}

export const park = async (_: undefined, args: IArg) => {
  const { id } = args;

  // TODO: Park interface
  return mocks.parks.find((p: any) => p.id === id);
};
