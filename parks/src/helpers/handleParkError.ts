import { IParkError } from '@models/ParkError';

export const handleParkError = (error: Error, message?: string): IParkError => ({
  cause: error,
  message: message || error.message,
});
