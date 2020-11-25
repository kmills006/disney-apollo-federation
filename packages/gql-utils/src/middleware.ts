import crypto from 'crypto';
import { GraphQLResolveInfo } from 'graphql';

export type GraphQLMiddlewareFn = (
  resolve: (p: unknown, a: unknown, c: unknown, i: GraphQLResolveInfo) => unknown,
  root: unknown,
  args: unknown,
  ctx: unknown,
  info: GraphQLResolveInfo,
) => Promise<unknown>;

export const createOperationHash = (size = 6) => crypto.randomBytes(size).toString('hex');

export const logResolverTime: GraphQLMiddlewareFn = async (
  resolve,
  root,
  args,
  ctx,
  info,
) => {
  const hash = createOperationHash();
  const operation = `resolver:${info.parentType}:${info.fieldName}:${hash}`;

  console.time(operation);

  const result = await resolve(root, args, ctx, info);

  console.timeEnd(operation);

  return result;
};
