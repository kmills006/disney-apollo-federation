const { env } = process;

export const ATTRACTIONS_SERVICE = env.ATTRACTIONS_SERVICE || 'http://localhost:4001/graphql';
export const DINING_SERVICE = env.DINING_SERVICE || 'http://localhost:4002/graphql';
export const HOTELS_SERVICE = env.HOTELS_SERVICE || 'http://localhost:4003/graphql';
