import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async () => {
    setErrors(null);
    try {
      const response = await axios[method](url, body);
      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oooops....</h4>
          {err.response.data.errors.map((error) => (
            <li key={error.message}>{error.message}</li>
          ))}
        </div>
      );
    }
  };

  return { doRequest, errors };
};
