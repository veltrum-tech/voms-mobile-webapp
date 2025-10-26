import { useNavigate } from "react-router-dom";
import {
  Button,
  TypographyH5,
  TypographySmall,
} from "../../../shared/components";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { toast } from "sonner";
import { additionalInfo, vehicleData } from "../data";

export default function InformationSummary() {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleGoBack = () => {
    navigate("/app/certificate-request/addtional-information");
  };

  const handleCheckboxChange = () => {
    setIsConfirmed((prev) => !prev);
  };

  const handleConfirm = () => {
    if (!isConfirmed) {
      toast.error("Please confirm the information to proceed");
      return;
    }
    toast.success("Information confirmed!");
    // Navigate to next step if any
    navigate("/app/certificate-request/upload-documents", {
      state: { vehicleData, additionalInfo },
    });
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Back Button */}
      <div className="fixed top-10 -left-4 z-50">
        <Button
          onClick={handleGoBack}
          variant="icon"
          className="text-white flex items-center gap-2"
        >
          <IoIosArrowBack size={25} />
          <span className="text-lg">Back</span>
        </Button>
      </div>

      <section className="grow">
        {/* Page Header */}
        <div className="flex items-center my-6 gap-3">
          <div className="bg-[#8D8989] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
            5
          </div>
          <TypographyH5 className="text-lg md:text-xl font-semibold text-gray-900">
            INFORMATION SUMMARY
          </TypographyH5>
        </div>

        <div className="flex flex-row mb-10">
          {/* VIN Information */}
          <div className="flex-1 space-y-3">
            <TypographySmall className="font-semibold text-gray-700">
              VIN Information
            </TypographySmall>
            <p>
              <span className="font-medium">VIN:</span> {vehicleData.vin}
            </p>
            <p>
              <span className="font-medium">Year:</span> {vehicleData.year}
            </p>
            <p>
              <span className="font-medium">Make:</span> {vehicleData.make}
            </p>
            <p>
              <span className="font-medium">Model:</span> {vehicleData.model}
            </p>
            <p>
              <span className="font-medium">Type:</span> {vehicleData.type}
            </p>
          </div>

          {/* Additional Information */}
          <div className="flex-1 space-y-3">
            <TypographySmall className="font-semibold text-gray-700">
              Additional Information
            </TypographySmall>
            <p>
              <span className="font-medium">State:</span> {additionalInfo.state}
            </p>
            <p>
              <span className="font-medium">LGA:</span> {additionalInfo.lga}
            </p>
            <p>
              <span className="font-medium">Certificate No:</span>
              {additionalInfo.certificateNo}
            </p>
            <p>
              <span className="font-medium">Issued Date:</span>
              {additionalInfo.issuedDate}
            </p>
            <p>
              <span className="font-medium">Plate No:</span>
              {additionalInfo.plateNo}
            </p>
            <p>
              <span className="font-medium">Purpose:</span>
              {additionalInfo.purpose}
            </p>
            <p>
              <span className="font-medium">Owner Name:</span>
              {additionalInfo.ownerName}
            </p>
            <p>
              <span className="font-medium">Owner Address:</span>
              {additionalInfo.ownerAddress}
            </p>
            <p>
              <span className="font-medium">Model:</span> {additionalInfo.model}
            </p>
            <p>
              <span className="font-medium">Engine No:</span>
              {additionalInfo.engineNo}
            </p>
            <p>
              <span className="font-medium">Chassis No:</span>
              {additionalInfo.chassisNo}
            </p>
            <p>
              <span className="font-medium">Title:</span> {additionalInfo.title}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {additionalInfo.phone}
            </p>
            <p>
              <span className="font-medium">Email:</span> {additionalInfo.email}
            </p>
          </div>
        </div>

        {/* Confirmation Checkbox */}
        <div className="border-2 border-primary-600 items-center rounded-sm p-4 mb-8 flex gap-3">
          <button
            onClick={handleCheckboxChange}
            className="shrink-0 w-6 h-6 rounded border-2 border-primary-600 flex items-center justify-center cursor-pointer mt-0.5"
            style={{ backgroundColor: isConfirmed ? "#B41662" : "white" }}
          >
            {isConfirmed && (
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
            onClick={handleCheckboxChange}
            className="text-sm text-gray-900 cursor-pointer"
          >
            I confirm that the information above is correct
          </label>
        </div>

        {/* Confirm Button */}
        <div className="mt-6">
          <Button
            onClick={handleConfirm}
            className="w-full md:w-xl rounded-sm"
            disabled={!isConfirmed}
          >
            Continue
          </Button>
        </div>
      </section>
    </div>
  );
}
