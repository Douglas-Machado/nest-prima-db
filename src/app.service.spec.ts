import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

describe('AppController', () => {
  let appService: AppService;
  let prisma: PrismaService;
  const fakeUsers = [
    {
      id: '1',
      name: 'John',
      email: 'john@example.com',
    },
  ];
  const prismaMock = {
    user: {
      findMany: jest.fn().mockResolvedValue(fakeUsers),
      create: jest.fn().mockResolvedValue(fakeUsers[0]),
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, { provide: PrismaService, useValue: prismaMock }],
    }).compile();

    appService = app.get<AppService>(AppService);
    prisma = app.get<PrismaService>(PrismaService);
  });

  describe('users', () => {
    it('should create an user', async () => {
      expect(await appService.createUser(fakeUsers[0])).toEqual(fakeUsers[0]);
      expect(prisma.user.create).toHaveBeenCalledTimes(1);
    });

    it('should return all users', async () => {
      expect(await appService.getUsers()).toEqual(fakeUsers);
      expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    });
  });
});
