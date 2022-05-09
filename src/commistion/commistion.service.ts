import { Injectable } from '@nestjs/common';
import { ERROR_MSG, ResponseDesc, ResponseStatusCode } from 'src/utils/ResponseStatusDesc.utils';
import { CreateCommistionDto } from './dto/create-commistion.dto';
import { UpdateCommistionDto } from './dto/update-commistion.dto';
import { CommitionsRepository } from './repository/commition.repository';
import * as jwtmethod from '../utils/jwtAuth.utils';
import { UsersRepository } from 'src/users/repository/users.repository';

@Injectable()
export class CommistionService {
  constructor(
    private readonly commitionRepo: CommitionsRepository,
    private readonly userRepo: UsersRepository
  ) { }


  async create(createCommistionDto: CreateCommistionDto, token: string) {
    if (!token)
      return {
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ResponseDesc.FAILED,
        errorDesc: ERROR_MSG.UNAUTHORIZED
      }
    let payload: any = await jwtmethod.Verify(token);
    if (!payload)
      return {
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ResponseDesc.FAILED,
        errorDesc: ERROR_MSG.UNAUTHORIZED
      }
    let NewCommition = await this.commitionRepo.create(createCommistionDto);
    if (NewCommition)
      return {
        responseCode: ResponseStatusCode.SUCCESS,
        responseDesc: ResponseDesc.SUCCESS,
        data: NewCommition
      }
    return {
      responseCode: ResponseStatusCode.FAILED,
      responseDesc: ResponseDesc.FAILED,
    }
  }

  async findAll(token: string) {
    if (!token)
      return {
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ResponseDesc.FAILED,
        errorDesc: ERROR_MSG.UNAUTHORIZED
      }
    let payload: any = await jwtmethod.Verify(token);
    if (!payload)
      return {
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ResponseDesc.FAILED,
        errorDesc: ERROR_MSG.UNAUTHORIZED
      }
    let commitions = await this.commitionRepo.findAll();
    if (commitions)
      return {
        responseCode: ResponseStatusCode.SUCCESS,
        responseDesc: ResponseDesc.SUCCESS,
        data: commitions
      }
    return {
      responseCode: ResponseStatusCode.FAILED,
      responseDesc: ResponseDesc.FAILED,
    }
  }

  async findOne(token: string) {
    if (!token)
      return {
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ResponseDesc.FAILED,
        errorDesc: ERROR_MSG.UNAUTHORIZED
      }
    let payload: any = await jwtmethod.Verify(token);
    if (!payload)
      return {
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ResponseDesc.FAILED,
        errorDesc: ERROR_MSG.UNAUTHORIZED
      }
    let CurrentUser: any = await this.userRepo.findOne({ username: payload.username });
    if (!CurrentUser)
      return {
        responseCode: ResponseStatusCode.INVALID_BODY,
        responseDesc: ResponseDesc.NOT_FOUND,
        errorDesc: ERROR_MSG.NOT_FOUND
      }
    let commition = await this.commitionRepo.findOne({ user_id: CurrentUser._id });

    if (commition)
      return {
        responseCode: ResponseStatusCode.SUCCESS,
        responseDesc: ResponseDesc.SUCCESS,
        data: commition
      }

    return {
      responseCode: ResponseStatusCode.FAILED,
      responseDesc: ResponseDesc.FAILED,
    }

  }


  async remove(id: string, token: string) {
    if (!token)
      if (!token)
        return {
          responseCode: ResponseStatusCode.UNAUTHORIZED,
          responseDesc: ResponseDesc.FAILED,
          errorDesc: ERROR_MSG.UNAUTHORIZED
        }
    let payload: any = await jwtmethod.Verify(token);
    if (!payload)
      return {
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ResponseDesc.FAILED,
        errorDesc: ERROR_MSG.UNAUTHORIZED
      }
    let CurrentUser: any = await this.userRepo.findOne({ username: payload.username });
    if (!CurrentUser)
      return {
        responseCode: ResponseStatusCode.INVALID_BODY,
        responseDesc: ResponseDesc.NOT_FOUND,
        errorDesc: ERROR_MSG.NOT_FOUND
      }
    let RemoveCommition = await this.commitionRepo.remove(id);
    if (RemoveCommition)
      return {
        responseCode: ResponseStatusCode.SUCCESS,
        responseDesc: ResponseDesc.SUCCESS,
        data: RemoveCommition
      }
    return {
      responseCode: ResponseStatusCode.FAILED,
      responseDesc: ResponseDesc.FAILED,
      data: RemoveCommition
    }
  }
}
