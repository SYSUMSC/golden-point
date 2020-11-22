import { Body, Controller, Post, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { PlayerApplyNumberDto } from './dto/player-apply-number.dto';
import { AdminControlGameDto } from './dto/admin-control-game.dto';
import { PlayerJoinGameDto } from './dto/player-join-game.dto';
import { UserJoinGameResponse } from './response/user-join-game.response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Sse('event')
  sse() {
    return this.appService.getNewEventChannel();
  }

  @Post('join')
  playerJoinGame(@Body() dto: PlayerJoinGameDto): UserJoinGameResponse {
    const id = this.appService.addNewPlayer(dto.name);
    return {
      id
    };
  }

  @Post('number')
  playerApplyNumber(@Body() dto: PlayerApplyNumberDto) {
    this.appService.playerApplyNumber(dto.id, dto.appliedNumber);
  }

  @Post('control')
  adminControlGame(@Body() dto: AdminControlGameDto) {
    switch (dto.type) {
      case 'start-next-inquiry':
        this.appService.startNextInquiry();
        break;
      case 'end-inquiry':
        this.appService.endInquiry();
        break;
    }
  }
}
