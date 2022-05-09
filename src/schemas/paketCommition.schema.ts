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

  @Prop()
  judul_komisi: string;

  // @Prop({
  //   type: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: KategoriCommition.name
  //   },
  // })
  @Prop()
  kategori: string;

  @Prop({
    type: Array
  })
  tags_commition: [];

  @Prop({
    type: String
  })
  deskripsi_commition: string;

  @Prop({
    type: Array,
  })
  faq: [];
}


export const MycommitionSchema = SchemaFactory.createForClass(Mycommition)
