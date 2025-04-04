import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/user.entity';
import { JwtModule } from '@nestjs/jwt'; 
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
   
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Iradukunda123@!',
      database: 'ai_budget_app',
      entities: [User],
      synchronize: true, 
  }),
    ConfigModule.forRoot({
    isGlobal: true,
    }), 
    JwtModule,
  AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
