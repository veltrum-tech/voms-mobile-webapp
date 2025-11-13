import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  TypographyH5,
  TypographySmall,
} from "../../../shared/components";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { toast } from "sonner";
import { useInitiateMigrationPaymentMutation } from "../api";

export default function InformationSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const { requestId, vin, vehicleInfo, additionalInfo } = location.state || {};

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [initiatePayment, { isLoading: isInitiatingPayment }] = useInitiateMigrationPaymentMutation();

  const handleGoBack = () => {
    navigate("/app/certificate-request/addtional-information");
  };

  const handleCheckboxChange = () => {
    setIsConfirmed((prev) => !prev);
  };

  const handleConfirm = async () => {
    if (!isConfirmed) {
      toast.error("Please confirm the information to proceed");
      return;
    }

    if (!requestId) {
      toast.error("Request ID not found. Please start from the beginning.");
      navigate("/app/certificate-request/enter-vin");
      return;
    }

    try {
      const result = await initiatePayment({
        requestId,
        data: {
          request_id: requestId,
          amount: 5000,
        },
      }).unwrap();

      if (result.success && result.data?.payment_url) {
        toast.success("Redirecting to payment...");
        // Redirect to payment gateway
        window.location.href = result.data.payment_url;
      } else {
        toast.error(result.message || "Failed to initiate payment");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error?.data?.message || "Failed to initiate payment. Please try again.");
    }
  };

  return (
    <div className="max-w-[720px] mx-auto flex flex-col min-h-full">
      {/* Back Button */}
      <div className="max-w-[720px] mx-auto fixed top-10 -left-4 z-50">
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
              <span className="font-medium">VIN:</span> {vin || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Year:</span> {vehicleInfo?.year || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Make:</span> {vehicleInfo?.make || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Model:</span> {vehicleInfo?.model || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Type:</span> {vehicleInfo?.type || 'N/A'}
            </p>
          </div>

          {/* Additional Information */}
          <div className="flex-1 space-y-3">
            <TypographySmall className="font-semibold text-gray-700">
              Additional Information
            </TypographySmall>
            <p>
              <span className="font-medium">State:</span> {additionalInfo?.state || 'N/A'}
            </p>
            <p>
              <span className="font-medium">LGA:</span> {additionalInfo?.lga || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Certificate No:</span> {additionalInfo?.certificateNo || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Issued Date:</span> {additionalInfo?.issuedDate || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Plate No:</span> {additionalInfo?.plateNo || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Purpose:</span> {additionalInfo?.purpose || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Owner Name:</span> {additionalInfo?.ownerName || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Owner Address:</span> {additionalInfo?.ownerAddress || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Model:</span> {additionalInfo?.model || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Engine No:</span> {additionalInfo?.engineNo || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Chassis No:</span> {additionalInfo?.chassisNo || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Title:</span> {additionalInfo?.title || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {additionalInfo?.phone || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Email:</span> {additionalInfo?.email || 'N/A'}
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
            disabled={!isConfirmed || isInitiatingPayment}
          >
            {isInitiatingPayment ? "Processing..." : "Proceed to Payment"}
          </Button>
        </div>
      </section>
    </div>
  );
}
