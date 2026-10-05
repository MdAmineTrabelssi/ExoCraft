import { useMemo, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import ContentWorkspace from "../components/ContentWorkspace";
import { CLASS_OPTIONS, SECTION_OPTIONS, useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const groups = useMemo(() => user?.associations?.length ? user.associations : CLASS_OPTIONS.flatMap((className) => SECTION_OPTIONS.map((section) => ({ className, section }))), [user]);
  const [selectedGroup, setSelectedGroup] = useState(() => groups[0] || "all");
  const safeGroup = selectedGroup === "all" || groups.some((item) => item.className === selectedGroup?.className && item.section === selectedGroup?.section) ? selectedGroup : groups[0];
  return <DashboardLayout activePage="dashboard" groups={groups} selectedGroup={safeGroup} onSelectGroup={setSelectedGroup}>
    <ContentWorkspace groups={groups} selectedGroup={safeGroup} />
  </DashboardLayout>;
}
