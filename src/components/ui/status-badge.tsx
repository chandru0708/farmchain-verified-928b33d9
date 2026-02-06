import { cn } from "@/lib/utils";
import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";

interface StatusBadgeProps {
  status: 'fresh' | 'near-expiry' | 'expired' | 'verified' | 'pending';
  className?: string;
  showIcon?: boolean;
}

export function StatusBadge({ status, className, showIcon = true }: StatusBadgeProps) {
  const config = {
    fresh: {
      label: 'Fresh',
      icon: CheckCircle,
      className: 'bg-fresh/10 text-fresh border-fresh/20',
    },
    'near-expiry': {
      label: 'Near Expiry',
      icon: AlertTriangle,
      className: 'bg-warning/10 text-warning border-warning/20',
    },
    expired: {
      label: 'Expired',
      icon: XCircle,
      className: 'bg-expired/10 text-expired border-expired/20',
    },
    verified: {
      label: 'Verified',
      icon: CheckCircle,
      className: 'bg-primary/10 text-primary border-primary/20',
    },
    pending: {
      label: 'Pending',
      icon: Clock,
      className: 'bg-muted text-muted-foreground border-border',
    },
  };

  const { label, icon: Icon, className: statusClassName } = config[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border",
        statusClassName,
        className
      )}
    >
      {showIcon && <Icon className="h-3.5 w-3.5" />}
      {label}
    </span>
  );
}