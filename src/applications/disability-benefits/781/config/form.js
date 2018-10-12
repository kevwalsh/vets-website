// import _ from 'lodash/fp';

// Example of an imported schema:
// import fullSchema from '../21-0781-schema.json';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

// const { } = fullSchema.properties;

// const { } = fullSchema.definitions;

// Define all the fields in the form to aid reuse
// const formFields = {};

import { informationPage, ptsdType } from '../pages';

const formConfig = {
  urlPrefix: '/',
  submit: () =>
    Promise.resolve({ attributes: { confirmationNumber: '123123123' } }),
  trackingPrefix: 'ptsd-0781-0781a-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  formId: '1234',
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to apply for benefits.',
    noAuth: 'Please sign in again to continue your application for benefits.',
  },
  title: 'Apply for increased disability compensation',
  chapters: {
    introductionPage: {
      pages: {
        ptsdIntroduction: {
          title: 'Disability Details',
          path: 'info',
          uiSchema: informationPage.uiSchema,
          schema: informationPage.schema,
        },
      },
    },
    disabilityDetails: {
      title: 'Disability Details',
      pages: {
        ptsdType: {
          title: 'PTSD Type',
          path: 'ptsdType',
          uiSchema: ptsdType.uiSchema,
          schema: ptsdType.schema,
        },
      },
    },
  },
};

export default formConfig;
