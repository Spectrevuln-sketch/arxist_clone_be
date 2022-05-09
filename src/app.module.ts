import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommistionModule } from './commistion/commistion.module';
import { MyassetsModule } from './myassets/myassets.module';
import { TipPendukungModule } from './tip-pendukung/tip-pendukung.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      load: [],
    }),
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost:27017/arxist-db'),
    UsersModule,
    AuthModule,
    CommistionModule,
    MyassetsModule,
    TipPendukungModule
  ],
})
export class AppModule { }
