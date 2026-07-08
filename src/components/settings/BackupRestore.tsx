import React, { useRef, useState } from 'react';
import { AppData } from '../../types';
import { Button } from '../ui/Button';
import { exportAppDataAsJSON, parseImportedJSON, downloadJSONFile, createDefaultAppData } from '../../state/storage';

interface BackupRestoreProps {
  data: AppData;
  onImport: (data: AppData) => void;
  onReset: (data: AppData) => void;
}

export const BackupRestore: React.FC<BackupRestoreProps> = ({ data, onImport, onReset }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExport = () => {
    const json = exportAppDataAsJSON(data);
    const filename = `tinprm-backup-${data.settings.goalStartDate}.json`;
    downloadJSONFile(filename, json);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result ?? '');
        const parsed = parseImportedJSON(text);
        if (confirm('Import sẽ THAY THẾ toàn bộ dữ liệu hiện tại. Tiếp tục?')) {
          onImport(parsed);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Import thất bại.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    if (confirm('Xóa TOÀN BỘ dữ liệu (khách hàng + goal)? Hành động này không thể hoàn tác.')) {
      onReset(createDefaultAppData());
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={handleExport}>
          Export JSON
        </Button>
        <Button variant="secondary" className="flex-1" onClick={() => fileInputRef.current?.click()}>
          Import JSON
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleImportFile}
        />
      </div>

      {error && <span className="text-[13px] text-red-600">{error}</span>}

      <Button variant="danger" onClick={handleReset}>
        Reset toàn bộ dữ liệu
      </Button>
    </div>
  );
};
