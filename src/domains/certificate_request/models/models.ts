// ===============================
// BATCH INTERFACES
// ===============================

// Response structure for batch upload
export interface BatchUploadRootResponse {
  id: string;
  name: string;
  total_records: number;
  processed_records: number;
  status: string;
  created_at: string;
}

// Response structure for fetching all batches
export interface BatchesRoot {
  batches: Batches[];
  total: number;
  page: number;
  limit: number;
}

export interface Batches {
  id: string;
  name: string;
  status: string;
  total_records: number;
  processed_records: number;
  approved_records: number;
  rejected_records: number;
  pending_records: number;
  created_at: string;
  updated_at: string;
}

// Response structure for batch detail
export interface BatchByIdRoot {
  id: string;
  name: string;
  status: string;
  total_records: number;
  processed_records: number;
  approved_records: number;
  rejected_records: number;
  pending_records: number;
  created_at: string;
  updated_at: string;
}

// Request for updating batch status
export interface UpdateBatchStatusRequest {
  status: string; // "processing" | "completed" | "failed"
}

// Response for updating batch status
export interface UpdateBatchStatusResponse {
  id: string;
  name: string;
  status: string;
  updated_at: string;
}

// Response for deleting batch
export interface DeleteBatchResponse {
  message: string;
  success: boolean;
}

// ===============================
// CERTIFICATE INTERFACES
// ===============================

// Response structure for certificates in a batch
export interface CertificatesRoot {
  certificates: Certificate[];
  total: number;
  page: number;
  limit: number;
}

export interface Certificate {
  plateNo: string
  state: string
  vehicleMake: string
  vehicleType: string
  chassisNo: string
  purpose: string
  nameOfOwner: string
  address: string
  specVin: string
  issuedOn: string
  lga: string
  model: string
  modelYear: number
  colour: string
  engineNumber: string
  title: string
  telephoneNo: string
  email: string
  qrCode: string
  supervisorSignature: string
  certificateNumber: string
  id: string
  type: string
  status: string
  batch_name: string
  processed_by_name: string
  created_at: string
  updated_at: string
}

// Response for getting a single certificate
export interface GetCertificateResponse {
  certificate: Certificate;
}

// Request for updating certificate
export interface UpdateCertificateRequest {
  plateNo: string
  state: string
  vehicleMake: string
  vehicleType: string
  chassisNo: string
  purpose: string
  nameOfOwner: string
  address: string
  specVin: string
  issuedOn: string
  lga: string
  model: string
  colour: string
  engineNumber: string
  title: string
  telephoneNo: string
  email: string
  qrCode: string
  certificateNumber: string
  id: string
  type: string
  status: string
  batch_name: string
  processed_by_name: string
  created_at: string
  updated_at: string
}

// Response for updating certificate
export interface UpdateCertificateResponse {
  certificate: Certificate;
  message: string;
}

// Request for approving certificate
export interface ApproveCertificateRequest {
  certificate_number?: string;
  notes?: string;
}

// Response for approving certificate
export interface ApproveCertificateResponse {
  certificate: Certificate;
  message: string;
  success: boolean;
}

// Request for rejecting certificate
export interface RejectCertificateRequest {
  reason: string;
  notes?: string;
}

// Response for rejecting certificate
export interface RejectCertificateResponse {
  certificate: Certificate;
  message: string;
  success: boolean;
}

// Request for bulk operations
export interface BulkCertificateRequest {
  certificate_ids: string[];
  reason?: string; // For bulk reject
  notes?: string;
}

// Response for bulk operations
export interface BulkCertificateResponse {
  successful: string[];
  failed: string[];
  message: string;
  success: boolean;
}

// Response for deleting certificate
export interface DeleteCertificateResponse {
  message: string;
  success: boolean;
}

// Response for certificate statistics
export interface CertificateStatsResponse {
  total_certificates: number;
  approved_count: number;
  rejected_count: number;
  pending_count: number;
  processing_count: number;
  total_batches: number;
  recent_approvals: number; // Last 7 days
  recent_rejections: number; // Last 7 days
}

// Request for exporting certificates
export interface ExportCertificatesRequest {
  batch_id?: string;
  status?: string;
  format?: "csv" | "excel" | "pdf";
  start_date?: string;
  end_date?: string;
}

// Response for exporting certificates
export interface ExportCertificatesResponse {
  file_url: string;
  file_name: string;
  file_size: number;
  format: string;
  expires_at: string;
}

// Response for downloading certificate
export interface DownloadCertificateResponse {
  file_url: string;
  file_name: string;
  certificate_number: string;
}
