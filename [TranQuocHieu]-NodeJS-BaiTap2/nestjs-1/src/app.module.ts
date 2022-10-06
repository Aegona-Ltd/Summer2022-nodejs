import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModel } from './contacts/contacts.module';
import { Contact } from './model/contacts.model';
import { User } from './model/users.model';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    ContactModel,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'contact_db',
      entities: [User, Contact],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
