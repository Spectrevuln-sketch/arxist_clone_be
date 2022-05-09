import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role, UserStatus } from "./enum/users.enum";
import paginate from 'mongoose-paginate-v2';
import * as mongoose from 'mongoose';
import { Users } from "./users.schema";
import { AssetsStatusEnum } from "./enum/assets.enum";


export type AssetsDocuments = Assets & Document;


@Schema()
export class Assets {

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
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: string;

  @Prop({ required: true })
  path_assets: string;

  @Prop({
    type: String,
    required: true,
    enum: Object.values(AssetsStatusEnum),
  })
  status: AssetsStatusEnum;

}


export const AssetsSchema = SchemaFactory.createForClass(Assets)
