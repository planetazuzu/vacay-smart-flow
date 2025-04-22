
import React from 'react';
import { cn } from '@/lib/utils';
import { RequestStatus } from '@/types/models';

interface StatusBadgeProps {
  status: RequestStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusLabels = {
    [RequestStatus.PENDING]: 'Pendiente',
    [RequestStatus.APPROVED]: 'Aprobado',
    [RequestStatus.REJECTED]: 'Rechazado',
    [RequestStatus.MORE_INFO]: 'Más información',
  };
  
  return (
    <span className={cn(
      'vacay-badge',
      status === RequestStatus.PENDING && 'vacay-badge-pending',
      status === RequestStatus.APPROVED && 'vacay-badge-approved',
      status === RequestStatus.REJECTED && 'vacay-badge-rejected',
      status === RequestStatus.MORE_INFO && 'vacay-badge-warning',
      className
    )}>
      {statusLabels[status]}
    </span>
  );
};
