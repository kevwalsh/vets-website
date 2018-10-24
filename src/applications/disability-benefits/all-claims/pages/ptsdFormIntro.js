import React from 'react';
import { PtsdNameTitle } from '../content/ptsdClassification';
import { introExplanationText } from '../content/newPTSDFollowUp';

export const uiSchema = {
  'ui:title': ({ formData }) => (
    <PtsdNameTitle formData={formData} formType="781" />
  ),
  'ui:description': introExplanationText,
};

export const schema = {
  type: 'object',
  properties: {},
};
