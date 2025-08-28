import React, { createContext, useContext, useState, ReactNode } from "react";

type Agency = {
  id: number;
  name: string;
  code: string;
  status: "active" | "inactive";
};

type AgencyContextType = {
  agencies: Agency[];
  addAgency: (agency: Omit<Agency, "id">) => void;
  updateStatus: (id: number, status: "active" | "inactive") => void;
  deleteAgency: (id: number) => void;
  selectedAgencyIds: number[];
  setSelectedAgencyIds: (ids: number[]) => void;
  bulkUpdateStatus: (status: "active" | "inactive") => void;
};

const AgencyContext = createContext<AgencyContextType | undefined>(undefined);

const initialAgencies: Agency[] = [
  { id: 1, name: "Central Agency", code: "CAA", status: "active" },
  { id: 2, name: "National Support", code: "NSA", status: "inactive" },
  { id: 3, name: "Regional Force", code: "RFA", status: "active" },
];

export const AgencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [agencies, setAgencies] = useState<Agency[]>(initialAgencies);
  const [selectedAgencyIds, setSelectedAgencyIds] = useState<number[]>([]);

  const addAgency = (agency: Omit<Agency, "id">) => {
    const newAgency: Agency = {
      ...agency,
      id: agencies.length ? Math.max(...agencies.map((a) => a.id)) + 1 : 1,
    };
    setAgencies((prev) => [...prev, newAgency]);
  };

  const updateStatus = (id: number, status: "active" | "inactive") => {
    setAgencies((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const deleteAgency = (id: number) => {
    setAgencies((prev) => prev.filter((a) => a.id !== id));
    setSelectedAgencyIds((prev) => prev.filter((i) => i !== id));
  };

  const bulkUpdateStatus = (status: "active" | "inactive") => {
    setAgencies((prev) =>
      prev.map((a) => (selectedAgencyIds.includes(a.id) ? { ...a, status } : a))
    );
  };

  return (
    <AgencyContext.Provider
      value={{
        agencies,
        addAgency,
        updateStatus,
        deleteAgency,
        selectedAgencyIds,
        setSelectedAgencyIds,
        bulkUpdateStatus,
      }}
    >
      {children}
    </AgencyContext.Provider>
  );
};

export const useAgencyContext = () => {
  const context = useContext(AgencyContext);
  if (!context) {
    throw new Error("useAgencyContext must be used within an AgencyProvider");
  }
  return context;
};
