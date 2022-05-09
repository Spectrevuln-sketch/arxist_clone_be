import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus, Put } from '@nestjs/common';
import { TipPendukungService } from './tip-pendukung.service';
import { CreateTipPendukungDto } from './dto/create-tip-pendukung.dto';
import { UpdateTipPendukungDto } from './dto/update-tip-pendukung.dto';
import { ApiTags } from '@nestjs/swagger';
import * as jwtmethod from '../utils/jwtAuth.utils';
import { ERROR_MSG, ResponseDesc, ResponseStatusCode } from 'src/utils/ResponseStatusDesc.utils';

@ApiTags('Pendukung')
@Controller({ path: 'tip-pendukung', version: '1' })
export class TipPendukungController {
  constructor(
    private readonly tipPendukungService: TipPendukungService
  ) { }

  @Post()
  async create(
    @Body() createTipPendukungDto: CreateTipPendukungDto,
    @Res() res,
    @Req() req
  ) {
    let token: string = req.cookies.marketplace_arxist;
    if (!token) {
      res.status(401).send({
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ERROR_MSG.UNAUTHORIZED,
      })
    }
    let verify: any = await jwtmethod.Verify(token);
    if (!verify) {
      return res.status(401).send({
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ERROR_MSG.UNAUTHORIZED,
      })
    }
    let NewUser = await this.tipPendukungService.create(createTipPendukungDto);
    if (NewUser.responseCode === ResponseStatusCode.FAILED)
      return res.status(400).send(NewUser)
    if (NewUser.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(200).send(NewUser)
  }

  @Get()
  async findAll(
    @Res() res,
    @Req() req
  ) {
    let MyTip: any = await this.tipPendukungService.findAll();
    if (MyTip.responseCode === ResponseStatusCode.FAILED)
      return res.status(HttpStatus.BAD_REQUEST).send(MyTip)
    if (MyTip.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(HttpStatus.OK).send(MyTip)

  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res,
    @Req() req
  ) {
    let FindMyUser: any = await this.tipPendukungService.findOne(id);
    if (FindMyUser.responseCode === ResponseStatusCode.FAILED)
      return res.status(HttpStatus.BAD_REQUEST).send(FindMyUser)
    if (FindMyUser.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(HttpStatus.OK).send(FindMyUser)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTipPendukungDto: UpdateTipPendukungDto,
    @Res() res,
    @Req() req
  ) {
    let token: string = req.cookies.marketplace_arxist;
    if (!token)
      return res.status(HttpStatus.UNAUTHORIZED).send({
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ERROR_MSG.UNAUTHORIZED,
        errorDesc: ERROR_MSG.UNAUTHORIZED
      })
    let UpdateUser: any = await this.tipPendukungService.update(id, updateTipPendukungDto);
    if (UpdateUser.responseCode === ResponseStatusCode.FAILED)
      return res.status(HttpStatus.BAD_REQUEST).send(UpdateUser)
    if (UpdateUser.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(HttpStatus.OK).send(UpdateUser)
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res,
    @Req() req
  ) {
    let token: string = req.cookies.marketplace_arxist;
    if (!token)
      return res.status(HttpStatus.UNAUTHORIZED).send({
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ERROR_MSG.UNAUTHORIZED,
        errorDesc: ERROR_MSG.UNAUTHORIZED
      })
    let RemoveTip: any = await this.tipPendukungService.remove(id);
    if (RemoveTip.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(HttpStatus.OK).send(RemoveTip)
    if (RemoveTip.responseCode === ResponseStatusCode.FAILED)
      return res.status(HttpStatus.BAD_REQUEST).send(RemoveTip)
  }
}
