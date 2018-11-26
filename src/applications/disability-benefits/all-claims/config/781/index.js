import {
  incidentDate,
  secondaryIncidentDate,
  individualsInvolved,
  individualsInvolvedFollowUp,
  ptsdAdditionalEvents,
  ptsdSecondaryAdditionalEvents,
} from '../../pages';

import { isAnswering781Questions, isAnswering781aQuestions } from '../../utils';

const numberToWords = {
  0: 'First',
  1: 'Second',
  2: 'Third',
  3: 'Fourth',
  4: 'Fifth',
  5: 'Sixth',
  6: 'Seventh',
  7: 'Eighth',
  8: 'Ninth',
  9: 'Tenth',
};

export function createFormConfig781(iterations) {
  let configObj = {};
  for (let index = 0; index < iterations; index++) {
    configObj = {
      ...configObj,
      // 781 PAGE CONFIGS GO HERE
      [`incidentDate${index}`]: {
        title: `${numberToWords[index]} 781 PTSD Incident date`,
        path: `disabilities/ptsd-incident-date-${index}`,
        depends: isAnswering781Questions(index),
        uiSchema: incidentDate.uiSchema(index),
        schema: incidentDate.schema(index),
      },
      [`individualsInvolved${index}`]: {
        title: `${numberToWords[index]} 781 PTSD Individuals Involved yes/no`,
        path: `disabilities/ptsd-individuals-involved-${index}`,
        depends: isAnswering781Questions(index),
        uiSchema: individualsInvolved.uiSchema(index),
        schema: individualsInvolved.schema(index),
      },
      [`individualsInvolvedFollowUp${index}`]: {
        title: `${numberToWords[index]} 781 PTSD Individuals Involved`,
        path: `disabilities/ptsd-individuals-involved-questions-${index}`,
        depends: isAnswering781Questions(index),
        uiSchema: individualsInvolvedFollowUp.uiSchema(index),
        schema: individualsInvolvedFollowUp.schema(index),
      },
      [`ptsdAdditionalEvents${index}`]: {
        title: `${numberToWords[index]} 781 PTSD Additional events.`,
        path: `disabilities/ptsd-additional-events-${index}`,
        depends: isAnswering781Questions(index),
        uiSchema: ptsdAdditionalEvents.uiSchema(index),
        schema: ptsdAdditionalEvents.schema(index),
      },
    };
  }
  return configObj;
}

export function createFormConfig781a(iterations) {
  let configObj = {};
  for (let index = 0; index < iterations; index++) {
    configObj = {
      ...configObj,
      // 781a PAGE CONFIGS GO HERE
      [`secondaryIncidentDate${index}`]: {
        title: `${numberToWords[index]} 781a PTSD Incident date`,
        path: `disabilities/ptsd-781a-incident-date-${index}`,
        depends: isAnswering781aQuestions(index),
        uiSchema: secondaryIncidentDate.uiSchema(index),
        schema: secondaryIncidentDate.schema(index),
      },
      // This should be the last page in the config loop
      [`ptsdSecondaryAdditionalEvents${index}`]: {
        title: `${numberToWords[index]} 781a PTSD Additional events.`,
        path: `disabilities/ptsd-781a-additional-events-${index}`,
        depends: isAnswering781aQuestions(index),
        uiSchema: ptsdSecondaryAdditionalEvents.uiSchema(index),
        schema: ptsdSecondaryAdditionalEvents.schema(index),
      },
    };
  }
  return configObj;
}
