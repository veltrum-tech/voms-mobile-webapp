// ============================================
// MIGRATION ENDPOINTS MODELS
// ============================================

// Verify VIN Request/Response
export interface VerifyVinRequest {
  vin: string;
}

export interface VerifyVinResponse {
  success: boolean;
  message: string;
  data?: {
    vin: string;
    isValid: boolean;
    vehicleInfo?: {
      make?: string;
      model?: string;
      year?: string;
    };
  };
}

// Submit Migration Info Request/Response
export interface SubmitMigrationInfoRequest {
  request_id: string;
  state: string;
  lga_id: string;
  certificate_number: string;
  issue_date: string;
  plate_number: string;
  purpose: string;
  owner_name: string;
  owner_address: string;
  engine_number: string;
  title: string;
  telephone: string;
  email: string;
}

export interface SubmitMigrationInfoResponse {
  success: boolean;
  message: string;
  data?: {
    request_id: string;
    status: string;
  };
}

// Upload Certificate Request/Response
export interface UploadCertificateResponse {
  success: boolean;
  message: string;
  data?: {
    file_url: string;
    request_id: string;
  };
}

// Initiate Payment Request/Response
export interface InitiatePaymentRequest {
  request_id: string;
  amount: number;
}

export interface InitiatePaymentResponse {
  success: boolean;
  message: string;
  data?: {
    payment_url: string;
    reference: string;
    amount: number;
  };
}

// ============================================
// TRANSFER (CHANGE OF OWNERSHIP) ENDPOINTS MODELS
// ============================================

// Verify Certificate Request/Response
export interface VerifyCertificateRequest {
  certificate_number: string;
}

export interface VerifyCertificateResponse {
  success: boolean;
  message: string;
  data?: {
    certificate_number: string;
    isValid: boolean;
    vehicleInfo?: {
      make?: string;
      model?: string;
      year?: string;
      owner_name?: string;
      plate_number?: string;
    };
  };
}

// Send OTP Request/Response
export interface SendOtpRequest {
  request_id: string;
  method: 'email' | 'sms';
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
  data?: {
    otp_sent: boolean;
    method: string;
  };
}

// Verify OTP Request/Response
export interface VerifyOtpRequest {
  request_id: string;
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data?: {
    verified: boolean;
  };
}

// Submit Transfer Request/Response
export interface SubmitTransferRequest {
  request_id: string;
  new_owner_name: string;
  new_owner_address: string;
  new_owner_phone: string;
  new_owner_email: string;
  new_plate_number?: string;
}

export interface SubmitTransferResponse {
  success: boolean;
  message: string;
  data?: {
    request_id: string;
    status: string;
  };
}

// ============================================
// REQUEST STATUS ENDPOINT MODEL
// ============================================

export interface GetRequestStatusResponse {
  success: boolean;
  message: string;
  data?: {
    request_id: string;
    type: 'migration' | 'transfer';
    status: 'pending' | 'processing' | 'approved' | 'rejected' | 'completed';
    created_at: string;
    updated_at: string;
    payment_status?: 'pending' | 'paid' | 'failed';
    certificate_url?: string;
  };
}

// ============================================
// COMMON TYPES
// ============================================

export type RequestType = 'migration' | 'transfer';
export type RequestStatus = 'pending' | 'processing' | 'approved' | 'rejected' | 'completed';
export type PaymentStatus = 'pending' | 'paid' | 'failed';
export type OtpMethod = 'email' | 'sms';
