
import React from 'react';
import { RequestType } from '@/types/models';
import { Calendar, FileText, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RequestTypeIconProps {
  type: RequestType;
  className?: string;
  size?: number;
}

export const RequestTypeIcon = ({ 
  type, 
  className,
  size = 16
}: RequestTypeIconProps) => {
  switch (type) {
    case RequestType.VACATION:
      return <Calendar className={cn("text-vacay-600", className)} size={size} />;
    case RequestType.PERSONAL_DAY:
      return <Clock className={cn("text-status-warning", className)} size={size} />;
    case RequestType.LEAVE:
      return <FileText className={cn("text-status-approved", className)} size={size} />;
    default:
      return null;
  }
};
