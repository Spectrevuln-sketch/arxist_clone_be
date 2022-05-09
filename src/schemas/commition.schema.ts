import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role, UserStatus } from "./enum/users.enum";
import paginate from 'mongoose-paginate-v2';
import * as mongoose from 'mongoose';
import { Users } from "./users.schema";


export type CommitionsDocument = Commitions & Document;


@Schema()
export class Commitions {

  @Prop({
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Users.name
    }
  })
  user_id: string;

  @Prop()
  name: string;

  @Prop()
  amount: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  role: Role;

  @Prop({ required: true })
  status: UserStatus;

}


export const CommitionsSchema = SchemaFactory.createForClass(Commitions)
