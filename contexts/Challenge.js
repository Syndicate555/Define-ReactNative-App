import React from 'react';

const ChallengeContext = React.createContext({
  id: null,
  name: null,
  description: null,
  startDate: null,
  showStartDate: true,
  endDate: null,
  showEndDate: true,
  tags: null,
  showTags: true,
  logoUrl: null,
  type: null,
  showProgressBar: null,
  showProgressCircle: null,
  totalTasks: null,
  tasksDone: null
});

export default ChallengeContext;
