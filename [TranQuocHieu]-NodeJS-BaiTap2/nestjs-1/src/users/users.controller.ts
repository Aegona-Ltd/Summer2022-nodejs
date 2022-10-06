import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { CreateUserDTO } from '../model/request/create-user.dto';
import { User } from '../model/users.model';
import { UsersService } from './users.service';
import { LoginRequest } from '../model/request/login.dto';
import { GenericResponse } from './../model/response/generic.reponse';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<GenericResponse> {
    Logger.log('GET: /users');
    return this.usersService.findAll();
  }

  @Get(':email')
  async findById(@Param('email') email: string) {
    Logger.log('GET: /users/' + email);
    return this.usersService.findById(email);
  }

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO) {
    Logger.log('POST: /users');
    return this.usersService.create(createUserDTO);
  }

  @Put()
  async update(@Body() user: User) {
    Logger.log('PUT: /users');
    return this.usersService.update(user);
  }

  @Delete(':email')
  async delete(@Param('email') email: string) {
    Logger.log('DELETE: /users/' + email);
    return this.usersService.delete(email);
  }

  @Post('/login')
  async login(@Body() loginRequest: LoginRequest) {
    Logger.log('GET: /users/login');
    return this.usersService.login(loginRequest);
  }
}
