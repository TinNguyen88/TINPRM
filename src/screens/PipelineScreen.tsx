import React from 'react';
import { useAppData } from '../state/AppContext';
import { PIPELINE_STATUSES, ALL_STATUSES, CustomerStatus } from '../types';
import { CustomerRow } from '../components/customer/CustomerRow';
import { CustomerDetail } from '../components/customer/CustomerDetail';
import { Select } from '../components/ui/Select';

interface PipelineScreenProps {
  selectedCustomerId: string | null;
  onSelectCustomer: (id: string | null) => void;
}

export const PipelineScreen: React.FC<PipelineScreenProps> = ({ selectedCustomerId, onSelectCustomer }) => {
  const { data, dispatch } = useAppData();

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

  return (
    <div className="p-4 flex flex-col gap-5 pb-10">
      <h1 className="text-[22px] font-semibold text-neutral-900 dark:text-white px-1">Pipeline</h1>

      {PIPELINE_STATUSES.map((status) => {
        const customersInStatus = data.customers.filter((c) => c.status === status);
        return (
          <div key={status} className="flex flex-col gap-2.5">
            <span className="text-[13px] font-medium text-neutral-400 uppercase tracking-wide px-1">
              {status} ({customersInStatus.length})
            </span>
            {customersInStatus.map((c) => (
              <div key={c.id} className="flex items-center gap-2">
                <div className="flex-1">
                  <CustomerRow customer={c} onClick={() => onSelectCustomer(c.id)} />
                </div>
                <Select
                  value={c.status}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_CUSTOMER',
                      payload: { ...c, status: e.target.value as CustomerStatus },
                    })
                  }
                  options={ALL_STATUSES.map((s) => ({ value: s, label: s }))}
                  className="w-28 !py-2 !text-[13px]"
                />
              </div>
            ))}
            {customersInStatus.length === 0 && (
              <p className="text-[13px] text-neutral-400 px-1">Không có khách hàng.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};
