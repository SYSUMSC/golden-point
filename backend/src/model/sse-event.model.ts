export interface SseEvent {
  type: 'NUMBER_INQUIRY_BEGIN' | 'NUMBER_INQUIRY_END';
  data?: any;
}
