import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';

import { DefinitionTester } from '../../../../../platform/testing/unit/schemaform-utils';
import formConfig from '../../config/form';

describe('781 Secondary Statement Request', () => {
  const page =
    formConfig.chapters.introductionPage.pages.requestingStatementsSecondary;
  const { schema, uiSchema, arrayPath } = page;

  it('should render', () => {
    const form = mount(
      <DefinitionTester
        arrayPath={arrayPath}
        pagePerItemIndex={0}
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        data={{ 'view:selectablePtsdTypes': { 'view:mstPtsdType': true } }}
        uiSchema={uiSchema}
      />,
    );
    expect(form.find('input').length).to.equal(8);
  });

  it('should fill in name and address', () => {
    const onSubmit = sinon.spy();
    const form = mount(
      <DefinitionTester
        arrayPath={arrayPath}
        pagePerItemIndex={0}
        onSubmit={onSubmit}
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        data={{
          'view:selectablePtsdTypes': { 'view:mstPtsdType': true },
          authorityName: '',
          authorityAddress: '',
        }}
        formData={{
          'view:selectablePtsdTypes': { 'view:mstPtsdType': true },
          authorityName: 'Test',
          authorityAddress: 'Test Address',
        }}
        uiSchema={uiSchema}
      />,
    );
    form.find('form').simulate('submit');

    expect(form.find('.usa-input-error-message').length).to.equal(0);
    expect(onSubmit.called).to.be.true;
  });

  it('should allow submission if no name or address submitted', () => {
    const onSubmit = sinon.spy();
    const form = mount(
      <DefinitionTester
        arrayPath={arrayPath}
        pagePerItemIndex={0}
        onSubmit={onSubmit}
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        data={{
          'view:selectablePtsdTypes': { 'view:mstPtsdType': true },
          authorityName: '',
          authorityAddress: '',
        }}
        formData={{
          'view:selectablePtsdTypes': { 'view:mstPtsdType': true },
          authorityName: '',
          authorityAddress: '',
        }}
        uiSchema={uiSchema}
      />,
    );
    form.find('form').simulate('submit');
    expect(form.find('.usa-input-error-message').length).to.equal(0);
    expect(onSubmit.called).to.be.true;
  });
});
