import { useNavigate, useLocation } from "react-router-dom";
import { Button, TypographyH5, TypographySmall } from "../../../shared/components";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function VinInformation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { vin, vehicleInfo, fullResponse } = location.state || {};

  // Extract vehicle info from the response structure
  const displayVehicleInfo = vehicleInfo || fullResponse?.vehicleInfo || {};
  const displayVin = vin || fullResponse?.vin || 'N/A';

  console.log("=== VIN INFO DEBUG ===");
  console.log("Full location.state:", location.state);
  console.log("Display VIN:", displayVin);
  console.log("Display Vehicle Info:", displayVehicleInfo);
  console.log("Full Response:", fullResponse);
  console.log("====================");

  const [checkboxes, setCheckboxes] = useState({
    correctVehicle: false,
    isOwner: false,
  });

  // Redirect back if no VIN data is available
  useEffect(() => {
    if (!displayVin || displayVin === 'N/A') {
      toast.error("No VIN information available");
      navigate("/app/certificate-request/enter-vin");
    }
  }, [displayVin, navigate]);

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
    // Navigate to next step with requestId from the API response
    navigate("/app/certificate-request/addtional-information", {
      state: {
        vin: displayVin,
        vehicleInfo: displayVehicleInfo,
        fullResponse,
        requestId: fullResponse?.requestId // Pass the UUID requestId
      }
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

      <div className="bg-white p-4 min-h-screen space-y-6">
        {/* Content */}
        <div className="grow">
          {/* Section Header */}
          <div className="flex items-center gap-3 mt-6 mb-3">
            <div className="bg-[#8D8989] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
              3
            </div>
            <TypographyH5 className="text-lg md:text-xl font-semibold text-gray-900">
              VIN INFORMATION
            </TypographyH5>
          </div>

          <TypographySmall className="text-gray-600 text-sm mb-6">
            Please verify the vehicle information below is correct
          </TypographySmall>

          {/* Success Message if available */}
          {fullResponse?.success && (
            <div className="bg-green-50 border border-green-200 rounded-sm p-3 mb-4">
              <p className="text-green-800 text-sm font-semibold">✓ VIN Verified Successfully</p>
              {fullResponse?.message && (
                <p className="text-green-700 text-xs mt-1">{fullResponse.message}</p>
              )}
            </div>
          )}

          {/* Request ID Display */}
          {fullResponse?.requestId && (
            <div className="bg-blue-50 border border-blue-200 rounded-sm p-3 mb-4">
              <p className="text-blue-800 text-sm">
                <span className="font-semibold">Request ID:</span> {fullResponse.requestId}
              </p>
            </div>
          )}          {/* Vehicle Information Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 mb-8">
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-2">
                <span className="font-semibold text-gray-700 w-32">VIN:</span>
                <span className="text-gray-900 break-all">{displayVin}</span>
              </div>

              {displayVehicleInfo?.make && (
                <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-2">
                  <span className="font-semibold text-gray-700 w-32">Make:</span>
                  <span className="text-gray-900">{displayVehicleInfo.make}</span>
                </div>
              )}

              {displayVehicleInfo?.model && (
                <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-2">
                  <span className="font-semibold text-gray-700 w-32">Model:</span>
                  <span className="text-gray-900">{displayVehicleInfo.model}</span>
                </div>
              )}

              {displayVehicleInfo?.year && (
                <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-2">
                  <span className="font-semibold text-gray-700 w-32">Year:</span>
                  <span className="text-gray-900">{displayVehicleInfo.year}</span>
                </div>
              )}

              {displayVehicleInfo?.color && (
                <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-2">
                  <span className="font-semibold text-gray-700 w-32">Color:</span>
                  <span className="text-gray-900">{displayVehicleInfo.color}</span>
                </div>
              )}

              {displayVehicleInfo?.vehicle_type && (
                <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-2">
                  <span className="font-semibold text-gray-700 w-32">Vehicle Type:</span>
                  <span className="text-gray-900">{displayVehicleInfo.vehicle_type}</span>
                </div>
              )}

              {displayVehicleInfo?.type && (
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-semibold text-gray-700 w-32">Type:</span>
                  <span className="text-gray-900">{displayVehicleInfo.type}</span>
                </div>
              )}

              {/* Display any additional fields from the API response */}
              {displayVehicleInfo && Object.keys(displayVehicleInfo).map((key) => {
                if (!['year', 'make', 'model', 'type', 'color', 'vehicle_type'].includes(key) && displayVehicleInfo[key]) {
                  return (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-center border-t border-gray-200 pt-2">
                      <span className="font-semibold text-gray-700 w-32 capitalize">
                        {key.replace(/_/g, ' ')}:
                      </span>
                      <span className="text-gray-900">{displayVehicleInfo[key]}</span>
                    </div>
                  );
                }
                return null;
              })}
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