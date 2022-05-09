import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Commitions, CommitionsDocument } from 'src/schemas/commition.schema';
import { Users, UsersDocument } from '../../schemas/users.schema';

@Injectable()
export class CommitionsRepository {

  constructor(
    @InjectModel(Users.name) private UsersModel: Model<UsersDocument>,
    @InjectModel(Commitions.name) private CommitionsModel: Model<CommitionsDocument>,
  ) { }

  async create(payload): Promise<Commitions> {
    try {
      let NewCommition = new this.CommitionsModel(payload)
      return await NewCommition.save()
    } catch (err) {
      console.log(err)
      return err
    }
  }


  async findAll(): Promise<Commitions[]> {
    return await this.CommitionsModel.find().populate('user_id')
  }

  async PaginateAll(sort, page, limit): Promise<Commitions[]> {
    return await this.CommitionsModel.find().sort(sort).skip((page - 1) * limit).limit(limit).populate('user_id')
  }

  async findAllWhere(payload): Promise<Commitions[]> {
    return await this.CommitionsModel.find(payload).populate('user_id')
  }

  async findOne(payload): Promise<Commitions> {
    return await this.CommitionsModel.findOne(payload)
  }

  async updateOne(exact: any, payload: any): Promise<Commitions> {
    return await this.CommitionsModel.findOneAndUpdate(exact, payload)

  }

  async remove(payload: any): Promise<Commitions> {
    return await this.CommitionsModel.findOneAndRemove(payload)
  }


}