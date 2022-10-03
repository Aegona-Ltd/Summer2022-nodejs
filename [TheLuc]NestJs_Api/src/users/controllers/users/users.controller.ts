import { CreateUserProfileDto } from './../../dtos/CreateUserProfile.dto';
import { ValidateCreateUserPipe } from './../../pipes/validate-create-user.pipe';
import { UpdateUserDto } from './../../dtos/UpdateUser.dto';
import { UsersService } from './../../services/users/users.service';
import { CreateUserDto } from './../../dtos/CreateUser.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PrimaryGeneratedColumn } from 'typeorm';
import { AuthGuard } from 'src/users/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUserById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }

  @Get(':id/profiles')
  showProfile(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getProfiles(id);
  }

  @Post(':id/profiles/create')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.createUserProfile(id, createUserProfileDto);
  }
}
