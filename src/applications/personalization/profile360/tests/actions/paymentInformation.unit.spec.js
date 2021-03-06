import { expect } from 'chai';
import sinon from 'sinon';

import * as paymentInformationActions from '../../actions/paymentInformation';

let oldFetch;
let oldGA;

const setup = ({ mockGA }) => {
  oldFetch = global.fetch;
  oldGA = global.ga;
  global.fetch = sinon.stub();
  global.fetch.returns(
    Promise.resolve({
      headers: { get: () => 'application/json' },
      ok: true,
      json: () =>
        Promise.resolve({
          data: {
            attributes: {},
          },
        }),
    }),
  );
  if (mockGA) {
    global.ga = sinon.stub();
    global.ga.getAll = sinon.stub();
    global.ga.getAll.returns([
      {
        get: key => {
          const value =
            key === 'clientId' ? '1234567890:0987654321' : undefined;
          return value;
        },
      },
    ]);
  }
};

const teardown = () => {
  global.fetch = oldFetch;
  global.ga = oldGA;
};

describe('actions/paymentInformation', () => {
  describe('when global `ga` is set up correctly', () => {
    beforeEach(() => setup({ mockGA: true }));
    afterEach(teardown);

    it('calls fetch and dispatches FETCH_PAYMENT_INFORMATION_STARTED', async () => {
      const actionCreator = paymentInformationActions.fetchPaymentInformation();
      const dispatch = sinon.spy();

      await actionCreator(dispatch);

      expect(dispatch.called).to.be.true;
      expect(dispatch.firstCall.args[0].type).to.be.equal(
        paymentInformationActions.PAYMENT_INFORMATION_FETCH_STARTED,
      );
      expect(global.fetch.called).to.be.true;
    });

    it('calls fetch and dispatches SAVE_PAYMENT_INFORMATION', async () => {
      const actionCreator = paymentInformationActions.savePaymentInformation({
        data: 'value',
      });
      const dispatch = sinon.spy();

      await actionCreator(dispatch);

      expect(global.fetch.called).to.be.true;
      expect(dispatch.calledTwice).to.be.true;
      expect(dispatch.firstCall.args[0].type).to.be.equal(
        paymentInformationActions.PAYMENT_INFORMATION_SAVE_STARTED,
      );
      expect(dispatch.secondCall.args[0].type).to.be.equal(
        paymentInformationActions.PAYMENT_INFORMATION_SAVE_SUCCEEDED,
      );
    });
  });

  describe('when `ga` is not set up correctly', () => {
    beforeEach(() => setup({ mockGA: false }));
    afterEach(teardown);

    it('calls fetch and dispatches SAVE_PAYMENT_INFORMATION', async () => {
      const actionCreator = paymentInformationActions.savePaymentInformation({
        data: 'value',
      });
      const dispatch = sinon.spy();

      await actionCreator(dispatch);

      expect(global.fetch.called).to.be.true;
      expect(dispatch.calledTwice).to.be.true;
      expect(dispatch.firstCall.args[0].type).to.be.equal(
        paymentInformationActions.PAYMENT_INFORMATION_SAVE_STARTED,
      );
      expect(dispatch.secondCall.args[0].type).to.be.equal(
        paymentInformationActions.PAYMENT_INFORMATION_SAVE_SUCCEEDED,
      );
    });
  });
});
