import { useNavigate } from "react-router-dom";
import { Button, FieldInput, TypographyH5, TypographySmall } from "../../../shared/components";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "sonner";
import { Formik, Form } from "formik";
import { vinValidationSchema, type VinValidation } from "../../../shared/utils";
import { useVerifyVinMutation } from "../api";

export default function EnterVin() {
  const navigate = useNavigate();
  const [verifyVin, { isLoading }] = useVerifyVinMutation();

  const handleGoBack = () => {
    navigate("/select-option");
  };

  const handleSubmit = async (values: VinValidation) => {
    try {
      console.log("Submitting VIN:", values.vin);
      const result = await verifyVin({ vin: values.vin }).unwrap();

      console.log("API Response:", result);

      // Handle different response structures
      if (result?.success || result?.data) {
        toast.success("VIN validated successfully!");
        navigate("/app/certificate-request/vin-information", {
          state: {
            vin: values.vin,
            vehicleInfo: result.data?.vehicleInfo || result.data,
            fullResponse: result
          }
        });
      } else {
        toast.error(result?.message || "VIN validation failed");
      }
    } catch (error: any) {
      console.error("VIN verification error:", error);
      console.error("Error details:", {
        status: error?.status,
        data: error?.data,
        message: error?.message
      });

      // Show more specific error messages
      if (error?.status === 404) {
        toast.error("VIN not found in the system");
      } else if (error?.status === 400) {
        toast.error(error?.data?.message || "Invalid VIN format");
      } else if (error?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else if (error?.status === 'FETCH_ERROR' || !navigator.onLine) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error(error?.data?.message || "Failed to verify VIN. Please try again.");
      }

      // For development: Allow proceeding even if API fails (comment this out in production)
      // Uncomment the lines below to test without backend
      /*
      console.log("Proceeding with mock data for testing...");
      toast.info("Using test data (API unavailable)");
      navigate("/app/certificate-request/vin-information", {
        state: {
          vin: values.vin,
          vehicleInfo: {
            make: "Toyota",
            model: "Camry",
            year: "2020"
          }
        }
      });
      */
    }
  };

  return (
    <main className="max-w-[720px] mx-auto h-full">
      {/* Back Button */}
      <div className="">
        <Button
          onClick={handleGoBack}
          variant={"icon"}
          className="text-white flex items-center gap-2"
        >
          <IoIosArrowBack size={25} />
          <span className="text-lg">Back</span>
        </Button>
      </div>

      <section className="flex bg-white p-4 h-full flex-col min-h-full justify-between">
        <Formik
          initialValues={{ vin: "" }}
          validationSchema={vinValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col min-h-auto justify-between">
              <div>
                <div className="flex items-center gap-3 mt-6 mb-3">
                  <div className="bg-[#8D8989] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <TypographyH5 className="text-lg md:text-xl font-semibold text-gray-900">
                    ENTER VIN
                  </TypographyH5>
                </div>

                <TypographySmall className="text-gray-600 text-sm mb-8">
                  Please provide your Vehicle Identification Number (VIN)
                </TypographySmall>

                <div className="mb-6">
                  <FieldInput
                    id="vin"
                    type="text"
                    className='rounded-none'
                    name="vin"
                    placeholder="Enter Vehicle Identification Number (VIN)"

                  />
                </div>
              </div>
              <div className="flex">
                <Button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="text-white w-full md:w-xl rounded-sm transition"
                >
                  {isSubmitting || isLoading ? "Validating..." : "Validate VIN"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
}
