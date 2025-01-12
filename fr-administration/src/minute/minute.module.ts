import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinuteService } from './minute.service';
import { MinuteController } from './minute.controller';
import { Minute } from './minute.entity';
import { UsersModule } from '../users/users.module';
import { AssociationsModule } from '../associations/associations.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Minute]),
    forwardRef(() => AssociationsModule),
  ],
  controllers: [MinuteController],
  providers: [MinuteService],
  exports: [MinuteService],
})
export class MinuteModule {}
