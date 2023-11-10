// userRepository.provider.ts

import { UserRepository } from "./repositories/user.repository";

export const userRepositoryProvider = {
  provide: UserRepository,
  useClass: UserRepository, 
};