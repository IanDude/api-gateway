import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ShowsService } from './shows.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import type { AuthenticatedRequest } from '../users/interfaces/request.interface';
import { AccessTokenGuard } from '../users/guards/access-jwt.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('shows')
@UseInterceptors(CacheInterceptor)
@UseGuards(ThrottlerGuard)
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @Post()
  create(@Body() createShowDto: CreateShowDto) {
    return this.showsService.create(createShowDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('book')
  bookSeat(@Body() body: { seatId: string }, @Req() req: AuthenticatedRequest) {
    console.log('Starting book endpoint in gateway');
    return this.showsService.bookSeat(body.seatId, req.user.id);
  }

  @UseGuards(AccessTokenGuard)
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
