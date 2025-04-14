/// <reference types="react" />

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { LogFilterParams } from '@/types/logs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import LogTable from '@/components/LogTable';
import LogFilter from '@/components/LogFilter';
import LogPagination from '@/components/LogPagination';
import DeleteLogsButton from '@/components/DeleteLogsButton';
import { LogTable as TableType } from '@/lib/supabase';

interface LogItem {
  id: number;
  level: string;
  message: string;
  created_at: string;
  data?: any;
}

interface LogViewerProps {
  type: "frontend" | "backend";
}

const LogViewer = ({ type }: LogViewerProps) => {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<LogFilterParams>({
    page: 1,
    pageSize: 20,
  });

  const tableType: TableType = type === 'backend' ? 'backend_logs' : 'frontend_logs';
  
  const fetchLogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(tableType)
      .select();
    if (error) {
      console.error("Error fetching logs:", error);
    } else if (data) {
      const sortedData = (data as LogItem[]).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setLogs(sortedData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
    const intervalId = setInterval(fetchLogs, 10000); // Refresh every 10 seconds
    return () => clearInterval(intervalId);
  }, [type]);

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
        <DeleteLogsButton table={tableType} onSuccess={fetchLogs} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Log Viewer</CardTitle>
        </CardHeader>
        <CardContent>
          <LogFilter filters={filters} onFilterChange={handleFilterChange} />
          
          {loading ? (
            <div className="mt-8 p-4">
              Loading logs...
            </div>
          ) : (
            <>
              <LogTable logs={logs} isLoading={loading} />
              
              {logs.length > 0 && (
                <LogPagination
                  currentPage={filters.page}
                  totalItems={logs.length}
                  pageSize={filters.pageSize}
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
