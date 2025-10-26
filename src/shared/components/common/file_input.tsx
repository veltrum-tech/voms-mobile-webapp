// import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
// import { TypographyP, TypographySmall } from './typography';
// import { SUPPORTED_FORMATS } from '../../utils';
// import { Icon } from '../../../assets/icons/icons';
// import { cn } from '../../../lib/utils';

// interface FilePickerProps {
//   onFileSelected: (file: File) => void;
//   allowedFormats?: string[];
//   enableCapture?: boolean; // new prop to enable capture
// }

// interface FilePickerState {
//   rejectedFile: null | File;
//   acceptedFile: null | File;
//   error: null | string;
//   isDragActive: boolean;
// }

// const FileInput = ({
//   onFileSelected,
//   allowedFormats = SUPPORTED_FORMATS,
//   enableCapture = false,
// }: FilePickerProps) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const captureInputRef = useRef<HTMLInputElement>(null);

//   const [state, setState] = useState<FilePickerState>({
//     isDragActive: false,
//     rejectedFile: null,
//     acceptedFile: null,
//     error: null,
//   });

//   const handleDrag = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setState((prev) => ({ ...prev, isDragActive: true }));
//     } else if (e.type === 'dragleave') {
//       setState((prev) => ({ ...prev, isDragActive: false }));
//     }
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setState((prev) => ({ ...prev, isDragActive: false }));
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFiles(e.dataTransfer.files);
//     }
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     setState((prev) => ({ ...prev, error: null }));
//     if (e.target.files && e.target.files[0]) {
//       handleFiles(e.target.files);
//     }
//   };

//   const handleFiles = (files: FileList) => {
//     const file = files[0];
//     const fileType = file.name.split('.').pop()?.toLowerCase();

//     if (fileType && allowedFormats.includes(fileType)) {
//       onFileSelected(file);
//       setState((prev) => ({ ...prev, error: null, acceptedFile: file }));
//     } else {
//       setState((prev) => ({
//         ...prev,
//         error:
//           'Invalid file format. Please upload a file in one of the allowed formats.',
//         rejectedFile: file,
//       }));
//     }
//   };

//   const openFileDialog = () => {
//     fileInputRef.current?.click();
//     setState((prev) => ({ ...prev, error: null, acceptedFile: null }));
//   };

//   const openCaptureDialog = () => {
//     captureInputRef.current?.click();
//   };

//   return (
//     <div className="w-full">
//       <div
//         className={cn(
//           'w-full cursor-pointer rounded-xl border border-dashed bg-secondary-200 p-6 text-center transition-colors',
//           { 'border-primary': state.isDragActive },
//           { 'border-input hover:border-gray-400': !state.isDragActive }
//         )}
//         onDragEnter={handleDrag}
//         onDragLeave={handleDrag}
//         onDragOver={handleDrag}
//         onDrop={handleDrop}
//         onClick={openFileDialog}
//       >
//         <div className="mb-4">
//           <Icon name="document-upload" className="mx-auto mb-2.5" />
//           <TypographyP>
//             <span className="text-primary">Click here</span> to upload file
//           </TypographyP>
//         </div>

//         <TypographyP className="mt-1 text-sm text-secondary-500">
//           Allowed format - {allowedFormats.join(', ').toUpperCase()}
//         </TypographyP>

//         <input
//           ref={fileInputRef}
//           type="file"
//           className="hidden"
//           onChange={handleChange}
//           accept={allowedFormats.map((format) => `.${format}`).join(',')}
//         />

//         {enableCapture && (
//           <input
//             ref={captureInputRef}
//             type="file"
//             className="hidden"
//             accept="image/*"
//             capture="environment" // use 'user' for front camera if needed
//             onChange={handleChange}
//           />
//         )}
//       </div>

//       {enableCapture && (
//         <button
//           type="button"
//           onClick={openCaptureDialog}
//           className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-white"
//         >
//           Capture Image
//         </button>
//       )}

//       {state.acceptedFile && (
//         <TypographySmall className="mb-2 mt-4">{state.acceptedFile.name}</TypographySmall>
//       )}

//       {state.error && (
//         <TypographySmall className="mb-2 mt-4 block text-accent-6">{state.error}</TypographySmall>
//       )}
//     </div>
//   );
// };

// export { FileInput };




import { useState, useRef, type ChangeEvent } from "react"
import { Upload, Camera } from "lucide-react"
import { Button } from "./button"

interface FileUploadProps {
  onFileSelected: (file: File) => void
  allowedFormats?: string[]
}

export function FileUpload({ onFileSelected, allowedFormats = ["jpg", "jpeg", "png", "pdf"] }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const captureInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setError(null)
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    const fileType = file.name.split(".").pop()?.toLowerCase()

    if (fileType && allowedFormats.includes(fileType)) {
      setSelectedFile(file)
      onFileSelected(file)
      setError(null)
    } else {
      setError(`Invalid file format. Please upload a file in one of the allowed formats: ${allowedFormats.join(", ")}`)
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const openCaptureDialog = () => {
    captureInputRef.current?.click()
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6">
        {/* Browse Section */}
        <div className="flex-1 w-full">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors bg-white"
            onClick={openFileDialog}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <Button
                type="button"
                className="bg-[#C2185B] hover:bg-[#A01548] text-white px-4 py-2 rounded"
                onClick={(e) => {
                  e.stopPropagation()
                  openFileDialog()
                }}
              >
                Browse
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Files supported: {allowedFormats.map((f) => `.${f}`).join(", ")}
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={allowedFormats.map((format) => `.${format}`).join(",")}
          />
        </div>

        {/* OR Divider */}
        <div className="text-gray-500 ml-3 font-medium">OR</div>

        {/* Capture Section */}
        <div className="flex-1 w-full flex justify-center">
          <button type="button" onClick={openCaptureDialog} className="flex flex-col items-center gap-2 p-4">
            <div className="w-16 h-16 bg-[#C2185B] rounded-full flex items-center justify-center hover:bg-[#A01548] transition-colors">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm text-gray-700 font-medium">Capture Document</span>
          </button>
          <input
            ref={captureInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Selected File Display */}
      {selectedFile && <p className="text-sm text-gray-600 mb-2">Selected: {selectedFile.name}</p>}

      {/* Error Message */}
      {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
    </div>
  )
}
