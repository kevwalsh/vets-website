import React from 'react';
import MessageTemplate from '../MessageTemplate';

const DeactivatedMHVId = () => {
  const content = {
    heading: 'Please contact us to reactivate your account',
    alertContent: (
      <>
        <p>
          We’re sorry. Your My HealtheVet account isn’t active at this time. To
          use our online health tools, you’ll need to call us to reactivate your
          account.
        </p>
      </>
    ),
    alertStatus: 'error',
    body: (
      <>
        <h5>What you can do</h5>
        <p>
          Call My HealtheVet help desk or submit an online request for help.
        </p>
        <ul className="usa-accordion">
          <li>
            <button
              className="usa-accordion-button"
              aria-expanded="false"
              aria-controls="a1"
            >
              Call the My HealtheVet help desk
            </button>
            <div id="a1" className="usa-accordion-content">
              <p>
                Call us at <a href="tel:877-327-0022">877-327-0022</a>. We’re
                here Monday through Friday, 8:00 a.m. to 8:00 p.m. ET. If you
                have hearing loss, call TTY: 800-877-3399.
              </p>
              <p>
                Tell the representative that you tried to sign in to use health
                tools on VA.gov, but received an error message telling you that
                your My HealtheVet account isn’t active.
              </p>
            </div>
          </li>
          <li>
            <button
              className="usa-accordion-button"
              aria-expanded="false"
              aria-controls="a2"
            >
              Submit an online help request to My HealtheVet
            </button>
            <div id="a2" className="usa-accordion-content">
              <p>
                Use the My HealtheVet contact form to submit a request for help
                online.
              </p>
              <p>
                <strong>Fill in the form fields as below:</strong>
              </p>
              <ul>
                <li>
                  <strong>Topic:</strong> Select <strong>Account Login</strong>.
                </li>
                <li>
                  <strong>Category:</strong> Select{' '}
                  <strong>Request for Assistance</strong>.
                </li>
                <li>
                  <strong>Comments:</strong> Type, or copy and paste, in the
                  message below:
                  <p>
                    “When I tried to sign in to use health tools on VA.gov, I
                    received an error message telling me that my My HealtheVet
                    account isn’t active.”
                  </p>
                </li>
              </ul>
              <a href="https://www.myhealth.va.gov/mhv-portal-web/contact-us">
                Go to the My HealtheVet contact form
              </a>
            </div>
          </li>
        </ul>
      </>
    ),
  };

  return <MessageTemplate content={content} />;
};

export default DeactivatedMHVId;