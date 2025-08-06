import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  // HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(InternalServerErrorException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const res: any = exception.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      isSuccess: 'false',
      timestamp: new Date().toISOString(),
      path: request.url,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      error: res,
    });
  }
}
