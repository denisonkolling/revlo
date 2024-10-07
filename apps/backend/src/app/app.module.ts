import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from '../config/mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    UserModule,
    ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
