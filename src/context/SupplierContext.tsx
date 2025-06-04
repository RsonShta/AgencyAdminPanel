import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

export type Supplier = {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  agencyIds?: string[];
};

type SupplierContextType = {
  suppliers: Supplier[];
  setSuppliers: React.Dispatch<React.SetStateAction<Supplier[]>>;
  selectedSupplierIds: number[];
  toggleSelectSupplier: (id: number) => void;
  clearSelectedSuppliers: () => void;
  bulkUpdateStatus: (status: 'Active' | 'Inactive') => void;
  addSupplier: (newSupplier: Omit<Supplier, 'id'>) => void;
};

const SupplierContext = createContext<SupplierContextType | undefined>(undefined);

export const useSupplierContext = () => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error('useSupplierContext must be used within a SupplierProvider');
  }
  return context;
};

export const SupplierProvider = ({ children }: { children: ReactNode }) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: 1,
      name: 'Yeti Airlines',
      email: 'contact@yeti.com',
      status: 'Active',
      agencyIds: ['1'],
    },
    {
      id: 2,
      name: 'Tara Air',
      email: 'info@taraair.com',
      status: 'Inactive',
      agencyIds: ['2'],
    },
    {
      id: 3,
      name: 'Buddha Air',
      email: 'support@buddhaair.com',
      status: 'Active',
      agencyIds: [],
    },
  ]);

  const [selectedSupplierIds, setSelectedSupplierIds] = useState<number[]>([]);

  const toggleSelectSupplier = (id: number) => {
    setSelectedSupplierIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const clearSelectedSuppliers = () => {
    setSelectedSupplierIds([]);
  };

  const bulkUpdateStatus = (status: 'Active' | 'Inactive') => {
    setSuppliers((prev) =>
      prev.map((supplier) =>
        selectedSupplierIds.includes(supplier.id)
          ? { ...supplier, status }
          : supplier
      )
    );
    clearSelectedSuppliers();
    console.log(`Suppliers ${status === 'Active' ? 'activated' : 'deactivated'}.`);
  };

  const addSupplier = (newSupplier: Omit<Supplier, 'id'>) => {
    const newId =
      suppliers.length > 0 ? Math.max(...suppliers.map((s) => s.id)) + 1 : 1;
    const supplierToAdd: Supplier = { ...newSupplier, id: newId };
    setSuppliers((prev) => [...prev, supplierToAdd]);
    console.log('Supplier added:', supplierToAdd);
  };

  return (
    <SupplierContext.Provider
      value={{
        suppliers,
        setSuppliers,
        selectedSupplierIds,
        toggleSelectSupplier,
        clearSelectedSuppliers,
        bulkUpdateStatus,
        addSupplier,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};
