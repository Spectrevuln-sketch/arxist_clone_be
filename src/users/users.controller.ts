import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseFilters, BadRequestException, Catch, ArgumentsHost, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BadRequest } from 'src/utils/ExeptionFilter.filter';
import { FindUserDto } from './dto/find-user.dto';
import { ERROR_MSG, ResponseStatusCode } from 'src/utils/ResponseStatusDesc.utils';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    let validatiorError: object;
  }

  @Get()
  async AllUsers(
    @Res() res,
    @Req() req,
    @Param('page') page: number, limit: number,
    @Param('search') search: string
  ) {
    let token: string = req.cookies.marketplace_arxist;
    if (!token)
      return res.status(HttpStatus.UNAUTHORIZED).send({
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        errorDesc: ERROR_MSG.UNAUTHORIZED
      })
    let users: any = await this.usersService.findAll(page, limit, search, token);
    if (users.responseCode === ResponseStatusCode.FAILED)
      return res.status(HttpStatus.BAD_REQUEST).send(users)
    if (users.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(HttpStatus.OK).send(users)

  }



  @Get('/get-current-user')
  async findMe(
    @Res() res,
    @Req() req
  ) {
    let token: string = req.cookies.marketplace_arxist;
    if (!token)
      return res.status(HttpStatus.UNAUTHORIZED).send({
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ERROR_MSG.UNAUTHORIZED,
      })
    let CurrentUser: any = await this.usersService.findByToken(token)
    if (CurrentUser.responseCode === ResponseStatusCode.FAILED)
      return res.status(HttpStatus.BAD_REQUEST).send(CurrentUser)
    if (CurrentUser.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(HttpStatus.OK).send(CurrentUser)
  }


  @Get(':role')
  async findAll(
    @Param('role') role: string,
    @Res() res
  ) {
    try {
      let FindAllBy = await this.usersService.findByRole(role);
      if (FindAllBy.responseCode === ResponseStatusCode.SUCCESS) {
        return res.status(HttpStatus.OK).send(FindAllBy)
      }
      if (FindAllBy.responseCode === ResponseStatusCode.FAILED)
        return res.status(HttpStatus.BAD_REQUEST).send(FindAllBy)
    } catch (err) {
      console.log(err)
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res
  ) {

    let userFind: any = await this.usersService.findOne(id);
    if (userFind.responseCode === ResponseStatusCode.FAILED)
      return res.status(HttpStatus.OK).send(userFind)
    if (userFind.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(HttpStatus.OK).send(userFind)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res,
    @Req() req
  ) {
    let token: string = req.cookies.marketplace_arxist;
    if (token) {

      let UpdatedUser = await this.usersService.update(id, updateUserDto, token);
      if (UpdatedUser.responseCode === ResponseStatusCode.UNAUTHORIZED)
        return res.status(HttpStatus.UNAUTHORIZED).send(UpdatedUser)
      if (UpdatedUser.responseCode === ResponseStatusCode.FAILED)
        return res.status(HttpStatus.BAD_REQUEST).send(UpdatedUser)
      if (UpdatedUser.responseCode === ResponseStatusCode.SUCCESS)
        return res.status(HttpStatus.OK).send(UpdatedUser)

    }
    return res.status(HttpStatus.UNAUTHORIZED).send({
      responseCode: ResponseStatusCode.UNAUTHORIZED,
      responseDesc: ERROR_MSG.UNAUTHORIZED,
    })
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res,
    @Req() req
  ) {
    let token = req.cookies.marketplace_arxist;
    if (token) {
      let UserRemove = await this.usersService.remove(id, token);
      if (UserRemove.responseCode === ResponseStatusCode.UNAUTHORIZED)
        return res.status(HttpStatus.UNAUTHORIZED).send(UserRemove)
      if (UserRemove.responseCode === ResponseStatusCode.FAILED)
        return res.status(HttpStatus.BAD_REQUEST).send(UserRemove)
      if (UserRemove.responseCode === ResponseStatusCode.SUCCESS)
        return res.status(HttpStatus.OK).send(UserRemove)
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).send({
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ERROR_MSG.UNAUTHORIZED,
      })
    }
  }






}
