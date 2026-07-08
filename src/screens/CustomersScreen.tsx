import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Search, UserPlus } from 'lucide-react';
import { useAppData } from '../state/AppContext';
import { sortCustomersDefault, searchCustomers } from '../domain/customer';
import { Customer } from '../types';
import { CustomerRow } from '../components/customer/CustomerRow';
import { CustomerForm } from '../components/customer/CustomerForm';
import { CustomerDetail } from '../components/customer/CustomerDetail';
import { QuickAddForm } from '../components/customer/QuickAddForm';

interface CustomersScreenProps {
  selectedCustomerId: string | null;
  onSelectCustomer: (id: string | null) => void;
  forceQuickAdd: boolean;
  onConsumeForceQuickAdd: () => void;
}

type AddMode = 'none' | 'quick' | 'full';

export const CustomersScreen: React.FC<CustomersScreenProps> = ({
  selectedCustomerId,
  onSelectCustomer,
  forceQuickAdd,
  onConsumeForceQuickAdd,
}) => {
  const { data, dispatch } = useAppData();
  const [query, setQuery] = useState('');
  const [addMode, setAddMode] = useState<AddMode>('none');
  const [fullDraft, setFullDraft] = useState<Partial<Customer> | undefined>(undefined);

  useEffect(() => {
    if (forceQuickAdd) {
      setAddMode('quick');
      onConsumeForceQuickAdd();
    }
  }, [forceQuickAdd, onConsumeForceQuickAdd]);

  const visibleCustomers = useMemo(() => {
    return sortCustomersDefault(searchCustomers(data.customers, query));
  }, [data.customers, query]);

  const selectedCustomer = selectedCustomerId
    ? data.customers.find((c) => c.id === selectedCustomerId) ?? null
    : null;

  if (selectedCustomer) {
    return (
      <CustomerDetail
        customer={selectedCustomer}
        onBack={() => onSelectCustomer(null)}
        onUpdate={(c) => dispatch({ type: 'UPDATE_CUSTOMER', payload: c })}
        onDelete={(id) => dispatch({ type: 'DELETE_CUSTOMER', payload: { id } })}
        onComplete={(id) => dispatch({ type: 'COMPLETE_ACTION', payload: { id } })}
      />
    );
  }

  if (addMode === 'quick') {
    return (
      <div className="p-4">
        <QuickAddForm
          onSubmit={(c) => {
            dispatch({ type: 'ADD_CUSTOMER', payload: c });
            setAddMode('none');
          }}
          onCancel={() => setAddMode('none')}
          onSwitchToFull={(draft) => {
            setFullDraft(draft);
            setAddMode('full');
          }}
        />
      </div>
    );
  }

  if (addMode === 'full') {
    return (
      <div className="p-4">
        <CustomerForm
          initial={fullDraft}
          onSubmit={(c) => {
            dispatch({ type: 'ADD_CUSTOMER', payload: c });
            setAddMode('none');
            setFullDraft(undefined);
          }}
          onCancel={() => {
            setAddMode('none');
            setFullDraft(undefined);
          }}
        />
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4 pb-24">
      <h1 className="text-[22px] font-semibold text-neutral-900 dark:text-white px-1">Customers</h1>

      <div className="flex items-center gap-2 bg-white dark:bg-neutral-900 rounded-xl px-3.5 py-2.5 border border-neutral-200 dark:border-neutral-700">
        <Search size={17} className="text-neutral-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm tên / số điện thoại"
          className="flex-1 bg-transparent outline-none text-[15px] text-neutral-900 dark:text-white"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        {visibleCustomers.map((c) => (
          <CustomerRow key={c.id} customer={c} onClick={() => onSelectCustomer(c.id)} />
        ))}
        {visibleCustomers.length === 0 && data.customers.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-14 text-center">
            <UserPlus size={32} className="text-neutral-300 dark:text-neutral-700" />
            <p className="text-[14px] text-neutral-400">
              Chưa có khách hàng nào.
              <br />
              Nhấn + để tạo khách hàng đầu tiên.
            </p>
          </div>
        )}
        {visibleCustomers.length === 0 && data.customers.length > 0 && (
          <p className="text-center text-[14px] text-neutral-400 py-8">Không tìm thấy khách hàng phù hợp.</p>
        )}
      </div>

      <button
        onClick={() => setAddMode('quick')}
        className="fixed bottom-20 right-5 w-14 h-14 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center shadow-lg"
        aria-label="Thêm khách hàng"
      >
        <Plus size={26} />
      </button>
    </div>
  );
};
