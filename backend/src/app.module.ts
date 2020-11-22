import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UuidService } from './uuid.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UuidService]
})
export class AppModule {}
