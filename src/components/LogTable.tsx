
import { useState } from 'react';
import { LogEntry } from '@/types/logs';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import LogLevelBadge from './LogLevelBadge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface LogTableProps {
  logs: LogEntry[];
  isLoading: boolean;
}

const LogTable = ({ logs, isLoading }: LogTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isLoading) {
    return (
      <div className="w-full my-8">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Card key={index} className="p-4 animate-pulse-opacity">
              <div className="flex justify-between">
                <div className="w-1/4 h-6 bg-secondary rounded" />
                <div className="w-1/6 h-6 bg-secondary rounded" />
                <div className="w-1/3 h-6 bg-secondary rounded" />
                <div className="w-8 h-6 bg-secondary rounded" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="w-full my-8 text-center">
        <Card className="p-8">
          <p className="text-muted-foreground">No logs found</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Timestamp</TableHead>
            <TableHead className="w-[100px]">Level</TableHead>
            <TableHead>Message</TableHead>
            <TableHead className="w-[80px] text-right">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow
              key={log.id}
              className={cn(
                "cursor-pointer transition-all",
                `log-level-${log.level}`,
                expandedRows[log.id] ? "bg-secondary/50" : ""
              )}
            >
              <TableCell 
                onClick={() => toggleRow(log.id)}
                className="font-mono text-xs"
              >
                {format(new Date(log.created_at), 'yyyy-MM-dd HH:mm:ss.SSS')}
              </TableCell>
              <TableCell onClick={() => toggleRow(log.id)}>
                <LogLevelBadge level={log.level} />
              </TableCell>
              <TableCell 
                onClick={() => toggleRow(log.id)}
                className="max-w-md truncate"
              >
                {log.message}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleRow(log.id)}
                  disabled={!log.data}
                >
                  {expandedRows[log.id] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
              {expandedRows[log.id] && log.data && (
                <TableRow>
                  <TableCell colSpan={4} className="bg-secondary/30 p-4">
                    <div className="rounded bg-card p-4">
                      <pre className="text-xs overflow-auto font-mono whitespace-pre-wrap">
                        {JSON.stringify(log.data, null, 2)}
                      </pre>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LogTable;
