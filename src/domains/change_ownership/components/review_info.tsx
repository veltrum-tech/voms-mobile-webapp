import { useNavigate, useLocation } from "react-router-dom";
import { Button, TypographyH5, TypographyP, TypographySmall} from "../../../shared/components";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { toast } from "sonner";
import { nextOwnerData, vehicleData } from "../data";

export default function ReviewInformation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { vin } = location.state || {};

  const [checkboxes, setCheckboxes] = useState({
    correctVehicle: false,
    isOwner: false,
  });

  const handleGoBack = () => {
    navigate("/app/change-ownership/next-owner-info");
  };

  const handleCheckboxChange = (field: string) => {
    setCheckboxes((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }));
  };

  const handleContinue = () => {
    if (!checkboxes.correctVehicle) {
      toast.error("Please confirm both statements to continue");
      return;
    }
    // Navigate to next step
    navigate("/app/change-ownership/payment", { state: { vin } });
    toast.success("Information confirmed!");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Back Button */}
      <div className="fixed top-10 -left-4 z-50">
        <Button 
          onClick={handleGoBack} 
          variant={"icon"} 
          className="text-white flex items-center gap-2"
        >
          <IoIosArrowBack size={25} />
          <span className="text-lg">Back</span>
        </Button>
      </div>

      {/* Content */}
      <div className="grow">
        {/* Section Header */}
        <div className="flex items-center gap-3 mt-6 mb-6">
          <div className="bg-[#8D8989] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
            5
          </div>
          <TypographyH5 className="">
            REVIEW INFORMATION
          </TypographyH5>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Vehicle Information Column */}
          <div>
            <TypographyP className="font-semibold text-sm text-black mb-4 uppercase">Vehicle Information</TypographyP>
            <div className="space-y-3">
              <TypographySmall>
                <span className="font-medium">Vehicle Make - </span>
                {vehicleData.make}
              </TypographySmall>
              <TypographySmall>
                <span className="font-medium">Vehicle Model - </span>
                {vehicleData.model}
              </TypographySmall>
              <TypographySmall>
                <span className="font-medium">Vehicle Year - </span>
                {vehicleData.year}
              </TypographySmall>
              <TypographySmall>
                <span className="font-medium">Vehicle Type - </span>
                {vehicleData.type}
              </TypographySmall>
              <TypographySmall>
                <span className="font-medium">Vehicle Color - </span>
                {vehicleData.color}
              </TypographySmall>
              <TypographySmall>
                <span className="font-medium">Purpose - </span>
                {vehicleData.purpose}
              </TypographySmall>
            </div>
          </div>

          {/* Next Owner Info Column */}
          <div>
            <TypographyP className="font-semibold text-sm text-gray-900 mb-4 uppercase">Next Owner Info</TypographyP>
            <div className="space-y-3">
              <TypographySmall>
                <span className="font-medium">Name - </span>
                {nextOwnerData.name}
              </TypographySmall>
              <TypographySmall>
                <span className="font-medium">Address - </span>
                {nextOwnerData.address}
              </TypographySmall>
              <TypographySmall>
                <span className="font-medium">Phone Number - </span>
                {nextOwnerData.phone}
              </TypographySmall>
              <TypographySmall>
                <span className="font-medium">Email - </span>
                {nextOwnerData.email}
              </TypographySmall>
            </div>
          </div>
        </div>

        {/* Confirmation Checkboxes */}
        <div className="border-2 border-primary-600 mt-10 rounded-sm p-4">
          {/* Checkbox */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCheckboxChange("correctVehicle")}
              className="shrink-0 w-6 h-6 rounded border-2 border-primary-600 flex items-center justify-center cursor-pointer"
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
              className="text-sm text-gray-900 cursor-pointer"
            >
              I confirm all the information is accurate.
            </label>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="shrink-0 pb-6 pt-6">
        <Button 
          onClick={handleContinue}
          className="text-white w-full md:w-xl rounded-sm transition"
          disabled={!checkboxes.correctVehicle}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}