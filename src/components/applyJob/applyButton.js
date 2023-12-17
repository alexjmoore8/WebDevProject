import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApplyButton = ({ jobId, job }) => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate('/job/apply', { state: { jobId, job } });
  };

  return (
    <div>
      <button className="apply-button" onClick={handleApplyClick}>
        Apply
      </button>
    </div>
  );
};

export default ApplyButton;
