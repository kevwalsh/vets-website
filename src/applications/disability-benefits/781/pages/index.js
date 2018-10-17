import {
  uiSchema as informationUISchema,
  schema as informationSchema,
} from './informationPage';

import {
  uiSchema as ptsdTypeUISchema,
  schema as ptsdTypeSchema,
} from './choosePtsdType';

import {
  uiSchema as ptsdChoiceUISchema,
  schema as ptsdChoiceSchema,
} from './ptsdChoice';

import {
  uiSchema as ptsdSecondaryChoiceUISchema,
  schema as ptsdSecondaryChoiceSchema,
} from './ptsdSecondaryChoice';

import {
  uiSchema as ptsd781UISchema,
  schema as ptsd781Schema,
} from './uploadPtsd';

import {
  uiSchema as ptsd781aUISchema,
  schema as ptsd781aSchema,
} from './uploadPtsdSecondary';

import {
  uiSchema as informationInterviewCombatUISchema,
  schema as informationInterviewCombatSchema,
} from './informationInterviewCombat';

import {
  uiSchema as informationInterviewAssaultUISchema,
  schema as informationInterviewAssaultSchema,
} from './informationInterviewAssault';

import {
  uiSchema as additionalEventsCombatUISchema,
  schema as additionalEventsCombatSchema,
} from './additionalEventsCombat';

import {
  uiSchema as additionalEventsAssaultUISchema,
  schema as additionalEventsAssaultSchema,
} from './additionalEventsAssault';

export const informationPage = {
  uiSchema: informationUISchema,
  schema: informationSchema,
};

export const ptsdType = {
  uiSchema: ptsdTypeUISchema,
  schema: ptsdTypeSchema,
};

export const ptsdChoice = {
  uiSchema: ptsdChoiceUISchema,
  schema: ptsdChoiceSchema,
};

export const ptsdSecondaryChoice = {
  uiSchema: ptsdSecondaryChoiceUISchema,
  schema: ptsdSecondaryChoiceSchema,
};

export const uploadPtsd = {
  uiSchema: ptsd781UISchema,
  schema: ptsd781Schema,
};

export const uploadPtsdSecondary = {
  uiSchema: ptsd781aUISchema,
  schema: ptsd781aSchema,
};

export const informationInterviewCombat = {
  uiSchema: informationInterviewCombatUISchema,
  schema: informationInterviewCombatSchema,
};

export const informationInterviewAssault = {
  uiSchema: informationInterviewAssaultUISchema,
  schema: informationInterviewAssaultSchema,
};

export const additionalEventsCombat = {
  uiSchema: additionalEventsCombatUISchema,
  schema: additionalEventsCombatSchema,
};

export const additionalEventsAssault = {
  uiSchema: additionalEventsAssaultUISchema,
  schema: additionalEventsAssaultSchema,
};
