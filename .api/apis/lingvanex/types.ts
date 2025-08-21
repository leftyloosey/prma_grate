import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type GetlanguagesMetadataParam = FromSchema<typeof schemas.Getlanguages.metadata>;
export type GetlanguagesResponse200 = FromSchema<typeof schemas.Getlanguages.response['200']>;
export type GetlanguagesResponse403 = FromSchema<typeof schemas.Getlanguages.response['403']>;
export type PostTranslateBodyParam = FromSchema<typeof schemas.PostTranslate.body>;
export type PostTranslateResponse200 = FromSchema<typeof schemas.PostTranslate.response['200']>;
export type PostTranslateResponse403 = FromSchema<typeof schemas.PostTranslate.response['403']>;
