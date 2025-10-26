import { useNavigate } from "react-router-dom";
import {
  Button,
  FieldInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TypographyH5,
  TypographySmall,
} from "../../../shared/components";
import { IoIosArrowBack } from "react-icons/io";
import { Formik, Form } from "formik";
import { toast } from "sonner";
import { additionalInfoSchema, type AdditionalInfo } from "../../../shared/utils";

export default function AdditionalInformation() {
  const navigate = useNavigate();

  const handleGoBack = () =>
    navigate("/app/certificate-request/vin-information");

  const handleSubmit = (values: AdditionalInfo) => {
    toast.success("Information saved successfully!");
    console.log("Submitted Values:", values);
    navigate("/app/certificate-request/upload-documents");
  };

  const initialValues: AdditionalInfo = {
    state: "",
    lga: "",
    certificateNo: "",
    issuedDate: new Date(),
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
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={additionalInfoSchema}>
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="flex flex-col min-h-full justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mt-6 mb-3">
                  <div className="bg-[#8D8989] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <TypographyH5 className="text-lg md:text-xl font-semibold text-gray-900">
                    ADDITIONAL INFORMATION
                  </TypographyH5>
                </div>

                <TypographySmall className="text-gray-600 text-sm mb-8">
                  Please provide the following information as shown on your
                  current Proof of Ownership Certificate.
                </TypographySmall>

                {/* Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Selects */}
                  <div className="flex gap-4">
                    <Select
                      value={values.state}
                      onValueChange={(value) => setFieldValue("state", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lagos">Lagos</SelectItem>
                        <SelectItem value="abuja">Abuja</SelectItem>
                        <SelectItem value="oyo">Oyo</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={values.lga}
                      onValueChange={(value) => setFieldValue("lga", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Lic Area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ikeja">Ikeja</SelectItem>
                        <SelectItem value="surulere">Surulere</SelectItem>
                        <SelectItem value="mushin">Mushin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Text Inputs */}
                  <div className="flex gap-4">
                    <FieldInput
                      name="certificateNo"
                      placeholder="Enter Certificate No."
                    />
                    <FieldInput
                      name="issuedDate"
                      placeholder="Enter Issued Date"
                      type="date"
                    />
                  </div>
                  <div className="flex gap-4">
                    <FieldInput name="plateNo" placeholder="Enter Plate No." />
                    <FieldInput name="purpose" placeholder="Enter Purpose" />
                  </div>
                  <div className="flex gap-4">
                    <FieldInput
                      name="ownerName"
                      placeholder="Enter Name of Owner"
                    />
                    <FieldInput
                      name="ownerAddress"
                      placeholder="Enter Owner Address"
                    />
                  </div>
                  <div className="flex gap-4">
                    <FieldInput name="model" placeholder="Enter Model" />
                    <FieldInput
                      name="engineNo"
                      placeholder="Enter Engine No."
                    />
                  </div>
                  <div className="flex gap-4">
                    <FieldInput
                      name="chassisNo"
                      placeholder="Enter Chassis No."
                    />
                    <FieldInput name="title" placeholder="Enter Title" />
                  </div>
                  <div className="flex gap-4">
                    <FieldInput
                      name="phone"
                      placeholder="Enter Telephone No."
                    />
                    <FieldInput
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
    </>
  );
}
