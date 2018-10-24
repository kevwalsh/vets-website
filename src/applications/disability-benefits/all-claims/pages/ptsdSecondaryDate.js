import React from 'react';
import { secondaryDateDescription } from '../content/ptsdIncidentDate';

import { PtsdNameTitle } from '../content/ptsdClassification';

import currentOrPastDateUI from 'us-forms-system/lib/js/definitions/currentOrPastDate';

export const uiSchema = {
  'ui:title': ({ formData }) => (
    <PtsdNameTitle formData={formData} formType="781a" />
  ),
  'ui:description': secondaryDateDescription,
  secondaryIncidentDate: currentOrPastDateUI(' '),
};

export const schema = {
  type: 'object',
  properties: {
    secondaryIncidentDate: {
      type: 'string',
    },
  },
};
