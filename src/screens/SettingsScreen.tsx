import React from 'react';
import { useAppData } from '../state/AppContext';
import { GoalSettings } from '../components/settings/GoalSettings';
import { BackupRestore } from '../components/settings/BackupRestore';
import { Card } from '../components/ui/Card';

export const SettingsScreen: React.FC = () => {
  const { data, dispatch } = useAppData();

  return (
    <div className="p-4 flex flex-col gap-5 pb-10">
      <h1 className="text-[22px] font-semibold text-neutral-900 dark:text-white px-1">Settings</h1>

      <Card>
        <GoalSettings
          settings={data.settings}
          onSave={(settings) => dispatch({ type: 'UPDATE_SETTINGS', payload: settings })}
        />
      </Card>

      <Card>
        <BackupRestore
          data={data}
          onImport={(imported) => dispatch({ type: 'IMPORT_DATA', payload: imported })}
          onReset={(fresh) => dispatch({ type: 'RESET_DATA', payload: fresh })}
        />
      </Card>
    </div>
  );
};
