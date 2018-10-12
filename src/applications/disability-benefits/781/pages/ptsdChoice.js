import React from 'react';
import {
  ptsdNameTitle,
  UploadPtsdDescription,
  PtsdChoiceDescription,
} from '../helpers';

export const uiSchema = {
  'ui:title': ptsdNameTitle,
  'view:uploadPtsdChoice': {
    'ui:title': <UploadPtsdDescription formType="781" />,
    'ui:widget': 'radio',
    'ui:options': {
      labels: {
        answerQuestions: 'I want to answer questions',
        upload: 'I want to upload VA Form 21-0781',
      },
    },
  },
  'view:uploadPtsdChoiceHelp': {
    'ui:description': <PtsdChoiceDescription formType="781" />,
  },
};

export const schema = {
  type: 'object',
  properties: {
    'view:uploadPtsdChoice': {
      type: 'string',
      enum: ['answerQuestions', 'upload'],
    },
    'view:uploadPtsdChoiceHelp': {
      type: 'object',
      properties: {},
    },
  },
};
