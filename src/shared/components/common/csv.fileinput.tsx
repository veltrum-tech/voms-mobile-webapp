import { useRef, useState, type ChangeEvent, type DragEvent, type ClipboardEvent } from "react";
import { ImCancelCircle } from "react-icons/im";

interface SpreadsheetFileInputProps {
  onFileSelected: (file: File | null) => void;
}

export const SpreadsheetFileInput = ({ onFileSelected }: SpreadsheetFileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const allowedFormats = ["xls", "xlsx", "csv"];

  const validateFile = (file: File) => {
    const fileType = file.name.split(".").pop()?.toLowerCase();
    if (fileType && allowedFormats.includes(fileType)) {
      setFileName(file.name);
      setError(null);
      onFileSelected(file);
    } else {
      setFileName(null);
      setError("Please upload only Excel (.xls, .xlsx) or CSV files.");
      onFileSelected(null);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => setIsDragActive(false);

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    if (e.clipboardData.files && e.clipboardData.files[0]) {
      validateFile(e.clipboardData.files[0]);
    }
  };

  const handleCancel = () => {
    setFileName(null);
    setError(null);
    onFileSelected(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full text-center">
      <div
        className={`cursor-pointer border border-dashed rounded-lg p-6 transition ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-400 bg-gray-50 hover:bg-gray-100"
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onPaste={handlePaste}
      >
        <p className="text-gray-600">
          <span className="text-blue-600 font-medium">Click here</span>, drag & drop, or paste Excel/CSV file
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Allowed formats: .xls, .xlsx, .csv
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".xls,.xlsx,.csv"
        onChange={handleChange}
      />

      {fileName && (
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-600">
            Selected file: <span className="font-medium">{fileName}</span>
          </p>
          <button
            onClick={handleCancel}
            className="text-red-500 text-sm hover:bg-red-50 p-2 font-medium"
          >
          <ImCancelCircle />
          </button>
        </div>
      )}

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};
