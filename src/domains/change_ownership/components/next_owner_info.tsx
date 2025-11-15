import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  FieldInput,
  TypographyH5,
  TypographySmall,
} from "../../../shared/components";
import { IoIosArrowBack } from "react-icons/io";
import { Formik, Form } from "formik";
import { toast } from "sonner";
import {
  nextOwnerInfoSchema,
  type NextOwnerInfo,
} from "../../../shared/utils";
import { useSubmitTransferInfoMutation } from "../../certificate_request/api";

export default function NextOwnerInformation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { certificateNo, vehicleInfo, currentOwner, requestId } = location.state || {};

  const [submitTransferInfo, { isLoading }] = useSubmitTransferInfoMutation();

  console.log("Next Owner Info - Request ID:", requestId);
  console.log("Next Owner Info - Location State:", location.state);

  const handleGoBack = () =>
    navigate("/app/change-ownership/vehicle-information");

  const handleSubmit = async (values: NextOwnerInfo) => {
    if (!requestId) {
      toast.error("Request ID not found. Please start from the beginning.");
      navigate("/app/change-ownership/enter-cert-no");
      return;
    }

    try {
      const result = await submitTransferInfo({
        requestId,
        data: {
          request_id: requestId,
          new_owner_name: values.ownerName,
          new_owner_address: values.ownerAddress,
          new_owner_phone: values.phone,
          new_owner_email: values.email,
        },
      }).unwrap();

      console.log("Transfer submission result:", result);

      if (result.success) {
        toast.success(result.message || "Transfer information submitted successfully!");
        navigate("/app/change-ownership/review-information", {
          state: {
            certificateNo,
            vehicleInfo,
            currentOwner,
            requestId,
            nextOwnerInfo: values,
            transferResponse: result,
          },
        });
      } else {
        toast.error(result.message || "Failed to submit transfer information");
      }
    } catch (error: any) {
      console.error("Transfer submission error:", error);
      const errorMessage = error?.data?.message || error?.message || "Failed to submit transfer information. Please try again.";
      toast.error(errorMessage);
    }
  };

  const initialValues: NextOwnerInfo = {
    ownerName: "",
    ownerAddress: "",
    phone: "",
    email: "",
  };

  return (
    <main className="max-w-[720px] mx-auto h-full">
      {/* Back Button */}
      <div className=" ">
        <Button
          onClick={handleGoBack}
          variant={"icon"}
          className="text-white flex items-center gap-2"
        >
          <IoIosArrowBack size={25} />
          <span className="text-lg">Back</span>
        </Button>
      </div>

      <section className="flex bg-white p-4 flex-col min-h-full justify-between">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={nextOwnerInfoSchema}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col min-h-full justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mt-6 mb-3">
                  <div className="bg-[#8D8989] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <TypographyH5 className="text-lg md:text-xl font-semibold text-gray-900">
                    NEXT OWNER INFORMATION
                  </TypographyH5>
                </div>

                <TypographySmall className="text-gray-600 text-sm mb-8">
                  Please provide the following information about the person or
                  organization that this vehicle is being sold or transferred
                  to.
                </TypographySmall>

                {/* Inputs Grid */}
                <div className="flex flex-col gap-6">
                  {/* Text Inputs */}
                  <div className="flex flex-col gap-4">
                    <FieldInput
                      className="rounded-none"
                      name="ownerName"
                      placeholder="Enter Name of Owner"
                    />
                    <FieldInput
                      className="rounded-none"
                      name="ownerAddress"
                      placeholder="Enter Owner Address"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <FieldInput
                      className="rounded-none"
                      name="phone"
                      placeholder="Enter Telephone No."
                    />
                    <FieldInput
                      className="rounded-none"
                      name="email"
                      placeholder="Enter Email"
                      type="email"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex mt-10">
                <Button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full mb-4 md:w-xl rounded-sm "
                >
                  {isSubmitting || isLoading ? "Submitting..." : "Continue"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
}
