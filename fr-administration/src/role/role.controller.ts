import { RoleService } from './role.service';
import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Role } from './role.entity';
import { ApiTags } from '@nestjs/swagger';
import { RoleUpdate } from './RoleUpdate';
import { RoleInput } from './RoleInput';
import { User } from 'src/users/user.entity';

@ApiTags('role')
@Controller('roles')
export class RoleController {
  constructor(private service: RoleService) {}

  @Get()
  async getAll(): Promise<Role[]> {
    return await this.service.getAll();
  }

  @Get('users/:name')
  async getByRoleName(@Param() parameter): Promise<User[]> {
    return this.service.getByRoleName(parameter.name);
  }

  @Get(':idUser/:idAssociation')
  async getById(@Param() parameter): Promise<Role> {
    const roleById = await this.service.getById(
      +parameter.idUser,
      +parameter.idAssociation,
    );

    if (!roleById) {
      throw new HttpException(
        `Could not find a role with for user ${parameter.idUser} and association ${parameter.idAssociation}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return roleById;
  }

  @Post()
  async create(@Body() input: RoleInput): Promise<Role> {
    return await this.service.create(
      input.idUser,
      input.idAssociation,
      input.name,
    );
  }

  @Put(':idUser/:idAssociation')
  async update(@Body() input: RoleUpdate, @Param() parameter): Promise<Role> {
    return await this.service.update(
      +parameter.idUser,
      +parameter.idAssociation,
      input.name,
    );
  }

  @Delete(':idUser/:idAssociation')
  async remove(@Param() parameter): Promise<boolean> {
    const indexToDelete = await this.service.getById(
      +parameter.idUser,
      +parameter.idAssociation,
    );

    if (!indexToDelete) {
      throw new HttpException(
        `Could not find a role with for user ${parameter.idUser} and association ${parameter.idAssociation}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.service.remove(+parameter.idUser, +parameter.idAssociation);
  }
}
