
export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export interface LogEntry {
  id: string;
  created_at: string;
  level: LogLevel;
  message: string;
  data?: Record<string, any> | null;
}

export interface LogResponse {
  logs: LogEntry[];
  count: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface LogFilterParams {
  page?: number;
  pageSize?: number;
  level?: LogLevel | '';
  search?: string;
  startDate?: string;
  endDate?: string;
}
