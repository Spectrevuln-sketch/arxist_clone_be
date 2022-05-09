import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Commitions, CommitionsDocument } from "src/schemas/commition.schema";
import { Model } from "mongoose";
import { Users, UsersDocument } from '../../schemas/users.schema';
import { Assets, AssetsDocuments } from "src/schemas/assets.schema";

@Injectable()
export class MyAssetsRepo {

  constructor(
    @InjectModel(Users.name) private UsersModel: Model<UsersDocument>,
    @InjectModel(Commitions.name) private CommitionsModel: Model<CommitionsDocument>,
    @InjectModel(Assets.name) private AssetsModel: Model<AssetsDocuments>,
  ) { }

  async findAll(): Promise<Assets[]> {
    return await this.AssetsModel.find()
  }


  async findAllWhere(payload): Promise<Assets[]> {
    return await this.AssetsModel.find(payload)
  }

  async findOne(payload): Promise<Assets> {
    return await this.AssetsModel.findOne(payload)
  }

  async create(payload): Promise<Assets> {
    try {
      let NewAsset = new this.AssetsModel(payload)
      return await NewAsset.save()
    } catch (err) {
      console.log(err)
      return err
    }
  }

  async updateOne(exact: any, payload: any): Promise<Assets> {
    return await this.AssetsModel.findOneAndUpdate(exact, payload)
  }

  async remove(payload: any): Promise<Assets> {
    return await this.AssetsModel.findOneAndRemove(payload)
  }





}