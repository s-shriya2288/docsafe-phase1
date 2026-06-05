import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    
    const status = 
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal server error';
    let errors: string[] = [];

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      message = exception.message;
      
      if (typeof res === 'object' && res !== null) {
        const resMessage = (res as any).message;
        if (Array.isArray(resMessage)) {
          errors = resMessage;
          message = 'Validation failed';
        } else if (typeof resMessage === 'string') {
          errors = [resMessage];
          message = resMessage;
        } else {
          errors = [JSON.stringify(res)];
        }
      } else if (typeof res === 'string') {
        errors = [res];
        message = res;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      errors = [exception.message];
    } else {
      errors = [String(exception)];
    }

    response
      .status(status)
      .send({
        success: false,
        message,
        errors,
      });
  }
}
