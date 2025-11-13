/**
 * Certificate Request Models
 * 
 * Centralized export for all certificate request TypeScript types and interfaces.
 * 
 * @example
 * ```typescript
 * import type { Certificate, Batches, ApproveCertificateRequest } from '@/domains/certificate_request/models';
 * ```
 */

export type {
  // Batch interfaces
  BatchUploadRootResponse,
  BatchesRoot,
  Batches,
  BatchByIdRoot,
  UpdateBatchStatusRequest,
  UpdateBatchStatusResponse,
  DeleteBatchResponse,

  // Certificate interfaces
  CertificatesRoot,
  Certificate,
  GetCertificateResponse,
  UpdateCertificateRequest,
  UpdateCertificateResponse,
  ApproveCertificateRequest,
  ApproveCertificateResponse,
  RejectCertificateRequest,
  RejectCertificateResponse,
  BulkCertificateRequest,
  BulkCertificateResponse,
  DeleteCertificateResponse,
  CertificateStatsResponse,
  ExportCertificatesRequest,
  ExportCertificatesResponse,
  DownloadCertificateResponse,
} from "./models";

// Public Services API Models
export type {
  // Migration endpoints
  VerifyVinRequest,
  VerifyVinResponse,
  SubmitMigrationInfoRequest,
  SubmitMigrationInfoResponse,
  UploadCertificateResponse,
  InitiatePaymentRequest,
  InitiatePaymentResponse,
  
  // Transfer (Change of Ownership) endpoints
  VerifyCertificateRequest,
  VerifyCertificateResponse,
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  SubmitTransferRequest,
  SubmitTransferResponse,
  
  // Request status
  GetRequestStatusResponse,
  
  // Common types
  RequestType,
  RequestStatus,
  PaymentStatus,
  OtpMethod,
} from "./api.models";
