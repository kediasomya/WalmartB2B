import React, { useRef, useState } from "react";
import Papa from "papaparse";
import { useToast } from './ToastContext';

export default function InventoryUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setParsedData(results.data as any[]);
        setError(null);
      },
      error: (err) => setError(err.message),
    });
  }

  function handleUpload() {
    showToast("Inventory uploaded! (Mock, no backend yet)");
    setParsedData([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="my-8">
      <h3 className="text-lg font-semibold mb-2">Upload Inventory (CSV)</h3>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="mb-4"
      />
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {parsedData.length > 0 && (
        <>
          <div className="overflow-x-auto mb-2">
            <table className="min-w-full bg-white rounded shadow text-sm">
              <thead>
                <tr>
                  {Object.keys(parsedData[0]).map((key) => (
                    <th key={key} className="px-2 py-1 text-left">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsedData.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => (
                      <td key={j} className="px-2 py-1">{val as string}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleUpload}>
            Upload to Inventory
          </button>
        </>
      )}
    </div>
  );
} 