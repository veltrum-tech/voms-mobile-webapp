import { useNavigate, useLocation } from "react-router-dom";
import { Button, TypographyH5, TypographySmall } from "../../../shared/components";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { toast } from "sonner";
import { certData } from "../data";

export default function VehicleInformation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { vin } = location.state || {};

  const [checkboxes, setCheckboxes] = useState({
    correctVehicle: false,
    isOwner: false,
  });

  const handleGoBack = () => {
    navigate("/app/change-ownership/enter-cert-no");
  };

  const handleCheckboxChange = (field: string) => {
    setCheckboxes((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }));
  };

  const handleContinue = () => {
    if (!checkboxes.correctVehicle || !checkboxes.isOwner) {
      toast.error("Please confirm both statements to continue");
      return;
    }
    // Navigate to next step
    navigate("/app/change-ownership/next-owner-info", { state: { vin } });
    toast.success("Information confirmed!");
  };

  return (
    <div className="max-w-[720px] mx-auto flex flex-col h-full">
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


      <div className="bg-white p-4 h-full">
        {/* Content */}
        <div className="grow">
          {/* Section Header */}
          <div className="flex items-center gap-3 mt-6 mb-6">
            <div className="bg-[#8D8989] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
              3
            </div>
            <TypographyH5 className="">
              VEHICLE INFORMATION
            </TypographyH5>
          </div>

          {/* Vehicle Information Card */}
          <div className="mb-8">
            {/* Certificate No - Full Width */}
            <div className="mb-3 flex gap-1 items-center pb-3">
              <TypographySmall className="text-black">Certificate No</TypographySmall>-
              <TypographySmall className="text-black">{certData.certificateNo}</TypographySmall>
            </div>

            {/* Two Column Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pb-3">
              <div className="flex gap-1 items-center">
                <TypographySmall>Issue Date</TypographySmall>-
                <TypographySmall>{certData.issueDate}</TypographySmall>
              </div>
              <div className="flex gap-1 items-center">
                <TypographySmall>Plate No</TypographySmall>-
                <TypographySmall>{certData.plateNo}</TypographySmall>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pb-3">
              <div className="flex gap-1 items-center">
                <TypographySmall>Owner</TypographySmall>-
                <TypographySmall>{certData.owner}</TypographySmall>
              </div>
              <div className="flex gap-1 items-center">
                <TypographySmall>Model</TypographySmall>-
                <TypographySmall>{certData.model}</TypographySmall>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pb-3">
              <div className="flex gap-1 items-center">
                <TypographySmall>Engine No</TypographySmall>-
                <TypographySmall>{certData.engineNo}</TypographySmall>
              </div>
              <div className="flex gap-1 items-center">
                <TypographySmall>Chassis No</TypographySmall>-
                <TypographySmall>{certData.chassisNo}</TypographySmall>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pb-3">
              <div className="flex gap-1 items-center">
                <TypographySmall>VIN</TypographySmall>-
                <TypographySmall>{certData.vin}</TypographySmall>
              </div>
              <div className="flex gap-1 items-center">
                <TypographySmall>Title</TypographySmall>-
                <TypographySmall>{certData.title}</TypographySmall>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="flex gap-1 items-center">
                <TypographySmall>Telephone No</TypographySmall>-
                <TypographySmall>{certData.telephoneNo}</TypographySmall>
              </div>
              <div className="flex gap-1 items-center">
                <TypographySmall>Email</TypographySmall>-
                <TypographySmall className="text-sm font-medium text-gray-900 break-all">{certData.email}</TypographySmall>
              </div>
            </div>
          </div>

          {/* Confirmation Checkboxes */}
          <div className="border-2 border-primary-600 rounded-sm p-4 space-y-4">
            {/* Checkbox 1 */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleCheckboxChange("correctVehicle")}
                className="shrink-0 w-6 h-6 rounded border-2 border-primary-600 flex items-center justify-center cursor-pointer mt-0.5"
                style={{
                  backgroundColor: checkboxes.correctVehicle ? "#B41662" : "white",
                }}
              >
                {checkboxes.correctVehicle && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </button>
              <label
                onClick={() => handleCheckboxChange("correctVehicle")}
                className="text-sm text-black cursor-pointer"
              >
                This is the correct vehicle and certificate to be processed.
              </label>
            </div>

            {/* Checkbox 2 */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleCheckboxChange("isOwner")}
                className="shrink-0 w-6 h-6 rounded border-2 border-primary-600 flex items-center justify-center cursor-pointer mt-0.5"
                style={{
                  backgroundColor: checkboxes.isOwner ? "#B41662" : "white",
                }}
              >
                {checkboxes.isOwner && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </button>
              <label
                onClick={() => handleCheckboxChange("isOwner")}
                className="text-sm text-black cursor-pointer"
              >
                I am the owner of this vehicle or representative of the owner.
              </label>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="shrink-0 pb-6 pt-6">
          <Button
            onClick={handleContinue}
            className="text-white w-full md:w-xl rounded-sm transition"
            disabled={!checkboxes.correctVehicle || !checkboxes.isOwner}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}