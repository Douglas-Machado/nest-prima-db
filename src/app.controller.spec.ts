import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { response } from 'express';

const fakeUsers = [
  {
    id: 1,
    name: 'teste one',
    email: 'email@testeone.com',
  },
  {
    id: 2,
    name: 'test two',
    email: 'email@testtwo.com',
  },
  {
    id: 3,
    name: 'test three',
    email: 'email@testthree.',
  },
];

const serviceMock = {
  getUsers: jest.fn().mockResolvedValue(fakeUsers),
  createUser: jest.fn().mockReturnValue(fakeUsers[0]),
};

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: serviceMock }],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('get all', () => {
    it('should list all users', async () => {
      const res = await appController.getUsers(response);

      expect(appService.getUsers).toBeCalledTimes(1);
      expect(res).toEqual(fakeUsers);
    });
  });

  describe('create', () => {
    it('should create an user', async () => {
      const res = await appController.createUser(response, {
        name: 'teste one',
        email: 'email@testeone.com',
      });

      expect(appService.getUsers).toBeCalledTimes(1);
      expect(res).toEqual(fakeUsers[0]);
    });
  });
});
