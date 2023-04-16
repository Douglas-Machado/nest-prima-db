import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-user-dto';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async getUsers() {
    const allUsers = await this.prisma.user.findMany();
    return allUsers;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<CreateUserDTO> {
    const newUser = await this.prisma.user.create({
      data: {
        name: createUserDTO.name,
        email: createUserDTO.email,
      },
    });
    return newUser;
  }
}
