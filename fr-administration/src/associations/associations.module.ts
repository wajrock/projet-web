import { forwardRef, Module } from '@nestjs/common';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { UsersModule } from 'src/users/users.module';
import { Association } from './association.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinuteModule } from 'src/minute/minute.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  controllers: [AssociationsController],
  providers: [AssociationsService],
  imports: [
    forwardRef(() => UsersModule),
    MinuteModule,
    RoleModule,
    TypeOrmModule.forFeature([Association]),
  ],
  exports: [AssociationsService],
})
export class AssociationsModule {}
