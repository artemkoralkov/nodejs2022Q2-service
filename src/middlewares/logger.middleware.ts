import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('Middleware');
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        `method: ${method} url: ${originalUrl} status code: ${statusCode} 
        query params: ${JSON.stringify(query)}
        body: ${JSON.stringify(body)}`,
      );
    });

    next();
  }
}
