/**
 * Certificate API Exports
 * 
 * Centralized export for all certificate API hooks and endpoints.
 */

export {
  // Migration endpoints
  useVerifyVinMutation,
  useSubmitMigrationInfoMutation,
  useUploadMigrationCertificateMutation,
  useInitiateMigrationPaymentMutation,
  
  // Transfer endpoints
  useVerifyCertificateMutation,
  useSendTransferOtpMutation,
  useVerifyTransferOtpMutation,
  useSubmitTransferInfoMutation,
  useInitiateTransferPaymentMutation,
  
  // Request status
  useGetRequestStatusQuery,
  useLazyGetRequestStatusQuery,
} from './certificate.api';
