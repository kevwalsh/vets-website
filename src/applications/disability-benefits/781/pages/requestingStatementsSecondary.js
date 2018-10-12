import React from 'react';
import { PtsdNameTitle } from '../helpers';
import fullSchema781 from '../21-0781-schema.json';
// import { countries, states, stateNames } from '../../526EZ/helpers';
import {
  //  schema as addressSchema,
  uiSchema as addressUI,
} from '../../../../platform/forms/definitions/address';

import { schema as addressSchema } from '../definitions/address';
import requestingStatementsSecondaryView from '../components/requestingStatementsSecondaryView';
// import _ from 'lodash';

const requestingStatementsSecondaryDescription = (
  <div>
    <h3>Reports from Authorities</h3>
    <p>
      If you’d like us to get reports from military or civilian authorities,
      please provide a name, if you have it, and a mailing address for each
      authority we should contact. If you already have copies of their
      statements, you’ll be able to upload those on the next screen.
    </p>
  </div>
);

export const uiSchema = {
  'ui:title': ({ formData }) => (
    <PtsdNameTitle formData={formData} formType="781a" />
  ),
  'ui:description': requestingStatementsSecondaryDescription,
  authorities: {
    'ui:options': {
      viewField: requestingStatementsSecondaryView,
    },
    items: {
      authorityName: {
        'ui:title': 'Name of authority',
      },
      authorityAddress: Object.assign(addressUI('', false), {
        street: {
          'ui:title': 'Street Address',
          // 'ui:errorMessages': {
          //   pattern: 'Street address must be less than 20 characters.',
          // },
        },
        street2: {
          'ui:title': 'Street Address',
          // 'ui:errorMessages': {
          //   pattern: 'Street address 2 must be less than 6 characters.',
          // },
        },
        city: {
          'ui:title': 'City',
          // 'ui:errorMessages': {
          //   pattern:
          //     'Please provide a valid city. Must be at least 1 character.',
          // },
        },
        state: {
          'ui:title': 'State',
        },
        postalCode: {
          'ui:title': 'Postal Code',
          'ui:options': {
            widgetClassNames: 'usa-input-medium',
          },
          // 'ui:validations': [
          //   {
          //     validator: validateZIP,
          //   },
          // ],
        },
      }),
    },
  },
};

export const schema = {
  type: 'object',
  properties: {
    authorities: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          authorityName: {
            type: 'string',
          },
          authorityAddress: Object.assign(addressSchema(fullSchema781, true), {
            properties: {
              street: {
                minLength: 1,
                maxLength: 50,
                type: 'string',
              },
              street2: {
                minLength: 1,
                maxLength: 5,
                type: 'string',
              },
              city: {
                minLength: 1,
                maxLength: 51,
                type: 'string',
              },
              postalCode: {
                type: 'string',
              },
              country: {
                type: 'string',
                //  enum: countries,
                //  default: 'USA',
              },
              state: {
                type: 'string',
                //  enum: states,
                //  enumNames: stateNames,
              },
            },
          }),
        },
      },
    },
  },
};
