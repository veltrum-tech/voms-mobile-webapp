// ===============================
// USER PROFILE INTERFACES
// ===============================
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: "officer" | "supervisor" | "admin";
  status: "active" | "inactive";
  phone?: string;
  created_at: string;
  updated_at: string;
  lga_id?: string;
}

export interface UserProfile extends User {
  // Extended profile information
  full_name?: string;
  permissions?: string[];
  last_login?: string;
}

// ===============================
// AUTH REQUEST INTERFACES
// ===============================
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
}

// ===============================
// AUTH RESPONSE INTERFACES
// ===============================
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface UserProfileResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
  phone?: string;
  lga_id?: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface VerifyOtpResponse {
  message: string;
  data?: any;
}

export interface ResetPasswordResponse {
  message: string;
  data?: {
    user: User;
  };
}

export interface LogoutResponse {
  message: string;
}

export interface UpdateProfileResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
  phone?: string;
  lga_id?: string;
}

// ===============================
// AUTH STATE INTERFACES
// ===============================
export interface AuthUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  status: string;
  phone?: string;
  lga_id?: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

// Legacy interfaces for backward compatibility
export interface StateUser extends User {
  stateOfficial?: {
    id: number;
    userId: number;
    address: string;
    stateId: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface UserNameId {
  id: string;
  name: string;
}

// Legacy response format
export interface LoginRoot {
  access_token: string;
  refresh_token: string;
}

// ===============================
// INVITATION VALIDATION INTERFACES
// ===============================
export interface ValidateInvitationResponse {
  lga: Lga
}

export interface Lga {
  id: string
  name: string
}

// ===============================
// ONBOARDING INTERFACES
// ===============================
export interface CompleteOnboardingRequest {
  invitation_token: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface CompleteOnboardingResponse {
  user: OnboardedUser;
  token: string
}

export interface OnboardedUser {
  id: string
  email: string
  password_hash: string
  first_name: string
  last_name: string
  phone: string
  role: string
  status: string
  invitation_token: any
  invitation_expires_at: any
  lga_id: string
  signature_url: any
  fcm_token: any
  platform: any
  email_notifications: boolean
  push_notifications: boolean
  notification_types: any
  public_metadata: any
  private_metadata: any
  deleted: boolean
  created_at: string
  updated_at: string
}

///// validate 