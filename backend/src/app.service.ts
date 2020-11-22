import { Injectable } from '@nestjs/common';
import { ReplaySubject } from 'rxjs';
import { SseEvent } from './model/sse-event.model';
import { PlayerData } from './model/player-data.model';
import { UuidService } from './uuid.service';
import { InquiryEndEventData } from './event/inquiry-end-event.data';

@Injectable()
export class AppService {
  private readonly eventChannel = new ReplaySubject<any>(1);
  private readonly playerData = new Map<string, PlayerData>();
  private readonly playerAppliedNumbers = new Map<string, number>();

  constructor(private readonly uuidService: UuidService) {}

  private broadcastEvent(event: SseEvent) {
    this.eventChannel.next({ type: 'message', data: event });
  }

  addNewPlayer(name: string) {
    const id = this.uuidService.makeUuid();
    this.playerData.set(id, { name, score: 0 });
    return id;
  }

  getNewEventChannel() {
    return this.eventChannel.asObservable();
  }

  playerApplyNumber(id: string, appliedNumber: number) {
    this.playerAppliedNumbers.set(id, appliedNumber);
  }

  startNextInquiry() {
    this.broadcastEvent({ type: 'NUMBER_INQUIRY_BEGIN' });
  }

  endInquiry() {
    if (this.playerAppliedNumbers.size <= 0) {
      return;
    }

    const total = [...this.playerAppliedNumbers.values()].reduce((prev, curr) => prev + curr, 0);
    const g = (total / this.playerAppliedNumbers.size) * 0.618;
    const deltaMap: Array<[string, number]> = [];
    for (const [player, number] of this.playerAppliedNumbers.entries()) {
      deltaMap.push([player, Math.abs(number - g)]);
    }
    deltaMap.sort((a, b) => a[1] - b[1]); // sort by delta

    const scoreMap: Array<[string, number]> = deltaMap.map(([player], index) => {
      switch (true) {
        case index === 0:
          return [player, 10]; // first to get 5 scores
        case index === deltaMap.length - 1:
          return [player, 0]; // last one to get 0 scores
        case index <= deltaMap.length / 3:
          return [player, 6]; // <30% to get 6 scores
        case index <= (deltaMap.length * 2) / 3:
          return [player, 3]; // <60% to get 3 scores
        default:
          return [player, 1]; // otherwise get 1 score
      }
    });

    for (const [player, data] of this.playerData.entries()) {
      const score = scoreMap.find((item) => item[0] === player)?.[1];
      if (score !== undefined) {
        this.playerData.set(player, { ...data, score: data.score + score });
      }
    }

    const data: InquiryEndEventData = {
      goldPoint: g,
      scoreMap: scoreMap.map(([player, score], index) => ({
        id: player,
        name: this.playerData.get(player).name,
        score,
        totalScore: this.playerData.get(player).score,
        deltaWithG: deltaMap[index][1]
      }))
    };

    this.playerAppliedNumbers.clear();

    this.broadcastEvent({ type: 'NUMBER_INQUIRY_END', data });
  }
}
