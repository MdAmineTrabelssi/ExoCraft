import { useMemo, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import ContentWorkspace from "../components/ContentWorkspace";
import { CLASS_OPTIONS, SECTION_OPTIONS, useAuth } from "../context/AuthContext";

export default function Archives() {
  const { user } = useAuth();
  const groups = useMemo(() => user?.associations?.length ? user.associations : CLASS_OPTIONS.flatMap((className) => SECTION_OPTIONS.map((section) => ({ className, section }))), [user]);
  const [selectedGroup, setSelectedGroup] = useState("all");
  return <DashboardLayout activePage="archives" groups={groups} selectedGroup={selectedGroup} onSelectGroup={setSelectedGroup}><ContentWorkspace archived groups={groups} selectedGroup={selectedGroup} /></DashboardLayout>;
}
