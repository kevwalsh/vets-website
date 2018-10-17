import React from 'react';
import { PtsdNameTitle } from '../helpers';

const additionalRemarksQuestion = (
  <div>
    <h3>Additional remarks</h3>
    <p>
      If there is anything else you would like to tell us about the stressful
      events that contributed to your PTSD, you can provide that information
      below.
    </p>
    <p>
      If you have any supporting documents or buddy statements to support your
      claim, you’ll have a chance to upload those later in the application.
    </p>
  </div>
);

export const uiSchema = {
  'ui:title': ({ formData }) => (
    <PtsdNameTitle formData={formData} formType="781a">
      Event description
    </PtsdNameTitle>
  ),
  'ui:description': additionalRemarksQuestion,
  additionalRemarksCombat: {
    'ui:title': ' ',
    'ui:widget': 'textarea',
  },
};

export const schema = {
  type: 'object',
  properties: {
    additionalRemarksCombat: {
      type: 'string',
    },
  },
};
