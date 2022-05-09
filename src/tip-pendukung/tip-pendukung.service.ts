import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/repository/users.repository';
import { ResponseDesc, ResponseStatusCode } from 'src/utils/ResponseStatusDesc.utils';
import { CreateTipPendukungDto } from './dto/create-tip-pendukung.dto';
import { UpdateTipPendukungDto } from './dto/update-tip-pendukung.dto';
import { TipPendukungRepository } from './repository/tip-pendukung.repository';

@Injectable()
export class TipPendukungService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly tipRepo: TipPendukungRepository
  ) { }


  async create(createTipPendukungDto: CreateTipPendukungDto) {
    let NewTip: any = await this.tipRepo.create(createTipPendukungDto)
    if (NewTip)
      return {
        responseCode: ResponseStatusCode.SUCCESS,
        responseDesc: ResponseDesc.SUCCESS,
      }
    return {
      responseCode: ResponseStatusCode.FAILED,
      responseDesc: ResponseDesc.FAILED,
    }

  }

  async findAll() {
    let AllUser = await this.tipRepo.findAll()
    if (AllUser)
      return {
        responseCode: ResponseStatusCode.SUCCESS,
        responseDesc: ResponseDesc.SUCCESS,
      }

    return {
      responseCode: ResponseStatusCode.FAILED,
      responseDesc: ResponseDesc.FAILED,
    }

  }

  async findAllWhereUser(user_id: string) {
    let AllUser = await this.tipRepo.findAllWhere({ user_id })
    if (AllUser)
      return {
        responseCode: ResponseStatusCode.SUCCESS,
        responseDesc: ResponseDesc.SUCCESS,
      }

    return {
      responseCode: ResponseStatusCode.FAILED,
      responseDesc: ResponseDesc.FAILED,
    }

  }

  async findOne(id: string) {
    let FindOne = await this.tipRepo.findOne({ _id: id })
    if (FindOne)
      return {
        responseCode: ResponseStatusCode.SUCCESS,
        responseDesc: ResponseDesc.SUCCESS,
      }

    return {
      responseCode: ResponseStatusCode.FAILED,
      responseDesc: ResponseDesc.FAILED,
    }
  }

  async update(id: string, updateTipPendukungDto: UpdateTipPendukungDto) {
    return `This action updates a #${id} tipPendukung`;
  }

  async remove(id: string) {
    return `This action removes a #${id} tipPendukung`;
  }
}
