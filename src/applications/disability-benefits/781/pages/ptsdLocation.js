import {
  PtsdNameTitle,
  locationSchemas,
  ptsdLocationDescription,
} from '../helpers';

const { addressUI, addressSchema } = locationSchemas();

export const uiSchema = {
  'ui:title': PtsdNameTitle,
  'ui:description': ptsdLocationDescription,
  incidentLocation: addressUI,
};

export const schema = {
  type: 'object',
  properties: {
    incidentLocation: addressSchema,
  },
};
