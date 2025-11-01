export class GTranslate {}
export interface gReturn {
  word: string;
  translation: string;
  wordTranscription: string | null;
  translationTranscription: string | null;
  translations: object;
  definitions: object;
  examples: [];
}
