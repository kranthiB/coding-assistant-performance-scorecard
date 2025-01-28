import { Routes as RouterRoutes, Route, Navigate, useParams } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';

const AssessmentWrapper: React.FC = () => {
  return <Assessment />;
};

const Routes: React.FC = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/assessment/:toolId" element={<AssessmentWrapper />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  );
};

export default Routes;