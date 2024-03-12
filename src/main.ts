import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { parse } from 'yamljs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 4000;

  const yaml_path = resolve(__dirname, '../../doc/api.yaml');
  const configContent = await readFile(yaml_path, 'utf-8');
  const config = parse(configContent);
  SwaggerModule.setup('doc', app, config);

  await app.listen(port);
}
bootstrap();
