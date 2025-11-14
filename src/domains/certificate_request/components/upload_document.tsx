import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  FileUpload,
  TypographyH5,
  TypographySmall,
} from "../../../shared/components";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "sonner";
import { Formik, Form } from "formik";
import {
  documentUploadSchema,
  type DocumentUpload,
} from "../../../shared/utils";
import { useUploadMigrationCertificateMutation } from "../api";

export default function UploadDocument() {
  const location = useLocation();
  const { requestId, vin, vehicleInfo, additionalInfo, submissionResponse } = location.state || {};

  const [uploadCertificate, { isLoading: isUploading }] = useUploadMigrationCertificateMutation();

  console.log("Upload Document - Request ID:", requestId);
  console.log("Upload Document - Location State:", location.state);
  console.log("Upload Document - Submission Response:", submissionResponse);

  const initialValues: DocumentUpload = {
    supportingDocument: null as unknown as File,
  };

  const navigate = useNavigate();

  const handleGoBack = () =>
    navigate("/app/certificate-request/addtional-information");

  const handleSubmit = async (values: DocumentUpload) => {
    if (!requestId) {
      toast.error("Request ID not found. Please start from the beginning.");
      navigate("/app/certificate-request/enter-vin");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('certificate', values.supportingDocument);

      const result = await uploadCertificate({
        requestId,
        file: formData,
      }).unwrap();

      if (result.success) {
        toast.success("Document uploaded successfully!");
        console.log("Upload result:", result);
        navigate("/app/certificate-request/information-summary", {
          state: {
            requestId,
            vin,
            vehicleInfo,
            additionalInfo,
            uploadedFile: result.data?.file_url
          }
        });
      } else {
        toast.error(result.message || "Failed to upload document");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error?.data?.message || "Failed to upload document. Please try again.");
    }
  };

  return (
    <main className="max-w-[720px] mx-auto">
      {/* Back Button */}
      <div className="">
        <Button
          onClick={handleGoBack}
          variant="icon"
          className="text-white flex items-center gap-2"
        >
          <IoIosArrowBack size={25} />
          <span className="text-lg">Back</span>
        </Button>
      </div>

      <section className="flex bg-white h-screen px-4 pb-20 md:pb-0">
        <Formik
          initialValues={initialValues}
          validationSchema={documentUploadSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col">
              {/* Top content */}
              <div>
                {/* Header */}
                <div className="space-y-6sm:flex items-center gap-3 mt-6 mb-3">
                  <div className="bg-[#8D8989] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                    5
                  </div>
                  <TypographyH5 className="text-lg md:text-xl font-semibold text-gray-900">
                    UPLOAD SUPPORTING DOCUMENT
                  </TypographyH5>
                </div>

                <TypographySmall className="text-gray-600 text-sm mb-8">
                  Please upload your supporting document or capture it using
                  your device's camera.
                </TypographySmall>

                {/* File Upload */}
                <FileUpload
                  onFileSelected={(file) =>
                    setFieldValue("supportingDocument", file)
                  }
                  allowedFormats={["jpg", "jpeg", "png"]}
                />

                {/* Error Message */}
                {errors.supportingDocument && touched.supportingDocument && (
                  <TypographySmall className="text-red-500 mb-4">
                    {typeof errors.supportingDocument === "string"
                      ? errors.supportingDocument
                      : JSON.stringify(errors.supportingDocument)}
                  </TypographySmall>
                )}
              </div>

              {/* Continue button */}
              <div className="fixed bottom-0 left-0 w-full px-4 py-3 bg-white md:relative md:mb-6 md:px-0 md:py-0">
                <Button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="w-full md:w-xl rounded-sm"
                >
                  {isSubmitting || isUploading ? "Uploading..." : "Continue"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
}
