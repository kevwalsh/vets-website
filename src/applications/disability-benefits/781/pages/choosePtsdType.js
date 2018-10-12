import React from 'react';
import AdditionalInfo from '@department-of-veterans-affairs/formation/AdditionalInfo';

const ptsdTypeDescription = () => (
  <div>
    <p>
      First we‘re going to ask you about the type of event or events that
      contributed to your PTSD.
    </p>
    <p>What type of event contributed to your PTSD? (Choose all that apply.)</p>
  </div>
);

const ptsdTypeHelp = () => (
  <AdditionalInfo triggerText="Which should I choose?">
    <h4>Types of Stressful incidents</h4>
    <h5>Combat</h5>
    <p>
      This means you participated in a fight or encounter with a military enemy
      or hostile unit or weapon. It also includes if you were present during
      these events either as a combatant or a Servicemember supporting
      combatants such as providing medical care to the wounded.
    </p>
    <h5>Military Sexual Trauma</h5>
    <p>
      This includes sexual harassment, sexual assault, or rape that happens in a
      military setting.
    </p>
    <h5>Personal Assault</h5>
    <p>
      This means a person, who isn‘t part of an enemy force, committed harm.
      Examples of personal assault include: assault, battery, robbery, mugging,
      stalking, or harassment.
    </p>
    <h5>Non-Combat other than Military Sexual Trauma or Personal Assault</h5>
    <p>
      This means you experienced an event such as a car accident, hurricane, or
      plane crash, or witnessing the death, injury, or threat to another person
      or to yourself, caused by something other than a hostile military or
      terrorist activity.
    </p>
  </AdditionalInfo>
);

export const uiSchema = {
  'ui:title': 'PTSD',
  'ui:description': ptsdTypeDescription,
  'view:selectablePtsdTypes': {
    'view:combatPtsdType': {
      'ui:title': 'Combat',
    },
    'view:mstPtsdType': {
      'ui:title': 'Military Sexual Trauma',
    },
    'view:assaultPtsdType': {
      'ui:title': 'Personal Assault',
    },
    'view:noncombatPtsdType': {
      'ui:title':
        'Non-Combat PTSD other than Military Sexual Trauma or Personal Assault',
    },
  },
  'view:ptsdTypeHelp': {
    'ui:description': ptsdTypeHelp,
  },
};

export const schema = {
  type: 'object',
  properties: {
    'view:selectablePtsdTypes': {
      type: 'object',
      properties: {
        'view:combatPtsdType': {
          type: 'boolean',
        },
        'view:mstPtsdType': {
          type: 'boolean',
        },
        'view:assaultPtsdType': {
          type: 'boolean',
        },
        'view:noncombatPtsdType': {
          type: 'boolean',
        },
      },
    },
    'view:ptsdTypeHelp': {
      type: 'object',
      properties: {},
    },
  },
};
