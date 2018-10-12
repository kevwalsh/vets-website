import {
  uiSchema as informationUISchema,
  schema as informationSchema,
} from './informationPage';

import {
  uiSchema as ptsdTypeUISchema,
  schema as ptsdTypeSchema,
} from './choosePtsdType';

export const informationPage = {
  uiSchema: informationUISchema,
  schema: informationSchema,
};

export const ptsdType = {
  uiSchema: ptsdTypeUISchema,
  schema: ptsdTypeSchema,
};

import {
  uiSchema as ptsdChoiceUISchema,
  schema as ptsdChoiceSchema,
} from './ptsdChoice';

import {
  uiSchema as ptsdSecondaryChoiceUISchema,
  schema as ptsdSecondaryChoiceSchema,
} from './ptsdSecondaryChoice';

export const ptsdChoice = {
  uiSchema: ptsdChoiceUISchema,
  schema: ptsdChoiceSchema,
};

export const ptsdSecondaryChoice = {
  uiSchema: ptsdSecondaryChoiceUISchema,
  schema: ptsdSecondaryChoiceSchema,
};
