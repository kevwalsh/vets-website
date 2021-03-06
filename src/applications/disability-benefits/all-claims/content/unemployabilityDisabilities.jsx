import React from 'react';
import AdditionalInfo from '@department-of-veterans-affairs/formation-react/AdditionalInfo';

import { recordEventOnce } from 'platform/monitoring/record-event';

const helpClicked = () =>
  recordEventOnce({
    event: 'disability-526EZ--form-help-text-clicked',
    'help-text-label':
      'Disability - Form 526EZ - What is substantially gainful employment',
  });

export const disabilitiesDescription = (
  <div>
    <h5>Rated, service-connected, and new disabilities</h5>
    <p>
      Individual unemployability is awarded based on service-connected
      disabilities.
    </p>
    <p>
      Below are the rated, service-connected disabilities, and new disabilities
      you’re claiming. Please choose the disability or disabilities that prevent
      you from getting and keeping a steady job (substantially gainful
      employment).
    </p>
    <AdditionalInfo
      triggerText="What’s substantially gainful employment?"
      onClick={helpClicked}
    >
      <p>Substantially gainful employment means:</p>
      <ul>
        <li>
          You’re employed in a competitive marketplace or job that isn’t in a
          protected environment, such as a family business or sheltered
          workshop.
        </li>
        <li>
          Your annual earnings are higher than the poverty threshold for one
          person.
        </li>
      </ul>
    </AdditionalInfo>
  </div>
);

export const helpDescription = (
  <div>
    <p>
      <strong>Please note:</strong> If you expect to see something that isn’t
      included in this list or if you have other questions about your claim,
      contact: 877-222-VETS (877-222-8387), Monday – Friday, 8:00 a.m. – 8:00
      p.m. ET.
    </p>
  </div>
);
