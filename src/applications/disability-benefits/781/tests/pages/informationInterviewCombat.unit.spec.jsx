import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';

import { DefinitionTester } from '../../../../../platform/testing/unit/schemaform-utils.jsx';
import formConfig from '../../config/form.js';
import initialData from '../../../526EZ/tests/schema/initialData.js';

describe('781 information interview screen', () => {
  const page =
<<<<<<< HEAD
    formConfig.chapters.introductionPage.pages.informationInterviewCombat;
  const { schema, uiSchema } = page;


=======
    formConfig.chapters.disabilityDetails.pages.informationInterviewCombat;
  const { schema, uiSchema } = page;

>>>>>>> 44bd4dffa008e53c6e163d6191a5453617b7b8e3
  it('should submit without validation errors', () => {
    const onSubmit = sinon.spy();
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        formData={{ initialData }}
        data={{
          'view:selectablePtsdTypes': {
            'view:combatPtsdType': true,
          },
        }}
        onSubmit={onSubmit}
<<<<<<< HEAD
        uiSchema={uiSchema}/>,
=======
        uiSchema={uiSchema}
      />,
>>>>>>> 44bd4dffa008e53c6e163d6191a5453617b7b8e3
    );

    form.find('form').simulate('submit');

    expect(form.find('.usa-input-error-message').length).to.equal(0);
    expect(onSubmit.called).to.be.true;
  });
});
