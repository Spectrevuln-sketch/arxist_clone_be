import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from 'src/schemas/users.schema';
import { UsersRepository } from './repository/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema
      }

    ])
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule { }
