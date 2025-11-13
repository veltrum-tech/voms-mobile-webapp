import { useNavigate, useLocation } from "react-router-dom";
import { Button, TypographyH5 } from "../../../shared/components";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { toast } from "sonner";

export default function VinInformation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { vin, vehicleInfo } = location.state || {};

  const [checkboxes, setCheckboxes] = useState({
    correctVehicle: false,
    isOwner: false,
  });

  const handleGoBack = () => {
    navigate("/app/certificate-request/enter-vin");
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
    navigate("/app/certificate-request/addtional-information", {
      state: { vin, vehicleInfo }
    });
    toast.success("Information confirmed!");
  };

  return (
    <div className="flex flex-col max-w-[720px] mx-auto h-full">
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

      <div className="bg-white p-4 h-full space-y-6">
        {/* Content */}
        <div className="grow">
          {/* Section Header */}
          <div className="flex items-center gap-3 mt-6 mb-6">
            <div className="bg-[#8D8989] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
              3
            </div>
            <TypographyH5 className="">
              VIN INFORMATION
            </TypographyH5>
          </div>

          {/* Vehicle Information */}
          <div className="space-y-2 mb-8">
            <p className="text-gray-700">
              <span className="font-medium">VIN - </span>
              {vin || 'N/A'}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Year - </span>
              {vehicleInfo?.year || 'N/A'}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Make - </span>
              {vehicleInfo?.make || 'N/A'}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Model - </span>
              {vehicleInfo?.model || 'N/A'}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Type - </span>
              {vehicleInfo?.type || 'N/A'}
            </p>
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
                className="text-sm text-gray-900 cursor-pointer"
              >
                This is the correct vehicle to be processed
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
                className="text-sm text-gray-900 cursor-pointer"
              >
                I am the owner of this vehicle or the authorized representative of the owner
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