import React from 'react';
import {
  ptsdNameTitle,
  UploadPtsdDescription,
  PtsdChoiceDescription,
} from '../helpers';

export const uiSchema = {
  'ui:title': ptsdNameTitle,
  'view:uploadPtsdSecondaryChoice': {
    'ui:title': <UploadPtsdDescription formType="781a" />,
    'ui:widget': 'radio',
    'ui:options': {
      labels: {
        answerQuestions: 'I want to answer questions',
        upload: 'I want to upload VA Form 21-0781a',
      },
    },
  },
  'view:uploadPtsdSecondaryChoiceHelp': {
    'ui:description': <PtsdChoiceDescription formType="781a" />,
  },
};

export const schema = {
  type: 'object',
  properties: {
    'view:uploadPtsdSecondaryChoice': {
      type: 'string',
      enum: ['answerQuestions', 'upload'],
    },
    'view:uploadPtsdSecondaryChoiceHelp': {
      type: 'object',
      properties: {},
    },
  },
};
