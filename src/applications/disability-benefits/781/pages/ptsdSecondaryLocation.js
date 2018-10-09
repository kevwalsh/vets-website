import React from 'react';

import { PtsdNameTitle, locationSchemas } from '../helpers';

const ptsdLocationDescription = () => (
  <div>
    <h5>Event location</h5>
    <p>
      Where did the event happen? Please be as specific as you can and include
      the name of the city, state, country, province, landmark, or military
      installation.
    </p>
  </div>
);

const { addressUI, addressSchema } = locationSchemas();

export const uiSchema = {
  'ui:title': PtsdNameTitle,
  'ui:description': ptsdLocationDescription,
  secondaryIncidentLocation: {
    ...addressUI,
    additionalDetails: {
      'ui:title': 'Additional details', // Currently only on 781a, keeping here for now.
      'ui:widget': 'textarea',
    },
    'ui:order': [...addressUI['ui:order'], 'additionalDetails'],
  },
};

export const schema = {
  type: 'object',
  properties: {
    secondaryIncidentLocation: {
      ...addressSchema,
      properties: {
        ...addressSchema.properties,
        additionalDetails: {
          type: 'string',
        },
      },
    },
  },
};
