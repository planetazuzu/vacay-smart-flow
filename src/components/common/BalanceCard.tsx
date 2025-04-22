
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface BalanceCardProps {
  title: string;
  value: number;
  total?: number;
  icon: React.ReactNode;
  variant?: 'default' | 'outline' | 'primary' | 'warning' | 'success';
  className?: string;
}

export const BalanceCard = ({
  title,
  value,
  total,
  icon,
  variant = 'default',
  className,
}: BalanceCardProps) => {
  return (
    <Card className={cn(
      "vacay-balance-card",
      variant === 'primary' && "border-vacay-500 bg-vacay-50",
      variant === 'warning' && "border-status-warning bg-status-warning/10",
      variant === 'success' && "border-status-approved bg-status-approved/10",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="vacay-balance-card-title">{title}</h3>
          <div className="flex items-end gap-1">
            <p className="vacay-balance-card-value">{value}</p>
            {total !== undefined && (
              <p className="text-sm text-muted-foreground mb-1">/ {total}</p>
            )}
          </div>
        </div>
        <div className={cn(
          "p-2 rounded-full",
          variant === 'primary' && "bg-vacay-100 text-vacay-700",
          variant === 'warning' && "bg-status-warning/20 text-status-warning",
          variant === 'success' && "bg-status-approved/20 text-status-approved",
          variant === 'default' && "bg-secondary text-secondary-foreground"
        )}>
          {icon}
        </div>
      </div>
    </Card>
  );
};
