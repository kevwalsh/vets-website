// import _ from 'lodash/fp';

// Example of an imported schema:
// import fullSchema from '../21-0781-schema.json';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

// const { } = fullSchema.properties;

// const { } = fullSchema.definitions;

// Define all the fields in the form to aid reuse
// const formFields = {};

import {
  informationPage,
  ptsdType,
  ptsdChoice,
  ptsdSecondaryChoice,
  uploadPtsd,
  uploadPtsdSecondary,
  informationInterviewCombat,
  informationInterviewAssault,
  additionalEventsCombat,
  additionalEventsAssault,
  additionalRemarksCombat,
} from '../pages';

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
        ptsdChoice: {
          path: 'ptsdChoice',
          title: 'Disability Details',
          depends: form =>
            form['view:selectablePtsdTypes']['view:combatPtsdType'] ||
            form['view:selectablePtsdTypes']['view:noncombatPtsdType'],
          uiSchema: ptsdChoice.uiSchema,
          schema: ptsdChoice.schema,
        },
        uploadPtsd: {
          path: 'upload-781',
          title: 'Disability Details',
          depends: form =>
            form['view:uploadPtsdChoice'] === 'upload' &&
            (form['view:selectablePtsdTypes']['view:combatPtsdType'] ||
              form['view:selectablePtsdTypes']['view:noncombatPtsdType']),
          uiSchema: uploadPtsd.uiSchema,
          schema: uploadPtsd.schema,
        },
        informationInterviewCombat: {
          path: 'information-781',
          title: 'Disability Details',
          depends: form =>
            form['view:uploadPtsdChoice'] === 'answerQuestions' &&
            (form['view:selectablePtsdTypes']['view:combatPtsdType'] ||
              form['view:selectablePtsdTypes']['view:noncombatPtsdType']),
          uiSchema: informationInterviewCombat.uiSchema,
          schema: informationInterviewCombat.schema,
        },
        additionalEventsCombat: {
          path: 'additional-events-781',
          title: 'Disabiity Details',
          depends: form =>
            form['view:uploadPtsdChoice'] === 'answerQuestions' &&
            (form['view:selectablePtsdTypes']['view:combatPtsdType'] ||
              form['view:selectablePtsdTypes']['view:noncombatPtsdType']),
          uiSchema: additionalEventsCombat.uiSchema,
          schema: additionalEventsCombat.schema,
        },
        additionaRemarksCombat: {
          path: 'additional-remarks-781',
          title: 'Disabiity Details',
          depends: form =>
            form['view:uploadPtsdChoice'] === 'answerQuestions' &&
            (form['view:selectablePtsdTypes']['view:combatPtsdType'] ||
              form['view:selectablePtsdTypes']['view:noncombatPtsdType']),
          uiSchema: additionalRemarksCombat.uiSchema,
          schema: additionalRemarksCombat.schema,
        },
        ptsdSecondaryChoice: {
          path: 'ptsdSecondaryChoice',
          title: 'Disability Details',
          depends: form =>
            form['view:selectablePtsdTypes']['view:mstPtsdType'] ||
            form['view:selectablePtsdTypes']['view:assaultPtsdType'],
          uiSchema: ptsdSecondaryChoice.uiSchema,
          schema: ptsdSecondaryChoice.schema,
        },
        uploadPtsdSecondary: {
          path: 'upload-781a',
          title: 'Disability Details',
          depends: form =>
            form['view:uploadPtsdSecondaryChoice'] === 'upload' &&
            (form['view:selectablePtsdTypes']['view:mstPtsdType'] ||
              form['view:selectablePtsdTypes']['view:assaultPtsdType']),
          uiSchema: uploadPtsdSecondary.uiSchema,
          schema: uploadPtsdSecondary.schema,
        },
        informationInterviewAssault: {
          path: 'information-781a',
          title: 'Disability Details',
          depends: form =>
            form['view:uploadPtsdSecondaryChoice'] === 'answerQuestions' &&
            (form['view:selectablePtsdTypes']['view:mstPtsdType'] ||
              form['view:selectablePtsdTypes']['view:assaultPtsdType']),
          uiSchema: informationInterviewAssault.uiSchema,
          schema: informationInterviewAssault.schema,
        },
        additionalEventsAssault: {
          path: 'additional-events-781a',
          title: 'Disabiity Details',
          depends: form =>
            form['view:uploadPtsdChoice'] === 'answerQuestions' &&
            (form['view:selectablePtsdTypes']['view:mstPtsdType'] ||
              form['view:selectablePtsdTypes']['view:assaultPtsdType']),
          uiSchema: additionalEventsAssault.uiSchema,
          schema: additionalEventsAssault.schema,
        },
      },
    },
  },
};

export default formConfig;
