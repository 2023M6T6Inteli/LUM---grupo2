import { UserDto } from "../dtos/user.dto";


// serviços de abstraçõa para usuários
export abstract class IUserService<T> {
    abstract createUser(dto: UserDto): Promise<T>;
  
    abstract findAllUsers(): Promise<T[]>;
  
    abstract findUserById(id: string): Promise<T | null>;
  
    abstract updateUser(dto: UserDto, id: string): Promise<T>;
  
    abstract deleteUser(id: string): Promise<object>;
  }