import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ERROR_MSG, ResponseDesc, ResponseStatusCode } from 'src/utils/ResponseStatusDesc.utils';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';


@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  async RegisterUser(
    @Body() createAuthDto: CreateAuthDto,
    @Res() res,
  ) {
    let NewUserCreated: any = await this.authService.Register(createAuthDto);
    if (NewUserCreated.responseCode === ResponseStatusCode.FAILED)
      return res.status(HttpStatus.BAD_REQUEST).json(NewUserCreated);
    if (NewUserCreated.responseCode === ResponseStatusCode.INVALID_BODY) {
      console.log(NewUserCreated.errorDesc)
      return res.status(HttpStatus.BAD_REQUEST).json(NewUserCreated);
    }
    if (NewUserCreated.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(HttpStatus.OK).json(NewUserCreated);
  }

  @Post('login')
  async LoginUser(
    @Body() loginUserDto: LoginAuthDto,
    @Res() res,
  ) {

    console.log(loginUserDto)
    let NewUserCreated: any = await this.authService.Login(loginUserDto);
    if (NewUserCreated.responseCode === ResponseStatusCode.FAILED)
      return res.status(HttpStatus.BAD_REQUEST).json(NewUserCreated);
    if (NewUserCreated.responseCode === ResponseStatusCode.INVALID_BODY) {
      console.log(NewUserCreated.errorDesc)
      return res.status(HttpStatus.BAD_REQUEST).json(NewUserCreated);
    }
    if (NewUserCreated.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(HttpStatus.OK).cookie('marketplace_arxist', NewUserCreated.token).json(NewUserCreated);
  }


  @Get('isloggedin')
  async isLoggedIn(
    @Res() res,
    @Req() req,
  ) {
    let token: string = req.cookies.marketplace_arxist;
    if (token) {
      let isLoggedIn: any = await this.authService.isLoggedIn(token);
      if (isLoggedIn.responseCode === ResponseStatusCode.UNAUTHORIZED)
        return res.status(HttpStatus.BAD_REQUEST).json(isLoggedIn);
      if (isLoggedIn.responseCode === ResponseStatusCode.SUCCESS)
        return res.status(HttpStatus.OK).json({
          responseCode: ResponseStatusCode.SUCCESS,
          responseDesc: ResponseDesc.SUCCESS,
          isLoggedIn: true
        });
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ERROR_MSG.UNAUTHORIZED,
        isLoggedIn: false
      });
    }
  }

  @Get('logout')
  async logout(
    @Res() res,
    @Req() req,
  ) {
    let token: string = req.cookies.marketplace_arxist;
    let SignOut: any = await this.authService.Logout(token);
    if (SignOut.responseCode === ResponseStatusCode.UNAUTHORIZED)
      return res.status(HttpStatus.UNAUTHORIZED).json(SignOut);
    if (SignOut.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(HttpStatus.OK).json(SignOut);

  }
}
