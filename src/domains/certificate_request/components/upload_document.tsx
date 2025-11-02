import { useNavigate } from "react-router-dom";
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

export default function UploadDocument() {
  const initialValues: DocumentUpload = {
    supportingDocument: null as unknown as File,
  };

  const navigate = useNavigate();

  const handleGoBack = () =>
    navigate("/app/certificate-request/addtional-information");

  const handleSubmit = (values: DocumentUpload) => {
    toast.success("Document uploaded successfully!");
    console.log("Uploaded file:", values.supportingDocument);
    navigate("/app/certificate-request/information-summary");
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
                  disabled={isSubmitting}
                  className="w-full md:w-xl rounded-sm"
                >
                  {isSubmitting ? "Uploading..." : "Continue"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
}
