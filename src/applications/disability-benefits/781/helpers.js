import React from 'react';
import AdditionalInfo from '@department-of-veterans-affairs/formation/AdditionalInfo';

export const ptsdNameTitle = () => (
  <legend className="schemaform-block-title schemaform-title-underline">
    PTSD
  </legend>
);

export const UploadPtsdDescription = ({ formType }) => (
  <div>
    <p>
      The following questions will help us understand more about your
      [PTSDclassification]-related PTSD. None of the questions we‘ll ask you are
      required, but any information you provide here will help us research your
      claim.
    </p>
    <p>
      If you have already completed a Claim for Service Connection for
      Post-Traumatic Stress Disorder (VA Form 21-0
      {formType}
      ), you can upload it here instead of answering the questions about your
      PTSD.
    </p>
    <p>How would you like to provide information about your PTSD?</p>
  </div>
);

export const PtsdChoiceDescription = ({ formType }) => (
  <AdditionalInfo triggerText="What does this mean?">
    <h5>Continue answering questions</h5>
    <p>
      If you choose to answer questions, we‘ll ask you several questions to
      learn more about your PTSD.
    </p>
    <h5>
      Upload VA Form 21-0
      {formType}
    </h5>
    <p>
      If you upload a completed VA Form 21-0
      {formType}, we won‘t ask you questions about your PTSD, and you‘ll move to
      the next section of the disability application.
    </p>
  </AdditionalInfo>
);

export const documentDescription = () => (
  <div>
    <p>
      You can upload your document in a pdf, .jpeg, or .png file format. You’ll
      first need to scan a copy of your document onto your computer or mobile
      phone. You can then upload the document from there. Please note that large
      files can take longer to upload with a slow Internet connection.
      Guidelines for uploading a file:
    </p>
    <ul>
      <li>File types you can upload: .pdf, .jpeg, or .png</li>
      <li>Maximum file size: 50 MB</li>
    </ul>
    <p>
      <em>
        Large files can be more difficult to upload with a slow Internet
        connection
      </em>
    </p>
  </div>
);
