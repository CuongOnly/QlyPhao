import React from 'react';

const ErrorPage = ({ errorMessage }) => {
  return (
    <div>
      <h1>Error</h1>
      <p>{errorMessage}</p>
    </div>
  );
}

export default ErrorPage;
