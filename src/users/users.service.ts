import { BadRequestException, HttpCode, HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { BadRequest } from 'src/utils/ExeptionFilter.filter';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate, ValidationError } from 'class-validator';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/schemas/users.schema';
import { FindUserDto } from './dto/find-user.dto';
import { ERROR_MSG, ResponseDesc, ResponseStatusCode } from 'src/utils/ResponseStatusDesc.utils';
import { UsersRepository } from './repository/users.repository';
import * as jwtmethod from '../utils/jwtAuth.utils';
import { Role } from 'src/schemas/enum/users.enum';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private userModel: Model<Users>,
    private readonly userRepository: UsersRepository
  ) { }

  async findByToken(token: string) {
    let payload: any = await jwtmethod.Verify(token)
    if (!payload)
      return {
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ERROR_MSG.UNAUTHORIZED,
        errorDesc: ERROR_MSG.NOT_FOUND
      }
    if (payload) {
      let CurrentLoginUser: any = await this.userRepository.findOne({ username: payload.username })
      if (CurrentLoginUser) {
        return {
          responseCode: ResponseStatusCode.SUCCESS,
          responseDesc: ResponseDesc.SUCCESS,
          data: CurrentLoginUser
        }
      }
      return {
        responseCode: ResponseStatusCode.FAILED,
        responseDesc: ResponseDesc.FAILED,
        errorDesc: ERROR_MSG.NOT_FOUND
      }
    }
    return {
      responseCode: ResponseStatusCode.FAILED,
      responseDesc: ResponseDesc.INVALID_BODY,
      errorDesc: ERROR_MSG.NOT_FOUND
    }
  }

  async findByRole(role) {
    try {
      const FindUserCurrentRole: any = await this.userRepository.findAllWhere({ role: role });
      if (FindUserCurrentRole.length > 0) {
        return {
          responseCode: ResponseStatusCode.SUCCESS,
          responseDesc: ResponseDesc.SUCCESS,
          data: FindUserCurrentRole
        }
      } else {
        return {
          responseCode: ResponseStatusCode.FAILED,
          responseDesc: ResponseDesc.FAILED,
          errorDesc: ERROR_MSG.NOT_FOUND
        }
      }

    } catch (err) {
      if (err)
        return {
          responseCode: ResponseStatusCode.FAILED,
          responseDesc: ResponseDesc.FAILED,
          errorDesc: err
        }
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const ExistUserEmail: any = await this.userRepository.findOne({
        email: createUserDto.email,
      });
      const ExistUserUserName: any = await this.userRepository.findOne({
        username: createUserDto.username,
      });
      if (ExistUserEmail) {
        return {
          responseCode: ResponseStatusCode.FAILED,
          responseDesc: ResponseDesc.FAILED,
          errorDesc: 'Email already exist'
        }
      }
      if (ExistUserUserName) {
        return {
          responseCode: ResponseStatusCode.FAILED,
          responseDesc: ResponseDesc.FAILED,
          errorDesc: 'Username already exist'
        }
      }
      let hashPassword = await bcrypt.hash(createUserDto.password, 10);
      let NewUser = await this.userRepository.create({
        ...createUserDto,
        password: hashPassword
      });
      if (NewUser) {
        return {
          responseCode: ResponseStatusCode.SUCCESS,
          responseDesc: ResponseDesc.SUCCESS,
        }
      }
      return {
        responseCode: ResponseStatusCode.FAILED,
        responseDesc: ResponseDesc.FAILED,
      }

    } catch (err) {
      return {
        responseCode: ResponseStatusCode.INVALID_BODY,
        responseDesc: ResponseDesc.BAD_REQ,
        errorDesc: err
      }
    }

  }

  async findAll(page: number, limit: number, search: string, token: string) {
    try {
      let payload: any = await jwtmethod.Verify(token);
      if (!payload)
        return {
          responseCode: ResponseStatusCode.UNAUTHORIZED,
          responseDesc: ResponseDesc.INVALID_TOKEN,
          errorDesc: ERROR_MSG.UNAUTHORIZED
        }
      if (payload.role === Role.ADMIN) {
        let sort = { createdAt: -1 };
        let FindUser = await this.userRepository.PaginateAll(sort, page, limit);
        return {
          responseCode: ResponseStatusCode.SUCCESS,
          responseDesc: ResponseDesc.SUCCESS,
          data: FindUser
        }

      }
    } catch (err) {
      console.log('Error', err)
      return new BadRequestException({
        responseCode: '99',
        responseDesc: 'INVALID BODY',
        errorDesc: err
      })
    }
  }

  async findOne(payload: any) {
    let FindUser = await this.userRepository.findOne(payload);
    if (FindUser)
      return {
        responseCode: ResponseStatusCode.SUCCESS,
        responseDesc: ResponseDesc.SUCCESS,
        data: FindUser
      }
    return {
      responseCode: ResponseStatusCode.FAILED,
      responseDesc: ResponseDesc.FAILED,
      errorDesc: ERROR_MSG.NOT_FOUND
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto, token: string) {
    if (token) {
      let payload: any = await jwtmethod.Verify(token);
      if (payload) {

        let UpdateUser = await this.userRepository.updateOne({ _id: id }, updateUserDto);
        if (UpdateUser)
          return {
            responseCode: ResponseStatusCode.SUCCESS,
            responseDesc: ResponseDesc.SUCCESS,
            data: UpdateUser
          }
        return {
          responseCode: ResponseStatusCode.FAILED,
          responseDesc: ResponseDesc.FAILED,
          errorDesc: UpdateUser
        }

      }
      return {
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ResponseDesc.INVALID_TOKEN,
        errorDesc: ERROR_MSG.UNAUTHORIZED
      }
    }
  }

  async remove(id: string, token: string) {
    let payload: any = await jwtmethod.Verify(token);
    if (payload) {
      let User = await this.userRepository.findOne({ username: payload.username });
      if (User.role === Role.ADMIN) {

        let RemoveUser = await this.userRepository.remove({ _id: id });
        if (RemoveUser)
          return {
            responseCode: ResponseStatusCode.SUCCESS,
            responseDesc: ResponseDesc.SUCCESS,
            data: RemoveUser
          }
        return {
          responseCode: ResponseStatusCode.FAILED,
          responseDesc: ResponseDesc.INVALID_PARAM,
          errorDesc: ERROR_MSG.NOT_FOUND
        }
      }
      return {
        responseCode: ResponseStatusCode.FAILED,
        responseDesc: ResponseDesc.FAILED,
        errorDesc: ERROR_MSG.NOT_FOUND
      }
    } else {
      return {
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ResponseDesc.INVALID_TOKEN,
        errorDesc: ERROR_MSG.UNAUTHORIZED
      }
    }
  }
}
