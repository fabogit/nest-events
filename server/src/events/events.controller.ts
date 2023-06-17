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

@Controller('events')
export class EventsController {
  @Get()
  findAll() {
    return { action: 'findAll' };
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return { action: 'findOne', id };
  }
  @Post()
  create(@Body() body: CreateEventDto) {
    return { action: 'create', body };
  }
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateEventDto) {
    return { action: 'patch', id, body };
  }
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return { action: 'remove', id };
  }
}
