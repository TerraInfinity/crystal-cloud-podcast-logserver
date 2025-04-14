
import { supabase, LogTable } from '@/lib/supabase';
import { LogEntry, LogFilterParams, LogResponse } from '@/types/logs';

export const fetchLogs = async (
  table: LogTable,
  params: LogFilterParams = {}
): Promise<LogResponse> => {
  const {
    page = 1,
    pageSize = 20,
    level = '',
    search = '',
    startDate = '',
    endDate = '',
  } = params;

  const offset = (page - 1) * pageSize;

  let query = supabase
    .from(table)
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  // Apply filters
  if (level) {
    query = query.eq('level', level);
  }

  if (search) {
    query = query.ilike('message', `%${search}%`);
  }

  if (startDate) {
    query = query.gte('created_at', startDate);
  }

  if (endDate) {
    query = query.lte('created_at', endDate);
  }

  // Apply pagination
  query = query.range(offset, offset + pageSize - 1);

  const { data: logs, count, error } = await query;

  if (error) {
    console.error('Error fetching logs:', error);
    throw new Error(`Failed to fetch logs: ${error.message}`);
  }

  return {
    logs: logs as LogEntry[],
    count: count || 0,
    page,
    pageSize,
    hasMore: (count || 0) > offset + pageSize,
  };
};

export const insertLog = async (
  table: LogTable,
  log: Omit<LogEntry, 'id' | 'created_at'>
) => {
  const { data, error } = await supabase.from(table).insert(log).select('*');

  if (error) {
    console.error('Error inserting log:', error);
    throw new Error(`Failed to insert log: ${error.message}`);
  }

  return data[0] as LogEntry;
};
