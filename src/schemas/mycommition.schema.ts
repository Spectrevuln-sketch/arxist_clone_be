import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role, UserStatus } from "./enum/users.enum";
import paginate from 'mongoose-paginate-v2';
import * as mongoose from 'mongoose';
import { Users } from "./users.schema";
import { CommitionStatusEnum } from "./enum/commition.enum";


export type MyCommitionDocument = Mycommition & Document;


@Schema()
export class Mycommition {

  @Prop({
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Users.name
    }
  })
  user_id: string;

  @Prop({
    type: String,
    required: true,
    enum: Object.values(CommitionStatusEnum)
  })
  status: CommitionStatusEnum;

  @Prop()
  harga_comisi: number;

  @Prop({
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: Users.name
    }]
  })
  paket_id: [];
}


export const MycommitionSchema = SchemaFactory.createForClass(Mycommition)
