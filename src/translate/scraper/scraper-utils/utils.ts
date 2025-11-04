export class scrapeReturnObj {
  partOfSpeech: string;
  definitions: string[];
  examples: string[];
  constructor(partOfSpeech: string, definitions: string[], examples: string[]) {
    this.partOfSpeech = partOfSpeech;
    this.examples = examples;
    this.definitions = definitions;
  }
}

export function cleanString(str: string) {
  const filter = new RegExp(
    '< *\\/? *[a-z]+ *( [a-z]+="[^<>"]+" *)* *\\/? *>',
    'ig',
  );
  return str.replaceAll(filter, '').replaceAll('&nbsp;', ' ');
}
export const endpoint = 'https://en.wiktionary.org/api/rest_v1/page/definition';

export interface wikiReturn {
  meaning: {
    partOfSpeech: string;
    definitions: {
      examples: string[];
    };
  };
}
export interface meaningReturn {
  meaning: string[];
  definitions: definitionReturn[];
  partOfSpeech: string;
}
export interface definitionReturn {
  examples: string[];
  definition: string;
}
export interface objReturn {
  partOfSpeech: string;
  definitions: string[];
  examples: string[];
}
export interface wikiObjReturn {
  partOfSpeech: string;
  definitions: string[];
  examples: string[];
}
export function parseWiki(data: wikiReturn, tag: string): wikiObjReturn {
  let meaning: meaningReturn;
  let definition: definitionReturn;
  const outArray: string[] = [];
  const exmpArray: string[] = [];
  const returnObj = {
    partOfSpeech: '',
    definitions: outArray,
    examples: exmpArray,
  };

  for (meaning of data[tag]) {
    returnObj.partOfSpeech = meaning.partOfSpeech;
    for (definition of meaning.definitions) {
      if (definition.definition) {
        const filteredDefinition = cleanString(definition.definition);
        outArray.push(filteredDefinition);
        if (definition.examples) {
          for (const example of definition.examples) {
            const filteredExample = cleanString(example);
            exmpArray.push(filteredExample);
          }
        }
      }
    }
  }
  return returnObj;
}
