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

@Controller('events')
export class EventsController {
  private events: Event[] = [];

  @Get()
  findAll(): Event[] | [] {
    return this.events;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Event {
    const event = this.events.find((item) => item.id === id);
    return event;
  }

  @Post()
  create(@Body() body: CreateEventDto) {
    const event = {
      ...body,
      when: new Date(body.when),
      id: this.events.length++,
    };
    this.events.push(event);
    return event;
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateEventDto) {
    const index = this.events.findIndex((item) => item.id == id);
    const updatedEvent = {
      ...this.events[index],
      ...body,
      when: body.when ? new Date(body.when) : this.events[index].when,
    };
    this.events[index] = updatedEvent;
    return this.events[index];
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    this.events = this.events.filter((item) => item.id !== id);
  }
}
