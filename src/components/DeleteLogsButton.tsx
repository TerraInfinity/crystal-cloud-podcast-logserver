
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { deleteAllLogs } from '@/services/logService';
import { LogTable } from '@/lib/supabase';

interface DeleteLogsButtonProps {
  table: LogTable;
  onSuccess: () => void;
}

const DeleteLogsButton = ({ table, onSuccess }: DeleteLogsButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteAllLogs(table);
      toast.success('All logs have been deleted successfully');
      onSuccess(); // Refresh the logs list after deletion
    } catch (error) {
      toast.error(`Failed to delete logs: ${(error as Error).message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" className="ml-auto">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete All Logs
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all logs from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? 'Deleting...' : 'Delete All'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteLogsButton;
