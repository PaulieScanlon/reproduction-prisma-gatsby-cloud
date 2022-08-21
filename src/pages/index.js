import React, { useState } from 'react';

const Page = () => {
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const addDate = async () => {
    setSubmitting(true);
    try {
      const response = await (
        await fetch('/api/add-date', {
          method: 'POST',
          body: JSON.stringify({
            date: new Date()
          })
        })
      ).json();

      setSubmitting(false);
      setResponse(response);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h1>src/pages/index.js</h1>
      <p>Response</p>
      <div style={{ height: 120, border: '1px solid gray' }}>
        {submitting ? <div>Loading...</div> : <pre>{JSON.stringify(response, null, 2)}</pre>}
      </div>
      <button onClick={addDate}>Add Date</button>
      <p>Error</p>
      <pre style={{ height: 40, border: '1px solid gray' }}>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
};

export default Page;
