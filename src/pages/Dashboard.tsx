
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/models';
import WorkerDashboard from './WorkerDashboard';
import HRDashboard from './HRDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  
  if (user?.role === UserRole.HR_MANAGER) {
    return <HRDashboard />;
  }
  
  return <WorkerDashboard />;
};

export default Dashboard;
