const uiSchema = index => ({
  'ui:title': 'Unemployability Status',
  [`view:unemployabilityStatus${index}`]: {
    'ui:title':
      'Are you currently unemployed or at risk of unemployment due to any of your service-connected disabilities?',
    'ui:widget': 'yesNo',
  },
});

const schema = index => ({
  type: 'object',
  required: [`view:unemployabilityStatus${index}`],
  properties: {
    [`view:unemployabilityStatus${index}`]: {
      type: 'boolean',
    },
  },
});

function hasRatedDisabilities(formData, index) {
  console.log(formData, index);
  return true;
}

export function formFlow781(index) {
  return {
    [`ratedDisabilities${index}`]: {
      title: 'Existing Conditions (Rated Disabilities) ',
      path: `disabilities/rated-disabilities-${index}`,
      depends: formData => hasRatedDisabilities(formData, index),
      uiSchema: uiSchema(index),
      schema: schema(index),
    },
  };
}
