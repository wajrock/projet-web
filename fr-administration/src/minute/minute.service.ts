import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Minute } from './minute.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MinuteService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    @InjectRepository(Minute)
    private repository: Repository<Minute>,
  ) {}

  async getAll(): Promise<Minute[]> {
    return await this.repository.find({ relations: ['voters'] });
  }

  async getById(idMinute: number): Promise<Minute> {
    const minute = await this.repository.findOne({
      where: { idMinute: Equal(idMinute) },
      relations: ['voters'],
    });

    return minute;
  }

  async getByIdAssociation(idAssociation: number): Promise<Minute[]> {
    const minutes: Minute[] = await this.repository.find({
      where: { idAssociation: Equal(idAssociation) },
      relations: ['voters'],
    });

    minutes.forEach((minute) => {
      minute.voters = plainToInstance(User, minute.voters);
    });

    return minutes;
  }

  async getVoters(idMinutes: number): Promise<User[]> {
    return (await this.getById(idMinutes)).voters;
  }

  async create(
    content: string,
    idVoters: number[],
    date: string,
    idAssociation: number,
  ): Promise<Minute> {
    const voters: User[] = await Promise.all(
      idVoters.map((id) => this.userService.getById(+id)),
    );

    const newMinute = await this.repository.create({
      idAssociation: idAssociation,
      content: content,
      date: date,
    });
    newMinute.voters = voters;

    return await this.repository.save(newMinute);
  }

  async update(
    idMinute: number,
    idVoters: number[],
    idAssociation: number,
    content: string,
  ): Promise<Minute> {
    const minute = await this.getById(idMinute);

    if (idAssociation !== undefined) {
      minute.idAssociation = idAssociation;
    }

    if (idVoters !== undefined) {
      const voters: User[] = await Promise.all(
        idVoters.map((id) => this.userService.getById(+id)),
      );
      minute.voters = voters;
    }

    if (content !== undefined) {
      minute.content = content;
    }

    return await this.repository.save(minute);
  }

  async remove(idMinute: number): Promise<boolean> {
    return await this.repository
      .delete(idMinute)
      .then((association) => association.affected === 1);
  }

  async removeVoter(idMinute: number, idVoter: number): Promise<Minute> {
    const minute: Minute = await this.repository.findOne({
      where: { idMinute: Equal(idMinute) },
      relations: ['voters'],
    });

    minute.voters = minute.voters.filter((voter) => voter.id !== idVoter);

    return await this.repository.save(minute);
  }

  async removeUserFromAllMinutes(idUser: number): Promise<void> {
    const minutes = await this.repository.find({
      relations: ['voters'],
    });

    for (const minute of minutes) {
      minute.voters = minute.voters.filter((voter) => voter.id !== idUser);
      await this.repository.save(minute);
    }
  }
}
