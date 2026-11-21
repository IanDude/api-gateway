import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError, timeout } from 'rxjs';

@Injectable()
export class ShowsService {
  constructor(@Inject('SHOWS_SERVICE') private showsService: ClientProxy) {}

  create(createShowDto: CreateShowDto) {
    return 'This action adds a new show';
  }

  bookSeat(seatId: string, userId: number) {
    console.log('Starting bookSeat method');
    return this.showsService.send('SHOWS.BOOK_SEAT', {
      seatId: seatId,
      userId: userId,
    });
  }

  findAll() {
    return this.showsService.send('SHOWS.GET_ALL', {}).pipe(
      timeout(5000),
      catchError((error: RpcException) => {
        return throwError(() => new NotFoundException(error.message));
      }),
    );
  }

  findOne(uuid: string) {
    return this.showsService.send('SHOWS.GET', { showUUID: uuid });
  }

  update(uuid: string, updateShowDto: UpdateShowDto) {
    return this.showsService.send('SHOWS.UPDATE', {
      showUUID: uuid,
      newData: updateShowDto,
    });
  }

  remove(uuid: string) {
    return this.showsService.send('SHOWS.REMOVE', { showUUID: uuid });
  }
}
