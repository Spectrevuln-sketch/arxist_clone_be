import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users, UsersDocument } from '../../schemas/users.schema';
import { CreateUserDto } from '../dto/create-user.dto'

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(Users.name) private UsersModel: Model<UsersDocument>) { }

  async create(payload): Promise<Users> {
    try {
      let NewUser = new this.UsersModel(payload)
      return await NewUser.save()
    } catch (err) {
      console.log(err)
      return err
    }
  }

  async findAll(): Promise<Users[]> {
    return await this.UsersModel.find()
  }

  async PaginateAll(sort, page, limit): Promise<Users[]> {
    return await this.UsersModel.find().sort(sort).skip((page - 1) * limit).limit(limit)
  }


  async findAllWhere(payload): Promise<Users[]> {
    return await this.UsersModel.find(payload)
  }


  async findOne(payload): Promise<Users> {
    return await this.UsersModel.findOne(payload)
  }

  async updateOne(exact: any, payload: any): Promise<Users> {
    return await this.UsersModel.findOneAndUpdate(exact, payload).select('-password')
  }


  async remove(payload: any): Promise<Users> {
    return await this.UsersModel.findOneAndRemove(payload)
  }

}