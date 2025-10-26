import * as Yup from "yup";

import { MAX_FILE_SIZE, SUPPORTED_FORMATS } from "./constants";

// === VIN Validation Schema === //
export const vinValidationSchema = Yup.object().shape({
  vin: Yup.string()
    .trim()
    .matches(
      /^[A-HJ-NPR-Z0-9]+$/,
      "VIN must contain only letters and numbers (no I, O, or Q)"
    )
    .length(17, "VIN must be exactly 17 characters")
    .required("VIN is required"),
});

// == Additional Info Schema === //
export const additionalInfoSchema = Yup.object().shape({
  state: Yup.string().required("State is required"),
  lga: Yup.string().required("LGA is required"),
  certificateNo: Yup.string()
    .trim()
    .required("Certificate number is required"),
  issuedDate: Yup.date()
    .required("Issued date is required")
    .typeError("Invalid date"),
  plateNo: Yup.string().trim().required("Plate number is required"),
  purpose: Yup.string().trim().required("Purpose is required"),
  ownerName: Yup.string().trim().required("Owner name is required"),
  ownerAddress: Yup.string().trim().required("Owner address is required"),
  model: Yup.string().trim().required("Model is required"),
  engineNo: Yup.string().trim().required("Engine number is required"),
  chassisNo: Yup.string().trim().required("Chassis number is required"),
  title: Yup.string().trim().required("Title is required"),
  phone: Yup.string()
    .matches(
      /^[0-9]{10,15}$/,
      "Phone number must be between 10 and 15 digits"
    )
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

//=== certificate validation schema ===//
export const certificateValidationSchema =Yup.object().shape({
  certificateNo: Yup.string()
    .trim()
    .required("Certificate number is required"),
});

// === Document Upload Schema === //
export const documentUploadSchema = Yup.object().shape({
  supportingDocument: Yup.mixed<File>()
    .required("Document is required")
    .test(
      "fileSize",
      `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
      (file) => file && file.size <= MAX_FILE_SIZE
    )
    .test("fileType", "Unsupported file format. Only JPG, PNG or PDF allowed.", (file) => {
      if (!file) return false;
      const ext = file.name.split(".").pop()?.toLowerCase();
      return ext ? SUPPORTED_FORMATS.includes(ext) : false;
    }),
});

// == Next-Owner Info Schema === //
export const nextOwnerInfoSchema = Yup.object().shape({
  ownerName: Yup.string().trim().required("Owner name is required"),
  ownerAddress: Yup.string().trim().required("Owner address is required"),
  phone: Yup.string()
    .matches(
      /^[0-9]{10,15}$/,
      "Phone number must be between 10 and 15 digits"
    )
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const updateLocationSchema = Yup.object().shape({
  currentLocation: Yup.string().required("Current location is required"),
  currentEmployer: Yup.string().required("Current employer is required"),
  state: Yup.string().required("State is required"),
  employer: Yup.string().required("Employer is required"),
  supportingDocument: Yup.mixed<File>()
    .required("Supporting document is required")
    .test("fileSize", "Document too large, 1MB allowed", (value) => {
      return value && value.size <= MAX_FILE_SIZE;
    }),
});


// LOCATION UPDATE (UPDATE LOCATION)
export type UpdateLocation = Yup.InferType<typeof updateLocationSchema>;

// VIN VALIDATION
export type VinValidation = Yup.InferType<typeof vinValidationSchema>;

// ADDITIONAL INFORMATION
export type AdditionalInfo = Yup.InferType<typeof additionalInfoSchema>;

//DOCUMENT UPLOAD
export type DocumentUpload = Yup.InferType<typeof documentUploadSchema>;

// CERTIFICATE VALIDATION
export type CertificateValidation = Yup.InferType<
  typeof certificateValidationSchema
>;

// NEXT-OWNER INFORMATION
export type NextOwnerInfo = Yup.InferType<typeof nextOwnerInfoSchema>;

