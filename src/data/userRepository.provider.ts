// userRepository.provider.ts

import { UserRepository } from "./repositories/user.repository";

// resolve a dependência da abstração com a implementação do repositório
export const userRepositoryProvider = {
  provide: UserRepository,
  useClass: UserRepository, 
};