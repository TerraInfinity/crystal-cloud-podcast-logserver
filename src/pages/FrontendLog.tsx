
import MainLayout from "@/layouts/MainLayout";
import LogViewer from "./LogViewer";

const FrontendLog = () => {
  return (
    <MainLayout>
      <LogViewer type="frontend" />
    </MainLayout>
  );
};

export default FrontendLog;
