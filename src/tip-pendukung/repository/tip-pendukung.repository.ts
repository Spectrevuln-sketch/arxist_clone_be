import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Assets, AssetsDocuments } from "src/schemas/assets.schema";
import { Commitions, CommitionsDocument } from "src/schemas/commition.schema";
import { Users, UsersDocument } from "src/schemas/users.schema";
import { Model } from "mongoose";
import { Tip, TipDocument } from "src/schemas/tip.schema";

@Injectable()
export class TipPendukungRepository {

  constructor(
    @InjectModel(Users.name) private UsersModel: Model<UsersDocument>,
    @InjectModel(Commitions.name) private CommitionsModel: Model<CommitionsDocument>,
    @InjectModel(Assets.name) private AssetsModel: Model<AssetsDocuments>,
    @InjectModel(Tip.name) private TipModel: Model<TipDocument>,
  ) { }

  async create(payload: any) {
    let CreateTip = await this.TipModel.create(payload)
    let NewCreateTip = await CreateTip.save()
    if (NewCreateTip)
      return NewCreateTip;
  }

  async findAllWhere(payload): Promise<TipDocument[]> {
    return await this.TipModel.find(payload)
  }

  async findAll(): Promise<TipDocument[]> {
    return await this.TipModel.find()
  }

  async findOne(payload): Promise<TipDocument> {
    return await this.TipModel.findOne(payload)
  }



  async updateOne(exact: any, payload: any): Promise<TipDocument> {
    return await this.TipModel.findOneAndUpdate(exact, payload)
  }

  async remove(exact: any, payload: any): Promise<TipDocument> {
    return await this.TipModel.findOneAndRemove(exact, payload)
  }


}