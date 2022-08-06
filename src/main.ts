import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join, dirname } from 'path';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { CustomValidationPipe } from './pipes/custom-validation.pipe';
import { MyLogger } from './modules/logger/logger.service';
import { writeLogsToFile } from './modules/logger/wrtiteLogsToFile';
import { HttpExceptionFilter } from './filters/HttpException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);
  SwaggerModule.setup('doc', app, document);
  app.useLogger(app.get(MyLogger));
  app.useGlobalPipes(
    new CustomValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(process.env.PORT || 4000);
  app.useGlobalFilters(new HttpExceptionFilter(app.get(MyLogger)));
}

process.on('unhandledRejection', (reason, promise) => {
  writeLogsToFile(
    `Unhandled Rejection at:', ${promise}, 'reason:', ${reason}`,
    '',
  );
});

process.on('uncaughtException', (err, origin) => {
  writeLogsToFile(
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`,
    '',
  );
});
bootstrap();
