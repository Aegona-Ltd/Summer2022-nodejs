import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO } from '../model/request/create-user.dto';
import { User } from '../model/users.model';
import { LoginRequest } from '../model/request/login.dto';
import { UserResponse } from '../model/response/user.response';
import { GenericResponse } from '../model/response/generic.reponse';
import { HTTPStatus } from 'src/enums/status.enum';

@Injectable()
export class UsersService {
  // Contructor
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Add User
  async create(user: CreateUserDTO) {
    Logger.log('Entered UserService create...');
    const gResponse = new GenericResponse();
    gResponse.status = HTTPStatus.INTERNAL_SERVER_ERROR;
    // Hash Password
    const saltOrRounds = 10;
    const passHash = await bcrypt.hash(user.password, saltOrRounds);

    // Add Data in Entity
    const newUser = new User();
    newUser.email = user.email;
    newUser.password = passHash;
    newUser.name = user.name;
    newUser.isAdmin = user.isAdmin;
    this.userRepository.save(newUser);

    // Response Entity
    const userR = new UserResponse();
    userR.email = newUser.email;
    userR.name = newUser.name;
    userR.isAdmin = newUser.isAdmin;

    gResponse.status = HTTPStatus.OK;
    gResponse.data = userR;
    gResponse.message = 'Create User Success';
    Logger.log('Add user success');
    Logger.log('Exited UserService create.');
    return gResponse;
  }

  // find All User
  async findAll(): Promise<GenericResponse> {
    Logger.log('Entered UserService findAll...');
    const listUser = await (
      await this.userRepository.find()
    ).map((user) => {
      const userRes = new UserResponse();
      userRes.email = user.email;
      userRes.name = user.name;
      userRes.isAdmin = user.isAdmin;
      return userRes;
    });
    const gResponse = new GenericResponse();
    gResponse.status = HTTPStatus.OK;
    gResponse.data = listUser;
    Logger.log('Exited UserService findAll.');
    return gResponse;
  }

  // find User by Id
  async findById(email: string): Promise<GenericResponse> {
    Logger.log('Entered UserService findByid: ' + email + ' ...');
    const user = await this.userRepository.findOneBy({ email });

    const userResponse = new UserResponse();
    userResponse.name = user.name;
    userResponse.email = user.email;
    userResponse.isAdmin = user.isAdmin;

    const gResponse = new GenericResponse();
    gResponse.status = HTTPStatus.OK;
    gResponse.data = userResponse;
    Logger.log('Exited UserService findByid.');
    return gResponse;
  }

  // Update User
  async update(user: User): Promise<GenericResponse> {
    Logger.log('Entered UserService update...');
    await this.userRepository.update(user.email, user);
    Logger.log('Exited UserService update.');
    return this.findById(user.email);
  }

  // Delete User
  async delete(email: string): Promise<GenericResponse> {
    Logger.log('Entered UserService delete...');
    await this.userRepository.delete({ email });
    Logger.log('Exited UserService delete.');
    const gResponse = new GenericResponse();
    gResponse.data = true;
    gResponse.status = HTTPStatus.OK;
    return gResponse;
  }

  // Login
  async login(request: LoginRequest): Promise<GenericResponse> {
    Logger.log('Entered UserService login...');
    const user = await this.userRepository.findOneBy({ email: request.email });
    const gResponse = new GenericResponse();
    gResponse.status = HTTPStatus.OK;
    if (user == null) {
      gResponse.status = HTTPStatus.BAD_REQUEST;
      gResponse.data = false;
      return gResponse;
    }
    const mathPassowd = await bcrypt.compare(request.password, user.password);
    gResponse.data = mathPassowd;
    Logger.log('Exited UserService login.');
    return gResponse;
  }
}
