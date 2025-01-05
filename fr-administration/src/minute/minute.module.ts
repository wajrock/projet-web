import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinuteService } from './minute.service';
import { MinuteController } from './minute.controller';
import { Minute } from './minute.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Minute])],
  controllers: [MinuteController],
  providers: [MinuteService],
  exports: [MinuteService],
})
export class MinuteModule {}
