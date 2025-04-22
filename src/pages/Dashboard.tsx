
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/models';
import { Chat } from '@/components/chat/Chat';
import WorkerDashboard from './WorkerDashboard';
import HRDashboard from './HRDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <>
      {user?.role === UserRole.HR_MANAGER ? <HRDashboard /> : <WorkerDashboard />}
      <Chat />
    </>
  );
};

export default Dashboard;
