import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShowsService } from './shows.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';

@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @Post()
  create(@Body() createShowDto: CreateShowDto) {
    return this.showsService.create(createShowDto);
  }

  @Get()
  findAll() {
    return this.showsService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.showsService.findOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateShowDto: UpdateShowDto) {
    return this.showsService.update(uuid, updateShowDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.showsService.remove(uuid);
  }
}
