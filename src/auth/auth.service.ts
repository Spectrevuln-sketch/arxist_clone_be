import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ERROR_MSG, ResponseDesc, ResponseStatusCode } from 'src/utils/ResponseStatusDesc.utils';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as jwtmethod from 'src/utils/jwtAuth.utils';
import { UserStatus } from 'src/schemas/enum/users.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService
  ) { }



  /**
   * 
   * @param payload
   */
  async Register(payload: any) {
    try {
      let User: any = await this.userService.create(payload);
      return User;
    } catch (err) {
      if (err)
        return {
          responseCode: ResponseStatusCode.FAILED,
          responseDesc: ResponseDesc.FAILED,
          errorDesc: err
        }
    }
  }

  /**
   * @param payload
   * login user
   */
  async Login(payload: any) {
    try {
      if (payload.email) {
        let email: string = payload.email;
        let User: any = await this.userService.findOne({
          email
        });
        if (!User)
          return {
            responseCode: ResponseStatusCode.FAILED,
            responseDesc: ResponseDesc.FAILED,
            errorDesc: ERROR_MSG.NOT_FOUND
          }
        if (User.data.status !== UserStatus.ACTIVE)
          return {
            responseCode: ResponseStatusCode.FAILED,
            responseDesc: ResponseDesc.FAILED,
            errorDesc: ERROR_MSG.BANNED
          }
        if (User.responseCode === ResponseStatusCode.SUCCESS) {
          let match: any = await bcrypt.compare(payload.password, User.data.password);
          if (match) {
            let payload_token = {
              id: User.data._id,
              name: User.data.name,
              username: User.data.username,
              role: User.data.role,
            }
            let token: any = await jwtmethod.Sign(payload_token);
            if (token)
              return {
                responseCode: ResponseStatusCode.SUCCESS,
                responseDesc: ResponseDesc.SUCCESS,
                token: token
              }
          }
          return {
            responseCode: ResponseStatusCode.FAILED,
            responseDesc: ResponseDesc.FAILED,
            errorDesc: 'Wrong password'
          }
        } else {

          return {
            responseCode: ResponseStatusCode.FAILED,
            responseDesc: ResponseDesc.FAILED,
            errorDesc: ERROR_MSG.NOT_FOUND
          }
        }
      }

      if (payload.username) {

        let UserByUsername: any = await this.userService.findOne({
          username: payload.username
        });
        if (!UserByUsername)
          return {
            responseCode: ResponseStatusCode.FAILED,
            responseDesc: ResponseDesc.FAILED,
            errorDesc: ERROR_MSG.NOT_FOUND
          }
        if (UserByUsername.data.status !== UserStatus.ACTIVE)
          return {
            responseCode: ResponseStatusCode.FAILED,
            responseDesc: ResponseDesc.FAILED,
            errorDesc: ERROR_MSG.BANNED
          }
        if (UserByUsername) {
          let match: any = await bcrypt.compare(payload.password, UserByUsername.data.password);
          if (match) {
            let payload_token = {
              name: UserByUsername.data.name,
              username: UserByUsername.data.username,
              role: UserByUsername.data.role,
            }
            let token: any = jwtmethod.Sign(payload_token);
            if (token) {

              return {
                responseCode: ResponseStatusCode.SUCCESS,
                responseDesc: ResponseDesc.SUCCESS,
                token: token
              }
            } else {
              return {
                responseCode: ResponseStatusCode.FAILED,
                responseDesc: ResponseDesc.FAILED,
              }
            }
          } else {
            return {
              responseCode: ResponseStatusCode.FAILED,
              responseDesc: ResponseDesc.FAILED,
              errorDesc: 'Wrong password'
            }
          }
        }
        return {
          responseCode: ResponseStatusCode.FAILED,
          responseDesc: ResponseDesc.FAILED,
          errorDesc: 'User not found'
        }
      }
      return {
        responseCode: ResponseStatusCode.INVALID_BODY,
        responseDesc: ResponseDesc.BAD_REQ,
      }
    } catch (err) {
      console.log(err)
      return {
        responseCode: ResponseStatusCode.FAILED,
        responseDesc: ResponseDesc.FAILED,
        errorDesc: 'User not found'
      }
    }
  }


  /**
   *  islogged in user
   * @param token
   */

  async isLoggedIn(token: string) {
    try {
      let payload: any = await jwtmethod.Verify(token);
      if (payload) {
        return {
          responseCode: ResponseStatusCode.SUCCESS,
          responseDesc: ResponseDesc.SUCCESS,
          data: payload
        }
      }
      return {
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ResponseDesc.BAD_REQ,
        errorDesc: ERROR_MSG.UNAUTHORIZED
      }
    } catch (err) {
      return {
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ResponseDesc.FAILED,
        errorDesc: err
      }
    }
  }


  /**
   * @param token
   */
  async Logout(token: string) {
    if (token) {
      let payload: any = await jwtmethod.Verify(token);
      if (payload) {
        return {
          responseCode: ResponseStatusCode.SUCCESS,
          responseDesc: ResponseDesc.SUCCESS,
          data: payload
        }
      } else {

        return {
          responseCode: ResponseStatusCode.UNAUTHORIZED,
          responseDesc: ResponseDesc.BAD_REQ,
          errorDesc: ERROR_MSG.UNAUTHORIZED
        }
      }

    }
    return {
      responseCode: ResponseStatusCode.UNAUTHORIZED,
      responseDesc: ResponseDesc.BAD_REQ,
      errorDesc: ERROR_MSG.UNAUTHORIZED
    }
  }

}
