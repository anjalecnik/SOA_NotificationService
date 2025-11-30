import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Notification Service')
    .setDescription(
      `
**Notifications vs Reminders – rozdifferencia**

• **Reminder** (opomnik): dogodek, ki je načrtovan v prihodnosti.  
  Sistem ga sproži ob času \`remindAt\`.  
  Ko opomnik zapade, se iz njega pogosto ustvari dejansko obvestilo.

• **Notification** (obvestilo): informacija, ki jo pošljemo uporabniku, ko se nekaj zgodi.  
  To je realno dostavljeno sporočilo (npr. email, push, UI).

➡ Reminder je *planirani dogodek v prihodnosti*  
➡ Notification je *dejanski poslani dogodek*
`,
    )
    .setVersion('1.0')
    // .addBearerAuth()  // odkomentiraj, ko uporabljaš JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
