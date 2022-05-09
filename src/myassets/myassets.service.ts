import { Injectable } from '@nestjs/common';
import { ERROR_MSG, ResponseDesc, ResponseStatusCode } from 'src/utils/ResponseStatusDesc.utils';
import { CreateMyassetDto } from './dto/create-myasset.dto';
import { UpdateMyassetDto } from './dto/update-myasset.dto';
import { MyAssetsRepo } from './repository/myassets.repository';
import * as jwtmethod from '../utils/jwtAuth.utils';
import { UsersRepository } from 'src/users/repository/users.repository';

@Injectable()
export class MyassetsService {
  constructor(
    private readonly myAssetsRepo: MyAssetsRepo,
    private readonly userRepo: UsersRepository
  ) { }


  async create(createMyassetDto: CreateMyassetDto) {
    let NewAssets = await this.myAssetsRepo.create(createMyassetDto);
    if (NewAssets) {
      return {
        responseCode: ResponseStatusCode.SUCCESS,
        responseDesc: ResponseDesc.SUCCESS,
      }
    }
    return {
      responseCode: ResponseStatusCode.FAILED,
      responseDesc: ResponseDesc.FAILED,
    }
  }

  async findAll() {
    let myassets: any = await this.myAssetsRepo.findAll();
    if (myassets) {
      return {
        responseCode: ResponseStatusCode.SUCCESS,
        responseDesc: ResponseDesc.SUCCESS,
        data: myassets
      }
    }
    return {
      responseCode: ResponseStatusCode.FAILED,
      responseDesc: ResponseDesc.FAILED,
    }
  }

  async findOne(id: string) {
    let CurrentAssets: any = await this.myAssetsRepo.findOne({
      _id: id
    })
    if (CurrentAssets)
      return {
        responseCode: ResponseStatusCode.SUCCESS,
        responseDesc: ResponseDesc.SUCCESS,
        data: CurrentAssets
      }
    return {
      responseCode: ResponseStatusCode.FAILED,
      responseDesc: ResponseDesc.FAILED,
    }
  }

  async update(id: string, updateMyassetDto: UpdateMyassetDto) {
    let UpdateAssets: any = await this.myAssetsRepo.updateOne({ _id: id }, {
      ...updateMyassetDto
    })
    if (UpdateAssets)
      return {
        responseCode: ResponseStatusCode.SUCCESS,
        responseDesc: ResponseDesc.SUCCESS,
        data: UpdateAssets
      }
    return {
      responseCode: ResponseStatusCode.FAILED,
      responseDesc: ResponseDesc.FAILED,
    }
  }

  async remove(id: string, token: string) {
    let payload: any = await jwtmethod.Verify(token);
    if (!payload)
      return {
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ResponseDesc.INVALID_TOKEN,
      }
    let User = await this.userRepo.findOne({ username: payload.username });
    if (!User)
      return {
        responseCode: ResponseStatusCode.FAILED,
        responseDesc: ResponseDesc.FAILED,
        errorDesc: ERROR_MSG.NOT_FOUND
      }
    let RemoveAssets: any = await this.myAssetsRepo.remove({ _id: id });
    if (RemoveAssets)
      return {
        responseCode: ResponseStatusCode.SUCCESS,
        responseDesc: ResponseDesc.SUCCESS,
      }
    return {
      responseCode: ResponseStatusCode.FAILED,
      responseDesc: ResponseDesc.FAILED,
    }
  }
}

