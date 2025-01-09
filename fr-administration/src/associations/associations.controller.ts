import { AssociationsService } from './associations.service';
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
import { ApiTags } from '@nestjs/swagger';
import { AssociationDTO } from './associations.dto';
import { Minute } from 'src/minute/minute.entity';
import { Member } from './association.member';
import { Association } from './association.entity';

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {
  constructor(private service: AssociationsService) {}

  @Get()
  async agetAll(): Promise<AssociationDTO[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getById(@Param() parameter): Promise<AssociationDTO> {
    const associationById = await this.service.getById(+parameter.id);

    if (!associationById) {
      throw new HttpException(
        `Could not find an association with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return associationById;
  }

  @Get('/user/:id')
  async getByUser(@Param() parameter): Promise<AssociationDTO[]> {
    const associationsUser = await this.service.getByUser(+parameter.id);

    if (!associationsUser) {
      throw new HttpException(
        `Could not find associations of user with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return associationsUser;
  }

  @Get(':id/members')
  async getMembers(@Param() parameter): Promise<Member[]> {
    const associationById = await this.service.getById(+parameter.id);

    if (!associationById) {
      throw new HttpException(
        `Could not find an association with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.service.getMembers(associationById.id);
  }

  @Get(':id/minutes')
  async getMinutes(@Param() parameter): Promise<Minute[]> {
    const associationById = await this.service.getById(+parameter.id);

    if (!associationById) {
      throw new HttpException(
        `Could not find an association with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.service.getMinutes(+parameter.id);
  }

  @Post()
  async create(@Body() input: any): Promise<Association> {
    return await this.service.create(input.idUsers, input.name, input.logo);
  }

  @Put(':idAssociation/:idUser')
  async addMember(@Param() parameter: any): Promise<Association> {
    return await this.service.addMember(
      +parameter.idAssociation,
      +parameter.idUser,
    );
  }

  @Put(':id')
  async update(
    @Body() input: any,
    @Param() parameter,
  ): Promise<AssociationDTO> {
    return await this.service.update(+parameter.id, input.idUsers, input.name);
  }

  @Delete(':idAssociation/:idUser')
  async removeMember(@Param() parameter): Promise<Association> {
    return await this.service.removeMember(
      +parameter.idAssociation,
      +parameter.idUser,
    );
  }

  @Delete(':id')
  async remove(@Param() parameter): Promise<boolean> {
    const indexToDelete = await this.service.getById(+parameter.id);

    if (!indexToDelete) {
      throw new HttpException(
        `Could not find an association with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.service.remove(+parameter.id);
  }
}
