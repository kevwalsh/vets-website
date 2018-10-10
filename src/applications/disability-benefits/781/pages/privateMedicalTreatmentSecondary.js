import React from 'react';
import { PtsdNameTitle } from '../helpers';

const privateMedicalTreatmentSecondaryDescription = (
  <div>
    <p>
      We’ll ask you to give us permission to request your private medical
      records later in the application.
    </p>
  </div>
);

export const uiSchema = {
  'ui:title': ({ formData }) => (
    <PtsdNameTitle formData={formData} formType="781a" />
  ),
  'ui:description': privateMedicalTreatmentSecondaryDescription,
};

export const schema = {
  type: 'object',
  properties: {},
};
