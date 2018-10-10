import React from 'react';
import { PtsdNameTitle } from '../helpers';
// import { countries, states, stateNames } from '../../526EZ/helpers';
import {
  // schema as addressSchema,
  uiSchema as addressUI,
} from '../../../../platform/forms/definitions/address';

import requestingStatementsSecondaryView from '../components/requestingStatementsSecondaryView';
// import _ from 'lodash';

const requestingStatementsSecondaryDescription = (
  <div>
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
    <PtsdNameTitle formData={formData} formType="781a">
      Reports from authorities
    </PtsdNameTitle>
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
        country: {
          'ui:title': 'Country',
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
        },
      },
    },
  },
};
