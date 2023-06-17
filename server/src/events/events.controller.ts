import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './event.entity';
import { Like, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('events')
export class EventsController {
  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
  ) {}

  @Get()
  async findAll() {
    const events = await this.repository.find();
    return events;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const event = await this.repository.findOneBy({ id });
    return event;
  }

  @Post()
  async create(@Body() body: CreateEventDto) {
    const newEventEntity = await this.repository.create({
      ...body,
      when: body.when ? new Date(body.when) : new Date(),
    });
    const event = await this.repository.insert(newEventEntity);
    return event;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateEventDto,
  ) {
    const eventOld = await this.repository.findOneBy({ id });

    const updatedEvent = await this.repository.save(
      {
        ...eventOld,
        ...body,
        when: body.when ? new Date(body.when) : eventOld.when,
      },
      {},
    );

    return updatedEvent;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const event = await this.repository.findOneBy({ id });
    await this.repository.remove(event);
  }

  @Get('sql/test')
  async sql() {
    return this.repository.find({
      select: ['id', 'when'],
      where: [
        { id: MoreThan(3), when: MoreThan(new Date('2021-02-12')) },
        { description: Like('%meet%') },
      ],
      take: 2,
      order: {
        id: 'DESC',
      },
    });
  }
}
