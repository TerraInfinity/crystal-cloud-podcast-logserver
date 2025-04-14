
import { LogLevel } from '@/types/logs';
import { Badge } from '@/components/ui/badge';
import { AlertOctagon, AlertTriangle, Info, Bug } from 'lucide-react';

interface LogLevelBadgeProps {
  level: LogLevel;
}

const LogLevelBadge = ({ level }: LogLevelBadgeProps) => {
  const getVariant = () => {
    switch (level) {
      case 'error':
        return 'destructive';
      case 'warn':
        return 'warning';
      case 'info':
        return 'info';
      case 'debug':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getIcon = () => {
    switch (level) {
      case 'error':
        return <AlertOctagon className="h-3 w-3 mr-1" />;
      case 'warn':
        return <AlertTriangle className="h-3 w-3 mr-1" />;
      case 'info':
        return <Info className="h-3 w-3 mr-1" />;
      case 'debug':
        return <Bug className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Badge variant={getVariant() as any} className="gap-1 font-mono uppercase">
      {getIcon()}
      {level}
    </Badge>
  );
};

export default LogLevelBadge;
