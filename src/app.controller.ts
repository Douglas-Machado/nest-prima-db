import { Controller, Get, Post, Body, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDTO } from './DTO/create-user-dto';
import { Response as ExpressResponse } from 'express';
import { Prisma } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public async getUsers(@Response() res: ExpressResponse) {
    const users = await this.appService.getUsers();
    res.statusCode = 200;
    return users;
  }

  @Post()
  public async createUser(
    @Response() res: ExpressResponse,
    @Body() createUserDTO: CreateUserDTO,
  ) {
    try {
      const user = await this.appService.createUser(createUserDTO);
      return user;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          res.status(400);
          return res.json({ error: 'This email already exists' });
        }
      }
    }
  }
}
