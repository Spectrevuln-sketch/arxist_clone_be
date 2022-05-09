import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role, UserStatus } from "./enum/users.enum";
import paginate from 'mongoose-paginate-v2';
import * as mongoose from 'mongoose';
import { Users } from "./users.schema";


export type TipDocument = Tip & Document;


@Schema()
export class Tip {

  @Prop({
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Users.name
    }
  })
  user_id: string;

  @Prop({
    required: true
  })
  tip_per_unit: number;

  @Prop()
  pesan: string;

  @Prop()
  label: string;

  @Prop()
  logo_tip_path: string;

}


export const TipSchema = SchemaFactory.createForClass(Tip)
