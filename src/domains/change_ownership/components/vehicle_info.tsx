import { useNavigate, useLocation } from "react-router-dom";
import { Button, TypographyH5, TypographySmall } from "../../../shared/components";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { toast } from "sonner";
import { useSendTransferOtpMutation } from "../../certificate_request/api";

export default function VehicleInformation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { certificateNo, requestId, currentOwner, vehicleInfo, fullResponse } = location.state || {};

  // Extract vehicle info and owner info from response
  const displayVehicleInfo = vehicleInfo || fullResponse?.vehicleInfo || {};
  const ownerInfo = currentOwner || fullResponse?.currentOwner || {};
  const transferRequestId = requestId || fullResponse?.requestId;
  const certificateNumber = certificateNo || 'N/A';

  const [sendTransferOtp, { isLoading: isSendingOtp }] = useSendTransferOtpMutation();

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

  const handleSendOtp = async (method: 'email' | 'sms') => {
    if (!checkboxes.correctVehicle) {
      toast.error("Please confirm the vehicle information to continue");
      return;
    }

    if (!transferRequestId) {
      toast.error("Request ID not found. Please start from the beginning.");
      navigate("/app/change-ownership/enter-cert-no");
      return;
    }

    try {
      const result = await sendTransferOtp({
        requestId: transferRequestId,
        data: {
          request_id: transferRequestId,
          method: method,
        },
      }).unwrap();

      console.log(`OTP sent via ${method}:`, result);

      if (result.success) {
        toast.success(result.message || `OTP sent successfully to current owner's ${method}!`);
        // Navigate to OTP verification page
        navigate("/app/change-ownership/verify-otp", {
          state: {
            certificateNo: certificateNumber,
            vehicleInfo: displayVehicleInfo,
            currentOwner: ownerInfo,
            requestId: transferRequestId,
            otpMethod: method,
            otpSendResponse: result
          }
        });
      } else {
        toast.error(result.message || `Failed to send OTP via ${method}`);
      }
    } catch (error: any) {
      console.error(`Error sending OTP via ${method}:`, error);
      const errorMessage = error?.data?.message || error?.message || `Failed to send OTP via ${method}. Please try again.`;
      toast.error(errorMessage);
    }
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
              <TypographySmall className="text-black font-semibold">{certificateNumber}</TypographySmall>
            </div>

            {/* Two Column Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pb-3">
              <div className="flex gap-1 items-center">
                <TypographySmall>Make</TypographySmall>-
                <TypographySmall className="font-medium">{displayVehicleInfo?.make || 'N/A'}</TypographySmall>
              </div>
              <div className="flex gap-1 items-center">
                <TypographySmall>Model</TypographySmall>-
                <TypographySmall className="font-medium">{displayVehicleInfo?.model || 'N/A'}</TypographySmall>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pb-3">
              <div className="flex gap-1 items-center">
                <TypographySmall>Year</TypographySmall>-
                <TypographySmall className="font-medium">{displayVehicleInfo?.year || 'N/A'}</TypographySmall>
              </div>
              <div className="flex gap-1 items-center">
                <TypographySmall>Color</TypographySmall>-
                <TypographySmall className="font-medium">{displayVehicleInfo?.color || 'N/A'}</TypographySmall>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pb-3">
              <div className="flex gap-1 items-center">
                <TypographySmall>Plate No</TypographySmall>-
                <TypographySmall className="font-medium">{displayVehicleInfo?.plate_number || 'N/A'}</TypographySmall>
              </div>
              <div className="flex gap-1 items-center">
                <TypographySmall>VIN</TypographySmall>-
                <TypographySmall className="font-medium">{displayVehicleInfo?.vin || 'N/A'}</TypographySmall>
              </div>
            </div>

            {/* Current Owner Information */}
            {ownerInfo && Object.keys(ownerInfo).length > 0 && (
              <>
                <div className="border-t pt-3 mt-4 mb-3">
                  <TypographySmall className="text-black font-semibold">Current Owner</TypographySmall>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 pb-3">
                  <div className="flex gap-1 items-center">
                    <TypographySmall>Name</TypographySmall>-
                    <TypographySmall className="font-medium">{ownerInfo?.name || 'N/A'}</TypographySmall>
                  </div>
                  <div className="flex gap-1 items-center">
                    <TypographySmall>Phone</TypographySmall>-
                    <TypographySmall className="font-medium">{ownerInfo?.phone || 'N/A'}</TypographySmall>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  <div className="flex gap-1 items-center col-span-2">
                    <TypographySmall>Email</TypographySmall>-
                    <TypographySmall className="font-medium break-all">{ownerInfo?.email || 'N/A'}</TypographySmall>
                  </div>
                </div>
              </>
            )}
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
          </div>
        </div>

        {/* OTP Buttons */}
        <div className="shrink-0 pb-6 pt-6 space-y-4">
          <TypographySmall className="font-semibold text-gray-900">
            Send OTP to Current Owner:
          </TypographySmall>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Send OTP via Email Button */}
            <Button
              onClick={() => handleSendOtp('email')}
              disabled={!checkboxes.correctVehicle || isSendingOtp}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-sm transition"
            >
              {isSendingOtp ? "Sending..." : "Send OTP via Email"}
            </Button>

            {/* Send OTP via SMS Button */}
            {/* <Button
              onClick={() => handleSendOtp('sms')}
              disabled={!checkboxes.correctVehicle || isSendingOtp}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-sm transition"
            >
              {isSendingOtp ? "Sending..." : "Send OTP via SMS"}
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}