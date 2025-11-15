import { useNavigate, useLocation } from "react-router-dom";
import {
    Button,
    FieldInput,
    TypographyH5,
    TypographySmall,
} from "../../../shared/components";
import { IoIosArrowBack } from "react-icons/io";
import { Formik, Form } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import { useVerifyTransferOtpMutation } from "../../certificate_request/api";

interface OtpFormValues {
    otp: string;
}

const otpSchema = Yup.object().shape({
    otp: Yup.string()
        .required("OTP is required")
        .length(6, "OTP must be exactly 6 digits")
        .matches(/^\d+$/, "OTP must contain only numbers"),
});

export default function VerifyOtp() {
    const navigate = useNavigate();
    const location = useLocation();
    const { requestId, otpMethod, currentOwner } = location.state || {};

    const [verifyTransferOtp, { isLoading }] = useVerifyTransferOtpMutation();

    console.log("Verify OTP - Request ID:", requestId);
    console.log("Verify OTP - OTP Method:", otpMethod);
    console.log("Verify OTP - Location State:", location.state);

    const handleGoBack = () => {
        navigate("/app/change-ownership/vehicle-information");
    };

    const handleSubmit = async (values: OtpFormValues) => {
        if (!requestId) {
            toast.error("Request ID not found. Please start from the beginning.");
            navigate("/app/change-ownership/enter-cert-no");
            return;
        }

        try {
            const result = await verifyTransferOtp({
                requestId,
                data: {
                    request_id: requestId,
                    otp: values.otp,
                },
            }).unwrap();

            console.log("OTP verification result:", result);

            if (result.success) {
                toast.success(result.message || "OTP verified successfully!");
                // Navigate to next owner info page with all state including requestId
                navigate("/app/change-ownership/next-owner-info", {
                    state: {
                        requestId: requestId, // Ensure requestId is explicitly passed
                        certificateNo: location.state?.certificateNo,
                        vehicleInfo: location.state?.vehicleInfo,
                        currentOwner: location.state?.currentOwner,
                        otpMethod: otpMethod,
                        otpVerified: true,
                        otpVerificationResponse: result,
                    },
                });
            } else {
                toast.error(result.message || "Invalid OTP. Please try again.");
            }
        } catch (error: any) {
            console.error("OTP verification error:", error);
            const errorMessage = error?.data?.message || error?.message || "Failed to verify OTP. Please try again.";
            toast.error(errorMessage);
        }
    };

    const initialValues: OtpFormValues = {
        otp: "",
    };

    return (
        <main className="max-w-[720px] mx-auto h-full">
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

            <section className="flex bg-white p-4 flex-col min-h-full justify-between">
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={otpSchema}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col min-h-full justify-between">
                            <div>
                                {/* Header */}
                                <div className="flex items-center gap-3 mt-6 mb-3">
                                    <div className="bg-[#8D8989] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                                        6
                                    </div>
                                    <TypographyH5 className="text-lg md:text-xl font-semibold text-gray-900">
                                        VERIFY OTP
                                    </TypographyH5>
                                </div>

                                <TypographySmall className="text-gray-600 text-sm mb-2">
                                    Enter the 6-digit OTP sent to the current owner via {otpMethod || "email/SMS"}.
                                </TypographySmall>

                                {/* Current Owner Info */}
                                {currentOwner && (
                                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                        <TypographySmall className="font-semibold text-gray-900 mb-2">
                                            OTP sent to:
                                        </TypographySmall>
                                        <div className="space-y-1">
                                            <TypographySmall className="text-gray-700">
                                                Name: {currentOwner.name}
                                            </TypographySmall>
                                            {otpMethod === 'email' && (
                                                <TypographySmall className="text-gray-700">
                                                    Email: {currentOwner.email}
                                                </TypographySmall>
                                            )}
                                            {otpMethod === 'sms' && (
                                                <TypographySmall className="text-gray-700">
                                                    Phone: {currentOwner.phone}
                                                </TypographySmall>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* OTP Input */}
                                <div className="flex flex-col gap-6">
                                    <FieldInput
                                        className="rounded-none text-center text-2xl tracking-widest"
                                        name="otp"
                                        placeholder="000000"
                                        maxLength={6}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        autoComplete="one-time-code"
                                    />
                                </div>

                                {/* Resend OTP Info */}
                                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <TypographySmall className="text-blue-800">
                                        Didn't receive the OTP? Go back and try sending it again via {otpMethod === 'email' ? 'SMS' : 'email'} or contact support.
                                    </TypographySmall>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex mt-10">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || isLoading}
                                    className="w-full mb-4 md:w-xl rounded-sm"
                                >
                                    {isSubmitting || isLoading ? "Verifying..." : "Verify OTP"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </section>
        </main>
    );
}