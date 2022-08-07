import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join, dirname } from 'path';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { CustomValidationPipe } from './pipes/custom-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);
  SwaggerModule.setup('doc', app, document);
  app.useGlobalPipes(
    new CustomValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
