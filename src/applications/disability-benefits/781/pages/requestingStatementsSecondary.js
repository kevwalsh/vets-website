import React from 'react';
import { PtsdNameTitle } from '../helpers';
import fullSchema781 from '../21-0781-schema.json';

import { uiSchema as addressUI } from '../../../../platform/forms/definitions/address';

import { schema as addressSchema } from '../definitions/address';
import requestingStatementsSecondaryView from '../components/requestingStatementsSecondaryView';

import PhoneNumberWidget from 'us-forms-system/lib/js/widgets/PhoneNumberWidget';
import PhoneNumberReviewWidget from 'us-forms-system/lib/js/review/PhoneNumberWidget';

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
        },
        street2: {
          'ui:title': 'Street Address',
        },
        city: {
          'ui:title': 'City',
        },
        state: {
          'ui:title': 'State',
        },
        postalCode: {
          'ui:title': 'Postal Code',
          'ui:options': {
            widgetClassNames: 'usa-input-medium',
          },
        },
      }),
      primaryPhone: {
        'ui:title': 'Phone number',
        'ui:widget': PhoneNumberWidget,
        'ui:reviewWidget': PhoneNumberReviewWidget,
        'ui:options': {
          widgetClassNames: 'va-input-medium-large',
        },
      },
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
              },
              state: {
                type: 'string',
              },
            },
          }),
          primaryPhone: {
            type: 'string',
            properties: {},
          },
        },
      },
    },
  },
};
