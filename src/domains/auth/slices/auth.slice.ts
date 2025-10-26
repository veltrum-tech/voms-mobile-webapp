import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";
import type { AuthUser, AuthTokens } from "../modals";

// ===============================
// AUTH STATE INTERFACE
// ===============================
interface AuthState {
  // Authentication tokens
  token: string | null;
  refreshToken: string | null;

  // User profile data
  user: AuthUser | null;
  isAuthenticated: boolean;

  // Authentication status
  isLoading: boolean;
  isInitialized: boolean;

  // Password reset flow
  passwordResetData: {
    email: string;
    token: string;
    step: "email" | "otp" | "password" | "complete";
  };

  // UI state
  showPassword: boolean;
  showConfirmPassword: boolean;
  openSuccessModal: boolean;

  // Session management
  lastActivity: number;
  sessionTimeout: number; // in minutes
}

// ===============================
// INITIAL STATE
// ===============================
const initialState: AuthState = {
  // Tokens
  token: (secureLocalStorage.getItem("access_token") as string) || null,
  refreshToken: (secureLocalStorage.getItem("refresh_token") as string) || null,

  // User data
  user: null,
  isAuthenticated: Boolean(secureLocalStorage.getItem("access_token")),

  // Status
  isLoading: false,
  isInitialized: false,

  // Password reset
  passwordResetData: {
    email: "",
    token: "",
    step: "email",
  },

  // UI state
  showPassword: false,
  showConfirmPassword: false,
  openSuccessModal: false,

  // Session
  lastActivity: Date.now(),
  sessionTimeout: 30, // 30 minutes
};

// ===============================
// AUTH SLICE
// ===============================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ===============================
    // AUTHENTICATION ACTIONS
    // ===============================
    setTokens: (state, action: PayloadAction<AuthTokens>) => {
      state.token = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.isAuthenticated = true;
      state.lastActivity = Date.now();

      // Store in secure local storage
      secureLocalStorage.setItem("access_token", action.payload.access_token);
      secureLocalStorage.setItem("refresh_token", action.payload.refresh_token);
    },

    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.lastActivity = Date.now();
      secureLocalStorage.setItem("access_token", action.payload);
    },

    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },

    setAuthenticationState: (
      state,
      action: PayloadAction<{ user: AuthUser; tokens: AuthTokens }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.tokens.access_token;
      state.refreshToken = action.payload.tokens.refresh_token;
      state.isAuthenticated = true;
      state.isInitialized = true;
      state.lastActivity = Date.now();

      // Store tokens
      secureLocalStorage.setItem(
        "access_token",
        action.payload.tokens.access_token
      );
      secureLocalStorage.setItem(
        "refresh_token",
        action.payload.tokens.refresh_token
      );
    },

    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isInitialized = true;

      // Clear storage
      secureLocalStorage.removeItem("access_token");
      secureLocalStorage.removeItem("refresh_token");

      // Reset password reset state
      state.passwordResetData = {
        email: "",
        token: "",
        step: "email",
      };
    },

    // ===============================
    // LOADING STATES
    // ===============================
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },

    // ===============================
    // PASSWORD RESET FLOW
    // ===============================
    setPasswordResetData: (
      state,
      action: PayloadAction<Partial<AuthState["passwordResetData"]>>
    ) => {
      state.passwordResetData = {
        ...state.passwordResetData,
        ...action.payload,
      };
    },

    nextPasswordResetStep: (state) => {
      const steps: AuthState["passwordResetData"]["step"][] = [
        "email",
        "otp",
        "password",
        "complete",
      ];
      const currentIndex = steps.indexOf(state.passwordResetData.step);
      if (currentIndex < steps.length - 1) {
        state.passwordResetData.step = steps[currentIndex + 1];
      }
    },

    resetPasswordResetFlow: (state) => {
      state.passwordResetData = {
        email: "",
        token: "",
        step: "email",
      };
    },

    // ===============================
    // UI STATE ACTIONS
    // ===============================
    handleTogglePassword: (state) => {
      state.showPassword = !state.showPassword;
    },

    handleToggleConfirmPassword: (state) => {
      state.showConfirmPassword = !state.showConfirmPassword;
    },

    handleToggleSuccessModal: (state) => {
      state.openSuccessModal = !state.openSuccessModal;
    },

    // ===============================
    // SESSION MANAGEMENT
    // ===============================
    updateLastActivity: (state) => {
      state.lastActivity = Date.now();
    },

    setSessionTimeout: (state, action: PayloadAction<number>) => {
      state.sessionTimeout = action.payload;
    },

    checkSessionExpiry: (state) => {
      const now = Date.now();
      const sessionAge = now - state.lastActivity;
      const sessionLimit = state.sessionTimeout * 60 * 1000; // Convert to milliseconds

      if (sessionAge > sessionLimit && state.isAuthenticated) {
        // Session expired, logout
        state.token = null;
        state.refreshToken = null;
        state.user = null;
        state.isAuthenticated = false;

        secureLocalStorage.removeItem("access_token");
        secureLocalStorage.removeItem("refresh_token");
      }
    },

    // ===============================
    // PROFILE UPDATE
    // ===============================
    updateUserProfile: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // Legacy action for backward compatibility
    handlePasswordReset: (
      state,
      action: PayloadAction<{ email: string; token: string }>
    ) => {
      state.passwordResetData.email = action.payload.email;
      state.passwordResetData.token = action.payload.token;
    },
  },
});

// ===============================
// EXPORT ACTIONS
// ===============================
export const {
  // Authentication
  setTokens,
  setToken,
  setUser,
  setAuthenticationState,
  logout,

  // Loading states
  setLoading,
  setInitialized,

  // Password reset
  setPasswordResetData,
  nextPasswordResetStep,
  resetPasswordResetFlow,

  // UI state
  handleTogglePassword,
  handleToggleConfirmPassword,
  handleToggleSuccessModal,

  // Session management
  updateLastActivity,
  setSessionTimeout,
  checkSessionExpiry,

  // Profile
  updateUserProfile,

  // Legacy
  handlePasswordReset,
} = authSlice.actions;

export default authSlice.reducer;
