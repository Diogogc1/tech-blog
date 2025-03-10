import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { NotFoundExceptionFilter } from './filters/not-found.exception-filter'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  app.enableCors()
  app.useGlobalFilters(new NotFoundExceptionFilter())

  const config = new DocumentBuilder()
    .setTitle('API Tech Blog')
    .setDescription('Documentação da API Tech Blog')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3001)
}

bootstrap().catch((err) => {
  console.error('Error no bootstrap:', err)
})
