import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role, UserStatus } from "./enum/users.enum";
import paginate from 'mongoose-paginate-v2';



export type UsersDocument = Users & Document;


@Schema()
export class Users {
  @Prop()
  name: string;

  @Prop({
    required: true,
    unique: true
  })
  username: string;

  @Prop({
    required: true,
    unique: true
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: Role;

  @Prop({ required: true })
  status: UserStatus;

}


export const UserSchema = SchemaFactory.createForClass(Users)
