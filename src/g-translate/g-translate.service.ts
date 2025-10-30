/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
// import { CreateGTranslateDto } from './dto/create-g-translate.dto';
// import { UpdateGTranslateDto } from './dto/update-g-translate.dto';
import { TranslationServiceClient } from '@google-cloud/translate';
// import { Translate } from '@google-cloud/translate/build/src/v2';
import { CreateTranslateDto } from 'src/translate/dto/create-translate.dto';
import { ConfigService } from '@nestjs/config';
import * as translate from 'extended-google-translate-api';
@Injectable()
export class GTranslateService {
  protected api: any = '';
  protected project: any = '';
  // create(createGTranslateDto: CreateGTranslateDto) {
  //   return 'This action adds a new gTranslate';
  // }
  constructor(private configService: ConfigService) {
    const api = this.configService.get<string>('GGL');
    const project = this.configService.get<string>('PROJECT_ID');
    console.log(api, project);
  }
  findAll() {
    return `This action returns all gTranslate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gTranslate`;
  }

  // update(id: number, updateGTranslateDto: UpdateGTranslateDto) {
  //   return `This action updates a #${id} gTranslate`;
  // }

  remove(id: number) {
    return `This action removes a #${id} gTranslate`;
  }
  gService() {
    // Instantiates a client
    const translationClient = new TranslationServiceClient();
    const projectId = '';
    const location = 'global';
    const text = 'Hello, world!';
    async function translateText() {
      // Construct request
      const request = {
        parent: `projects/${projectId}/locations/${location}`,
        contents: [text],
        mimeType: 'text/plain', // mime types: text/plain, text/html
        sourceLanguageCode: 'en',
        targetLanguageCode: 'es',
      };

      const [response] = await translationClient.translateText(request);

      if (response.translations) {
        for (const translation of response.translations) {
          console.log(`Translation: ${translation.translatedText}`);
        }
        return response;
      }
    }

    const response = translateText();
    return response;
  }

  gService2(word: CreateTranslateDto) {
    // const api = this.configService.get<string>('GGL');
    // const project = this.configService.get<string>('PROJECT_ID');

    // const translateClient = new Translate({
    //   projectId: project,
    //   key: api,
    // });

    // async function translateText(text: string, targetLanguage: string) {
    //   try {
    //     const [translation] = await translateClient.translate(
    //       text,
    //       targetLanguage,
    //       // text,
    //       // { format: '', from: '', model: '', to: '' },
    //     );
    //     console.log(`Text: ${text}`);
    //     console.log(`Translation to ${targetLanguage}: ${translation}`);
    //     return translation;
    //   } catch (error) {
    //     console.error('Translation error:', error);
    //     throw error;
    //   }
    // }
    translate.defaultDataOptions.definitionSynonyms = true;
    translate.defaultDataOptions.detailedTranslationsSynonyms = true;
    translate.defaultDataOptions.definitionExamples = true;
    translate.defaultDataOptions.examples = true;
    translate.defaultDataOptions.detailedTranslations = true;

    const bob = translate(word.text, word.tag, word.target, {
      // const bob = translate(word.text, 'uk', 'de', {
      definitionSynonyms: true,
      detailedTranslationsSynonyms: true,
      definitionExamples: true,
      examples: true,
      detailedTranslations: true,
    })
      .then((res) => {
        console.log(res.translation);
        return res;
        // console.log(JSON.stringify(res, undefined, 2));
      })
      .catch(console.log);

    // const bob = translateText(word.text, 'en')
    //   .then((translatedText) => {
    //     return translatedText;
    //   })

    //   .catch((error) => console.error('Error during translation:', error));
    return bob;
  }
  //   translateText('Hello, world!', 'uk')
  //     .then((translatedText) => console.log('Translated text:', translatedText))
  //     .catch((error) => console.error('Error during translation:', error));
  // }

  //   gService2() {
  //   const projectId = 'inductive-time-413806'; // Replace with your Google Cloud Project ID
  //   const apiKey = 'AIzaSyC0zTkwcKzG9r-sF6Xwtj3-WDgwSNDwdZ4'; // Replace with your generated API key

  //   const translateClient = new Translate({
  //     projectId: projectId,
  //     key: apiKey,
  //   });

  //   async function translateText(text: string, targetLanguage: string) {
  //     try {
  //       const [translation] = await translateClient.translate(
  //         text,
  //         targetLanguage,
  //         // text,
  //         // { format: '', from: '', model: '', to: '' },
  //       );
  //       console.log(`Text: ${text}`);
  //       console.log(`Translation to ${targetLanguage}: ${translation}`);
  //       return translation;
  //     } catch (error) {
  //       console.error('Translation error:', error);
  //       throw error;
  //     }
  //   }

  //   // Example usage:
  //   translateText('Hello, world!', 'uk')
  //     .then((translatedText) => console.log('Translated text:', translatedText))
  //     .catch((error) => console.error('Error during translation:', error));
  // }
}
