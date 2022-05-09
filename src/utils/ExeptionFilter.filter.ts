import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { isValidationOptions } from 'class-validator';
import { Request, Response } from 'express';



@Catch(BadRequestException)
export class BadRequest implements ExceptionFilter {
  constructor(public responseCode: string, public errorDesc: any) { }
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.log(response.json)
    response
      .status(status)
      .json({
        responseCode: status,
        responseDesc: this.responseCode,
        errorDesc: this.errorDesc
      });
  }
}