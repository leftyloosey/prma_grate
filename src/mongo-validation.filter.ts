import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { Error } from 'mongoose';
import ValidationError = Error;

@Catch(ValidationError)
export class ValidationErrorFilter implements RpcExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      response = ctx.getResponse();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return response.status(400).json({
      statusCode: 400,
      createdBy: 'ValidationErrorFilter',
      errors: exception,
    });
  }
}
