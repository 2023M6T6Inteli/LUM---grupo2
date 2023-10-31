import { UserDto } from "./dtos/user.dto";

export abstract class IRepository<T> {
    abstract create(dto: UserDto): Promise<T>;
  
    abstract findAll(): Promise<T[]>;
  
    abstract findById(id: string): Promise<T | null>;
  
    abstract update(dto: UserDto): Promise<T>;
  
    abstract delete(id: string): Promise<boolean>;
  }