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
import { Minute } from './minute.entity';
import { ApiTags } from '@nestjs/swagger';
import { MinuteUpdate } from './MinuteUpdate';
import { MinuteInput } from './MinuteInput';
import { MinuteService } from './minute.service';
import { User } from '../users/user.entity';

@ApiTags('minute')
@Controller('minutes')
export class MinuteController {
  constructor(private service: MinuteService) {}

  @Get()
  async getAll(): Promise<Minute[]> {
    return await this.service.getAll();
  }

  @Get(':idMinute/')
  async getById(@Param() parameter): Promise<Minute> {
    const minuteById = await this.service.getById(+parameter.idMinute);

    if (!minuteById) {
      throw new HttpException(
        `Could not find a minute with id ${parameter.idMinute}.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return minuteById;
  }

  @Get(':idMinute/voters')
  async getMembers(@Param() parameter): Promise<User[]> {
    const minuteById = await this.service.getById(+parameter.idMinute);

    if (!minuteById) {
      throw new HttpException(
        `Could not find a minute with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.service.getVoters(minuteById.idMinute);
  }

  @Post()
  async create(@Body() input: MinuteInput): Promise<Minute> {
    return await this.service.create(
      input.content,
      input.idVoters,
      input.date,
      input.idAssociation,
    );
  }

  @Put(':idMinute/')
  async update(
    @Body() input: MinuteUpdate,
    @Param() parameter,
  ): Promise<Minute> {
    return await this.service.update(
      +parameter.idMinute,
      input.idVoters,
      input.idAssociation,
      input.content,
    );
  }

  @Delete(':idMinute/')
  async remove(@Param() parameter): Promise<boolean> {
    const indexToDelete = await this.service.getById(+parameter.idMinute);

    if (!indexToDelete) {
      throw new HttpException(
        `Could not find a minute with id ${parameter.idMinute}.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.service.remove(+parameter.idMinute);
  }
}
