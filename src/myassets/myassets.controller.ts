import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, Put } from '@nestjs/common';
import { MyassetsService } from './myassets.service';
import { CreateMyassetDto } from './dto/create-myasset.dto';
import { UpdateMyassetDto } from './dto/update-myasset.dto';
import { ERROR_MSG, ResponseStatusCode } from 'src/utils/ResponseStatusDesc.utils';
import * as jwtmethod from '../utils/jwtAuth.utils';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Myassets')
@Controller({ path: 'myassets', version: '1' })
export class MyassetsController {
  constructor(private readonly myassetsService: MyassetsService) { }

  @Post()
  async create(
    @Body() createMyassetDto: CreateMyassetDto,
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
    let CreateNewAssets: any = await this.myassetsService.create(createMyassetDto);
    if (CreateNewAssets.responseCode === ResponseStatusCode.FAILED)
      return res.status(400).send(CreateNewAssets);
    if (CreateNewAssets.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(200).send(CreateNewAssets);
  }

  @Get()
  async findAll(
    @Res() res
  ) {
    let UserAssets = await this.myassetsService.findAll();
    if (UserAssets.responseCode === ResponseStatusCode.FAILED)
      return res.status(400).send(UserAssets)
    if (UserAssets.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(200).send(UserAssets)
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res
  ) {
    let CurrentAssets = await this.myassetsService.findOne(id);
    if (CurrentAssets.responseCode === ResponseStatusCode.FAILED)
      return res.status(400).send(CurrentAssets)
    if (CurrentAssets.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(200).send(CurrentAssets)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMyassetDto: UpdateMyassetDto,
    @Res() res,
    @Req() req
  ) {
    let token: string = req.cookies.marketplace_arxist;
    if (!token)
      return res.status(401).send({})
    let UpdateUser = await this.myassetsService.update(id, updateMyassetDto);
    if (UpdateUser.responseCode === ResponseStatusCode.FAILED)
      return res.status(400).send(UpdateUser)
    if (UpdateUser.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(200).send(UpdateUser)
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res,
    @Req() req
  ) {
    let token: string = req.cookies.marketplace_arxist;
    if (!token)
      return res.status(401).send({
        responseCode: ResponseStatusCode.UNAUTHORIZED,
        responseDesc: ERROR_MSG.UNAUTHORIZED,
      })
    let RemoveAssets = await this.myassetsService.remove(id, token);
    if (RemoveAssets.responseCode === ResponseStatusCode.FAILED)
      return res.status(400).send(RemoveAssets)
    if (RemoveAssets.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(200).send(RemoveAssets)
  }
}
