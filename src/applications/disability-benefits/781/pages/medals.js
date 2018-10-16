import React from 'react';
import { PtsdNameTitle, getPtsdClassification } from '../helpers';

const MedalsDescription = ({ formData, formType }) => {
  const { incidentText } = getPtsdClassification(formData, formType);

  return (
    <div>
      <h3>Medals or Citations</h3>
      <p>
        Now we’ll ask about the event or events that caused your
        {` ${incidentText}`}
        -related PTSD. If there is more than one event you want to tell us
        about, we‘ll ask questions about each event separetely.
      </p>
      <p>Did you receive a medal or citation for the first event?</p>
    </div>
  );
};

export const uiSchema = {
  'ui:title': ({ formData }) => (
    <PtsdNameTitle formData={formData} formType="781" />
  ),
  'ui:description': ({ formData }) => (
    <MedalsDescription formData={formData} formType="781" />
  ),
  'view:medalsChoice': {
    'ui:title': ' ',
    'ui:widget': 'radio',
    'ui:options': {
      labels: {
        yes: 'Yes',
        no: 'No',
      },
    },
  },
  medals: {
    'ui:title':
      'Which medals or citations did you receive for this event or situation?',
    'ui:options': {
      expandUnder: 'view:medalsChoice',
      expandUnderCondition: 'yes',
    },
  },
};

export const schema = {
  type: 'object',
  properties: {
    'view:medalsChoice': {
      type: 'string',
      enum: ['yes', 'no'],
    },
    medals: {
      type: 'string',
      properties: {},
    },
  },
};
