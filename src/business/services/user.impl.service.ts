import { UserDto } from "../dtos/user.dto";

export abstract class IUserService<T> {
    abstract createUser(dto: UserDto): Promise<T>;
  
    abstract findAllUsers(): Promise<T[]>;
  
    abstract findUserById(id: string): Promise<T | null>;
  
    abstract updateUser(dto: UserDto): Promise<T>;
  
    abstract deleteUser(id: string): Promise<boolean>;
  }