import { forwardRef, Module } from '@nestjs/common';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { Association } from './association.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinuteModule } from '../minute/minute.module';
import { RoleModule } from '../role/role.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AssociationsController],
  providers: [AssociationsService],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => MinuteModule),
    forwardRef(() => RoleModule),
    TypeOrmModule.forFeature([Association]),
  ],
  exports: [AssociationsService],
})
export class AssociationsModule {}
