import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModel } from './contacts/contacts.module';
import { Contact } from './model/contacts.model';
import { User } from './model/users.model';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    ContactModel,
    ConfigModule.forRoot({
      envFilePath: '.env.mysql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT) || 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User, Contact],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
