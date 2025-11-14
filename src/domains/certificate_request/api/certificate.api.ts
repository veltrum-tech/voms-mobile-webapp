import { api } from "../../../redux/services/api";
import type {
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
} from "../models";
import type { GetLGAsResponse, GetStatesResponse, VerifyPaymentResponse } from "../models/api.models";

const certificateApi = api.injectEndpoints({
  endpoints: (build) => ({
    verifyVin: build.mutation<VerifyVinResponse, VerifyVinRequest>({
      query: (body) => ({
        url: '/public-services/migration/verify-vin',
        method: 'POST',
        body,
      }),
      transformResponse: (response: VerifyVinResponse) => response,
    }),
    submitMigrationInfo: build.mutation<SubmitMigrationInfoResponse, { requestId: string; data: SubmitMigrationInfoRequest }>({
      query: ({ requestId, data }) => ({
        url: `/public-services/migration/${requestId}/submit-info`,
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: SubmitMigrationInfoResponse) => response,
    }),
    uploadMigrationCertificate: build.mutation<UploadCertificateResponse, { requestId: string; file: FormData }>({
      query: ({ requestId, file }) => ({
        url: `/public-services/migration/${requestId}/upload-certificate`,
        method: 'POST',
        body: file,
      }),
    }),
    initiateMigrationPayment: build.mutation<InitiatePaymentResponse, { requestId: string; data: InitiatePaymentRequest }>({
      query: ({ requestId, data }) => ({
        url: `/public-services/migration/${requestId}/initiate-payment`,
        method: 'POST',
        body: data,
      }),
    }),
    verifyCertificate: build.mutation<VerifyCertificateResponse, VerifyCertificateRequest>({
      query: (body) => ({
        url: '/public-services/transfer/verify-certificate',
        method: 'POST',
        body,
      }),
    }),
    sendTransferOtp: build.mutation<SendOtpResponse, { requestId: string; data: SendOtpRequest }>({
      query: ({ requestId, data }) => ({
        url: `/public-services/transfer/${requestId}/send-otp`,
        method: 'POST',
        body: data,
      }),
    }),
    verifyTransferOtp: build.mutation<VerifyOtpResponse, { requestId: string; data: VerifyOtpRequest }>({
      query: ({ requestId, data }) => ({
        url: `/public-services/transfer/${requestId}/verify-otp`,
        method: 'POST',
        body: data,
      }),
    }),
    submitTransferInfo: build.mutation<SubmitTransferResponse, { requestId: string; data: SubmitTransferRequest }>({
      query: ({ requestId, data }) => ({
        url: `/public-services/transfer/${requestId}/submit-transfer`,
        method: 'POST',
        body: data,
      }),
    }),
    initiateTransferPayment: build.mutation<InitiatePaymentResponse, { requestId: string; data: InitiatePaymentRequest }>({
      query: ({ requestId, data }) => ({
        url: `/public-services/transfer/${requestId}/initiate-payment`,
        method: 'POST',
        body: data,
      }),
    }),
    getRequestStatus: build.query<GetRequestStatusResponse, string>({
      query: (requestId) => ({
        url: `/public-services/request/${requestId}/status`,
        method: 'GET',
      }),
    }),
    verifyPayment: build.query<VerifyPaymentResponse, string>({
      query: (requestId) => ({
        url: `/public-services/request/${requestId}/verify-payment`,
        method: 'POST',
      }),
    }),
    getStates: build.query<GetStatesResponse, void>({
      query: () => ({
        url: '/lgas/states',
        method: 'GET',
      }),
    }),
    getLGAs: build.query<GetLGAsResponse, string | void>({
      query: (stateId) => ({
        url: stateId ? `/lgas?state=${stateId}` : '/lgas',
        method: 'GET',
      }),
    }),
  }),
});

export const {
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
  
  // Payment verification
  useVerifyPaymentQuery,
  useLazyVerifyPaymentQuery,
  
  // LGA and State endpoints
  useGetStatesQuery,
  useGetLGAsQuery,
  useLazyGetLGAsQuery,
} = certificateApi;