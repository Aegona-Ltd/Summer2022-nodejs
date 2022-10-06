import {
  Controller,
  Get,
  Post,
  Delete,
  Logger,
  Param,
  Body,
} from '@nestjs/common';
import { GenericResponse } from './../model/response/generic.reponse';
import { ContactService } from './contacts.service';
import { Contact } from './../model/contacts.model';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactService) {}

  @Get()
  async findAll(): Promise<GenericResponse> {
    Logger.log('GET: /contacts');
    return this.contactsService.getList();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<GenericResponse> {
    Logger.log('GET: /contacts/:id');
    return this.contactsService.getContactById(id);
  }

  @Post()
  async addContact(@Body() contact: Contact): Promise<GenericResponse> {
    Logger.log('POST: /contacts');
    return this.contactsService.create(contact);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<GenericResponse> {
    Logger.log('DELETE: /contacts/:id');
    return this.contactsService.delete(id);
  }
}
