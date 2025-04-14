
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLogs } from '@/services/logService';
import { LogFilterParams } from '@/types/logs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import LogTable from '@/components/LogTable';
import LogFilter from '@/components/LogFilter';
import LogPagination from '@/components/LogPagination';
import DeleteLogsButton from '@/components/DeleteLogsButton';
import { LogTable as TableType } from '@/lib/supabase';

interface LogViewerProps {
  type: 'frontend' | 'backend';
}

const LogViewer = ({ type }: LogViewerProps) => {
  const [filters, setFilters] = useState<LogFilterParams>({
    page: 1,
    pageSize: 20,
  });

  const tableType: TableType = type === 'backend' ? 'backend_logs' : 'frontend_logs';
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['logs', tableType, filters],
    queryFn: () => fetchLogs(tableType, filters),
  });

  const handleFilterChange = (newFilters: LogFilterParams) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {type === 'backend' ? 'Backend' : 'Frontend'} Logs
          </h1>
          <p className="text-muted-foreground">
            View and analyze {type === 'backend' ? 'backend' : 'frontend'} application logs
          </p>
        </div>
        <DeleteLogsButton table={tableType} onSuccess={refetch} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Log Viewer</CardTitle>
        </CardHeader>
        <CardContent>
          <LogFilter filters={filters} onFilterChange={handleFilterChange} />
          
          {error ? (
            <div className="mt-8 p-4 bg-destructive/10 text-destructive rounded-md">
              Error loading logs: {(error as Error).message}
            </div>
          ) : (
            <>
              <LogTable logs={data?.logs || []} isLoading={isLoading} />
              
              {data && (
                <LogPagination
                  currentPage={data.page}
                  totalItems={data.count}
                  pageSize={data.pageSize}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LogViewer;
