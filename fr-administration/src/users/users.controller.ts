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
  // UseGuards,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserInput } from './UserInput';
// import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/role/role.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(): Promise<User[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getById(@Param() parameter): Promise<User> {
    const userById = await this.service.getById(+parameter.id);

    if (userById === undefined) {
      throw new HttpException(
        `Could not find a user with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return userById;
  }

  @Get(':id/roles')
  async getRoles(@Param() parameter): Promise<Role[]> {
    const userById = await this.service.getById(+parameter.id);

    if (userById === undefined) {
      throw new HttpException(
        `Could not find a user with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.service.getRoles(+parameter.id);
  }

  // @Get(':id/associations')
  // async getAssociations(@Param() parameter): Promise<AssociationDTO[]> {
  //   return await this.service.getAssociations(+parameter.id);
  // }

  @Post()
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  async create(@Body() input: UserInput): Promise<User> {
    return await this.service.create(
      input.firstname,
      input.lastname,
      input.age,
      input.password,
      input.avatar,
    );
  }

  @Put(':id')
  update(@Body() input: any, @Param() parameter): Promise<User> {
    return this.service.update(
      input.firstname,
      input.lastname,
      input.age,
      input.password,
      +parameter.id,
      input.avatar,
    );
  }

  @Delete(':id')
  async remove(@Param() parameter): Promise<boolean> {
    const indexToDelete = await this.service.getById(+parameter.id);

    if (indexToDelete === undefined) {
      throw new HttpException(
        `Could not find a user with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.service.remove(+parameter.id);
  }
}
