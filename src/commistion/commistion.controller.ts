import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseStatusCode } from 'src/utils/ResponseStatusDesc.utils';
import { CommistionService } from './commistion.service';
import { CreateCommistionDto } from './dto/create-commistion.dto';
import { UpdateCommistionDto } from './dto/update-commistion.dto';

@ApiTags('Commistion')
@Controller({ path: 'commistion', version: '1' })
export class CommistionController {
  constructor(private readonly commistionService: CommistionService) { }

  @Post()
  async create(
    @Body() createCommistionDto: CreateCommistionDto,
    @Res() res,
    @Req() req
  ) {
    let token: string = req.cookies.marketplace_arxist;
    let commition = await this.commistionService.create(createCommistionDto, token);

    if (commition.responseCode === ResponseStatusCode.FAILED)
      return res.status(HttpStatus.BAD_REQUEST).send(commition)
    if (commition.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(HttpStatus.OK).send(commition)
  }

  @Get()
  async findAll(
    @Res() res,
    @Req() req
  ) {
    let token: string = req.cookies.marketplace_arxist;
    let FindCurrentCommition = await this.commistionService.findAll(token);
    if (FindCurrentCommition.responseCode === ResponseStatusCode.UNAUTHORIZED)
      return res.status(HttpStatus.UNAUTHORIZED).send(FindCurrentCommition)
    if (FindCurrentCommition.responseCode === ResponseStatusCode.FAILED)
      return res.status(HttpStatus.BAD_REQUEST).send(FindCurrentCommition)
    if (FindCurrentCommition.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(HttpStatus.OK).send(FindCurrentCommition)
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res,
    @Req() req
  ) {
    let token: string = req.cookies.marketplace_arxist;
    let Commition = await this.commistionService.findOne(token);
    if (Commition.responseCode === ResponseStatusCode.UNAUTHORIZED)
      return res.status(HttpStatus.UNAUTHORIZED).send(Commition)
    if (Commition.responseCode === ResponseStatusCode.FAILED)
      return res.status(HttpStatus.BAD_REQUEST).send(Commition)
    if (Commition.responseCode === ResponseStatusCode.SUCCESS)
      return res.status(HttpStatus.OK).send(Commition)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommistionDto: UpdateCommistionDto) {
  //   return this.commistionService.update(+id, updateCommistionDto);
  // }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Res() res,
    @Req() req
  ) {
    let token: string = req.cookies.marketplace_arxist;

    return this.commistionService.remove(id, token);
  }
}
