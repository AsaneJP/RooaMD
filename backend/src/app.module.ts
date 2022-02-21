import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FoldersModule } from './folders/folders.module';
@Module({
  imports: [
    ItemsModule,
    TypeOrmModule.forRoot(),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FoldersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
