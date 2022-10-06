import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HTTPStatus } from 'src/enums/status.enum';
import { Repository } from 'typeorm';
import { Contact } from './../model/contacts.model';
import { GenericResponse } from './../model/response/generic.reponse';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  // Add Contact
  async create(contact: Contact): Promise<GenericResponse> {
    Logger.log('Entered ContactService create...');
    const date = new Date();
    const gResponse = new GenericResponse();
    gResponse.status = HTTPStatus.OK;
    contact.dateTime = date.toISOString();
    await this.contactRepository.save(contact);
    gResponse.data = true;
    Logger.log('Exited ContactService create.');
    return gResponse;
  }

  // get list Contact
  async getList(): Promise<GenericResponse> {
    Logger.log('Entered ContactService getList');
    const listContact = await this.contactRepository.find();
    const gResponse = new GenericResponse();
    gResponse.status = HTTPStatus.OK;
    gResponse.data = listContact;
    gResponse.message = 'Success';
    Logger.log('Exited ContactService getList.');
    return gResponse;
  }
  // get contact by id
  async getContactById(id: number): Promise<GenericResponse> {
    Logger.log('Entered ContactService getContactById');
    const listContact = await this.contactRepository.findOneBy({ id });
    const gResponse = new GenericResponse();
    gResponse.status = HTTPStatus.OK;
    gResponse.data = listContact;
    gResponse.message = 'Success';
    Logger.log('Exited ContactService getContactById.');
    return gResponse;
  }

  // delete contact
  async delete(id: number): Promise<GenericResponse> {
    Logger.log('Entered ContactService delete');
    await this.contactRepository.delete({ id });
    const gResponse = new GenericResponse();
    gResponse.status = HTTPStatus.OK;
    gResponse.data = true;
    gResponse.message = 'Success';
    Logger.log('Exited ContactService delete.');
    return gResponse;
  }
}
