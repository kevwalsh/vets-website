import React from 'react';
import { PtsdNameTitle } from '../helpers';

const additionalEventsQuestion = (
  <div>
    <h3>Additional events or situations</h3>
    <p>Do you have another event or situation to tell us about?</p>
  </div>
);
export const uiSchema = {
  'ui:title': ({ formData }) => (
    <PtsdNameTitle formData={formData} formType="781" />
  ),
  'view:additionalEvents': {
    'ui:title': ' ',
    'ui:description': additionalEventsQuestion,
    'ui:widget': 'radio',
    'ui:options': {
      labels: {
        yes: 'Yes',
        no: 'No',
      },
    },
  },
  // 'view:uploadPtsdChoiceHelp': {
  //   'ui:description': ptsdChoiceDescription,
  // },
};

export const schema = {
  type: 'object',
  properties: {
    'view:additionalEvents': {
      type: 'string',
      enum: ['yes', 'no'],
    },
  },
};
