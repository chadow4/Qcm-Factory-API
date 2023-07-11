import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Création d'un objet de configuration pour Swagger
  const config = new DocumentBuilder()
      .setTitle('QCM Factory API')
      .setDescription('API pour le projet QCM Factory')
      .setVersion('1.0')
      .build();
  // Génération de la documentation Swagger en utilisant la configuration
  const document = SwaggerModule.createDocument(app, config);

  // Configuration de l'endpoint pour afficher la documentation Swagger
  SwaggerModule.setup('api/docs', app, document);
  app.enableCors();



  await app.listen(3000);
}
bootstrap();
