import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role, UserStatus } from "./enum/users.enum";
import paginate from 'mongoose-paginate-v2';
import mongoose from "mongoose";



export type UsersDocument = Users & Document;


@Schema()
export class Users {

  @Prop({
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Users.name
    }
  })
  user_id_tip: string;

  @Prop()
  amount_tip: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  role: Role;

  @Prop({ required: true })
  status: UserStatus;

}


export const UserSchema = SchemaFactory.createForClass(Users)
