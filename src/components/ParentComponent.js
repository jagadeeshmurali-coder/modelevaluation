import React, { useState } from 'react';
import EvaluationForm from './EvaluationForm';

const ParentComponent = () => {
  const [metrics, setMetrics] = useState({
    clarity: false,
    relevance: false,
    responsiveness: false,
    engagement: false,
    errorRate: false,
    coherence: false,
  });

  return (
    <div>
      <EvaluationForm metrics={metrics} setMetrics={setMetrics} />
    </div>
  );
};

export default ParentComponent;
