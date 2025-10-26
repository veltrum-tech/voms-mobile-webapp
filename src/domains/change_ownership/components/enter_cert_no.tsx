import { useNavigate } from "react-router-dom";
import { Button, FieldInput, TypographyH5, TypographySmall } from "../../../shared/components";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "sonner";
import { Formik, Form } from "formik";
import { certificateValidationSchema, type CertificateValidation } from "../../../shared/utils";

export default function EnterCertNo() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/select-option");
  };

  const handleSubmit = (values: CertificateValidation) => {
    toast.success("VIN validated successfully!");
    console.log("Submitted VIN:", values.certificateNo);
    navigate("/app/change-ownership/vehicle-information");
  };

  return (
    <>
      {/* Back Button */}
      <div className="fixed top-10 -left-4">
        <Button
          onClick={handleGoBack}
          variant={"icon"}
          className="text-white flex items-center gap-2"
        >
          <IoIosArrowBack size={25} />
          <span className="text-lg">Back</span>
        </Button>
      </div>

      <section className="flex flex-col min-h-full justify-between">
        <Formik
          initialValues={{  certificateNo: "" }}
          validationSchema={certificateValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col min-h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mt-6 mb-3">
                  <div className="bg-[#8D8989] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <TypographyH5 className="text-lg md:text-xl font-semibold text-gray-900">
                   ENTER CERTIFICATE NO.
                  </TypographyH5>
                </div>

                <TypographySmall className="text-gray-600 text-sm mb-8">
                  Please provide your VOMS Proof of Ownership Certificate Number.
                </TypographySmall>

                <div className="mb-6">
                  <FieldInput
                    id="certificateNo"
                    type="text"
                    name="certificateNo"
                    placeholder="Enter Certificate Number"

                  />
                </div>
              </div>
              <div className="flex">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white w-full md:w-xl rounded-sm transition"
                >
                  {isSubmitting ? "Validating..." : "Validate Certificate No."}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
}
