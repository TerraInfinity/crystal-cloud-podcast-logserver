
import MainLayout from "@/layouts/MainLayout";
import LogViewer from "./LogViewer";

const BackendLog = () => {
  return (
    <MainLayout>
      <LogViewer type="backend" />
    </MainLayout>
  );
};

export default BackendLog;
