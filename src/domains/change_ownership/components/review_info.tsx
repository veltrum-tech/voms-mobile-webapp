import { useNavigate, useLocation } from "react-router-dom";
import { Button, TypographyH5, TypographySmall } from "../../../shared/components";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "sonner";
import { useInitiateTransferPaymentMutation } from "../../certificate_request/api";

export default function ReviewInformation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { transferResponse, requestId, nextOwnerInfo, vehicleInfo, currentOwner } = location.state || {};

  const [initiateTransferPayment, { isLoading: isInitiatingPayment }] = useInitiateTransferPaymentMutation();

  console.log("Review Info - Transfer Response:", transferResponse);
  console.log("Review Info - Request ID:", requestId);
  console.log("Review Info - Next Owner Info:", nextOwnerInfo);

  const handleGoBack = () => {
    navigate("/app/change-ownership/next-owner-info");
  };

  const handleProceedToPayment = async () => {
    if (!requestId) {
      toast.error("Request ID not found. Please start from the beginning.");
      return;
    }

    try {
      const result = await initiateTransferPayment({
        requestId,
        data: {
          request_id: requestId,
          amount: 5000, // Default transfer fee amount - adjust as needed
        },
      }).unwrap();

      console.log("Payment initiation result:", result);

      if (result.success && result.paymentUrl) {
        toast.success("Redirecting to payment gateway...");
        // Redirect to payment URL
        window.location.href = result.paymentUrl;
      } else {
        toast.error("Failed to initiate payment. Please try again.");
      }
    } catch (error: any) {
      console.error("Payment initiation error:", error);
      const errorMessage = error?.data?.message || error?.message || "Failed to initiate payment. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-[720px] mx-auto flex flex-col space-y-6">
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
      <div className="flex flex-col gap-6 bg-white p-6">
        <div className="grow bg-white flex flex-col">
          {/* Section Header */}
          <div className="flex items-center gap-3 mt-6 mb-6">
            <div className="bg-[#8D8989] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
              5
            </div>
            <TypographyH5 className="">
              REVIEW INFORMATION
            </TypographyH5>
          </div>

          {/* Transfer Summary */}
          <div className="space-y-6">
            {/* Vehicle Information */}
            {vehicleInfo && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <TypographySmall className="font-semibold text-gray-900 mb-3">
                  Vehicle Information:
                </TypographySmall>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Make:</span>
                    <span className="ml-2 font-medium">{vehicleInfo.make || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Model:</span>
                    <span className="ml-2 font-medium">{vehicleInfo.model || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Year:</span>
                    <span className="ml-2 font-medium">{vehicleInfo.year || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Color:</span>
                    <span className="ml-2 font-medium">{vehicleInfo.color || 'N/A'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Plate Number:</span>
                    <span className="ml-2 font-medium">{vehicleInfo.plate_number || 'N/A'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Current Owner Information */}
            {currentOwner && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <TypographySmall className="font-semibold text-gray-900 mb-3">
                  Current Owner:
                </TypographySmall>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <span className="ml-2 font-medium">{currentOwner.name || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Phone:</span>
                    <span className="ml-2 font-medium">{currentOwner.phone || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <span className="ml-2 font-medium">{currentOwner.email || 'N/A'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Next Owner Information */}
            {nextOwnerInfo && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <TypographySmall className="font-semibold text-gray-900 mb-3">
                  New Owner:
                </TypographySmall>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <span className="ml-2 font-medium">{nextOwnerInfo.ownerName || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Address:</span>
                    <span className="ml-2 font-medium">{nextOwnerInfo.ownerAddress || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Phone:</span>
                    <span className="ml-2 font-medium">{nextOwnerInfo.phone || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <span className="ml-2 font-medium">{nextOwnerInfo.email || 'N/A'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Transfer Status */}
            {transferResponse && (
              <div className="p-4 rounded-lg border-2 border-green-500 bg-green-50">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <TypographySmall className="font-semibold text-green-700">
                    Transfer information submitted successfully!
                  </TypographySmall>
                </div>
                <TypographySmall className="text-green-600 mt-2">
                  {transferResponse.message}
                </TypographySmall>
              </div>
            )}

            {/* Payment Information */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
             
              <TypographySmall className="text-blue-800">
                Click the button below to proceed to payment and complete your vehicle ownership transfer.
              </TypographySmall>
            </div>
          </div>
        </div>

        {/* Proceed to Payment Button */}
        <div className="">
          <Button
            onClick={handleProceedToPayment}
            disabled={isInitiatingPayment}
            className="text-white w-full md:w-xl rounded-sm transition bg-[#C2185B] hover:bg-[#A01548]"
          >
            {isInitiatingPayment ? "Processing..." : "Proceed to Payment"}
          </Button>
        </div>
      </div>


    </div>
  );
}