import { useNavigate } from "react-router-dom";
import {
  Button,
  TypographyH5,
  TypographySmall,
} from "../../../shared/components";
import { IoIosArrowBack } from "react-icons/io";
import { Formik, Form } from "formik";
import { toast } from "sonner";
import { additionalInfoSchema, type AdditionalInfo } from "../../../shared/utils";

// Form values interface for handling string dates
interface AdditionalInfoForm extends Omit<AdditionalInfo, 'issuedDate'> {
  issuedDate: string;
}

export default function AdditionalInformation() {
  const navigate = useNavigate();

  const handleGoBack = () =>
    navigate("/app/certificate-request/vin-information");

  const handleSubmit = (values: AdditionalInfoForm) => {
    try {
      // Convert date string to Date object if needed
      const submissionValues: AdditionalInfo = {
        ...values,
        issuedDate: new Date(values.issuedDate)
      };

      toast.success("Information saved successfully!");
      console.log("Submitted Values:", submissionValues);
      navigate("/app/certificate-request/upload-documents");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to save information. Please try again.");
    }
  };

  const initialValues: AdditionalInfoForm = {
    state: "",
    lga: "",
    certificateNo: "",
    issuedDate: "",
    plateNo: "",
    purpose: "",
    ownerName: "",
    ownerAddress: "",
    model: "",
    engineNo: "",
    chassisNo: "",
    title: "",
    phone: "",
    email: "",
  };

  return (
    <main className="max-w-[720px] mx-auto">
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

      <section className="flex flex-col justify-between overflow-y-auto no-scrollbar">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={additionalInfoSchema}
          validate={(values) => {
            console.log("Validating form values:", values);
            return {};
          }}
        >
          {({
            isSubmitting,
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            isValid,
          }: {
            isSubmitting: boolean;
            values: AdditionalInfoForm;
            handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
            handleBlur: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement>;
            errors: any;
            touched: any;
            isValid: boolean;
          }) => {
            console.log("Form state:", { isSubmitting, isValid, errors, touched });
            return (
              <Form className="flex flex-col min-h-full justify-between">
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-3 mt-6 mb-3">
                    <TypographyH5>
                      ADDITIONAL INFORMATION
                    </TypographyH5>
                  </div>

                  <TypographySmall className="text-gray-600 text-sm mb-8">
                    Please provide the following information as shown on your
                    current Proof of Ownership Certificate.
                  </TypographySmall>

                  {/* Show validation errors if any */}
                  {Object.keys(errors).length > 0 && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded">
                      <p className="text-red-700 font-semibold">Please fix the following errors:</p>
                      <ul className="list-disc list-inside text-red-600 mt-2">
                        {Object.entries(errors).map(([field, error]) => (
                          <li key={field}>
                            {field}: {String(error)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Inputs Grid */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex gap-4">
                      <select
                        className="rounded-none border p-3 w-full"
                        name="state"
                        id="state"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select State</option>
                        <option value="lagos">Lagos</option>
                        <option value="abuja">Abuja</option>
                        <option value="oyo">Oyo</option>
                      </select>

                      <select
                        className="rounded-none border p-3 w-full"
                        name="lga"
                        id="lga"
                        value={values.lga}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select LGA</option>
                        <option value="ikeja">Ikeja</option>
                        <option value="lagos-island">Lagos Island</option>
                        <option value="surulere">Surulere</option>
                      </select>
                    </div>

                    <div className="flex gap-4">
                      <input
                        name="certificateNo"
                        placeholder="Enter Certificate No."
                        className="rounded-none border p-3 w-full"
                        value={values.certificateNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <input
                        name="issuedDate"
                        placeholder="Enter Issued Date"
                        className="rounded-none border p-3 w-full"
                        type="date"
                        value={values.issuedDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="flex gap-4">
                      <input
                        className="rounded-none border p-3 w-full"
                        name="plateNo"
                        placeholder="Enter Plate No."
                        value={values.plateNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <input
                        className="rounded-none border p-3 w-full"
                        name="purpose"
                        placeholder="Enter Purpose"
                        value={values.purpose}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="flex gap-4">
                      <input
                        className="rounded-none border p-3 w-full"
                        name="ownerName"
                        placeholder="Enter Name of Owner"
                        value={values.ownerName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <input
                        className="rounded-none border p-3 w-full"
                        name="ownerAddress"
                        placeholder="Enter Owner Address"
                        value={values.ownerAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="flex gap-4">
                      <input
                        className="rounded-none border p-3 w-full"
                        name="model"
                        placeholder="Enter Model"
                        value={values.model}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <input
                        className="rounded-none border p-3 w-full"
                        name="engineNo"
                        placeholder="Enter Engine No."
                        value={values.engineNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="flex gap-4">
                      <input
                        className="rounded-none border p-3 w-full"
                        name="chassisNo"
                        placeholder="Enter Chassis No."
                        value={values.chassisNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <input
                        className="rounded-none border p-3 w-full"
                        name="title"
                        placeholder="Enter Title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="flex gap-4">
                      <input
                        className="rounded-none border p-3 w-full"
                        name="phone"
                        placeholder="Enter Telephone No."
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <input
                        className="rounded-none border p-3 w-full"
                        name="email"
                        placeholder="Enter Email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex mt-10">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mb-4 md:w-xl rounded-sm"
                    onClick={() => {
                      console.log("Submit button clicked!", { isSubmitting, isValid, errors });
                    }}
                  >
                    {isSubmitting ? "Saving..." : "Continue"}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </section>
    </main>
  );
}
