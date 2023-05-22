'use client'; // Error components must be Client components


import { Boundary } from '#/components/util/Boundary';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Boundary labels={['Admin page Error UI']} color="pink">
      <h2>{JSON.stringify(error) || "No status"}</h2>
      <h2>{error.message || "Something went wrong!"}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
	  <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => {}
        }
      >
        Go back
      </button>
	</Boundary>
  );
}
