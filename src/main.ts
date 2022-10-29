import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  try {
    await app.listen(parseInt(process.env.PORT) || 3000);
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } catch (error) {
    console.log(error);
    console.log('Error trying listen to port');
  }
}
bootstrap();
