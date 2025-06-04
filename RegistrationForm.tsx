import React from 'react';

// This component is deprecated as the registration feature has been removed from the application.
// Content has been updated to resolve errors and prevent usage.
const DeprecatedRegistrationForm: React.FC = () => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Attempted to render DeprecatedRegistrationForm (RegistrationForm.tsx at root). This feature has been removed.');
  }
  return null;
};

export default DeprecatedRegistrationForm;