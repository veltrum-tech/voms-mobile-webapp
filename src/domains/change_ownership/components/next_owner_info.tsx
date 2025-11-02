import { useNavigate } from "react-router-dom";
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

export default function NextOwnerInformation() {
  const navigate = useNavigate();

  const handleGoBack = () =>
    navigate("/app/change-ownership/vehicle-information");

  const handleSubmit = (values: NextOwnerInfo) => {
    toast.success("Information saved successfully!");
    console.log("Submitted Values:", values);
    navigate("/app/change-ownership/review-information");
  };

  const initialValues: NextOwnerInfo = {
    ownerName: "",
    ownerAddress: "",
    phone: "",
    email: "",
  };

  return (
    <main className="max-w-[720px] mx-auto">
      {/* Back Button */}
      <div className=" fixed top-10 -left-4">
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
                  disabled={isSubmitting}
                  className="w-full mb-4 md:w-xl rounded-sm "
                >
                  {isSubmitting ? "Saving..." : "Continue"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
}
