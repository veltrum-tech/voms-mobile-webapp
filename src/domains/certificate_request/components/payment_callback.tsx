import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, TypographyH5, TypographySmall } from "../../../shared/components";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import celebrationAnimation from "../../../assets/animation/celebration.json";
import { toast } from "sonner";
import { useLazyVerifyPaymentQuery } from "../api/certificate.api";

export default function PaymentCallback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [verifyPayment, { isLoading: isVerifying }] = useLazyVerifyPaymentQuery();

    const [paymentDetails, setPaymentDetails] = useState({
        requestId: "",
        trxref: "",
        reference: "",
    });
    const [paymentStatus, setPaymentStatus] = useState<"success" | "failed" | "verifying">("verifying");

    useEffect(() => {
        const requestId = searchParams.get("requestId");
        const trxref = searchParams.get("trxref");
        const reference = searchParams.get("reference");

        console.log("Payment Callback - URL Params:", { requestId, trxref, reference });

        if (requestId && trxref && reference) {
            setPaymentDetails({
                requestId,
                trxref,
                reference,
            });
            // Verify payment with the backend
            verifyPaymentStatus(requestId);
        } else {
            console.error("Missing required URL parameters");
            setPaymentStatus("failed");
            toast.error("Invalid payment callback - missing parameters");
        }
    }, [searchParams, verifyPayment]);

    const verifyPaymentStatus = async (requestId: string) => {
        try {
            console.log("Verifying payment for Request ID:", requestId);

            const result = await verifyPayment(requestId).unwrap();

            console.log("Payment verification result:", result);

            if (result.success === true && result.paymentStatus === "successful") {
                setPaymentStatus("success");
                toast.success("Payment verified successfully!");
            } else {
                setPaymentStatus("failed");
                toast.error(result.message || "Payment verification failed");
            }
        } catch (error: any) {
            console.error("Payment verification error:", error);
            console.error("Error details:", {
                status: error?.status,
                data: error?.data,
                message: error?.message
            });
            setPaymentStatus("failed");
            toast.error(error?.data?.message || "Failed to verify payment status");
        }
    }; const handleGoHome = () => {
        navigate("/select-option");
    };

    // Show loading state while verifying
    if (isVerifying || paymentStatus === "verifying") {
        return (
            <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <TypographyH5 className="text-xl font-semibold text-gray-900 mb-2">
                        Verifying Payment...
                    </TypographyH5>
                    <TypographySmall className="text-gray-600">
                        Please wait while we confirm your payment
                    </TypographySmall>
                </div>
            </div>
        );
    }

    // Show failure state
    if (paymentStatus === "failed") {
        return (
            <div className="min-h-screen bg-linear-to-br from-red-50 to-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="bg-linear-to-r from-red-500 to-red-600 p-8 text-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-12 h-12 text-red-600"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                        <TypographyH5 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Payment Verification Failed
                        </TypographyH5>
                        <TypographySmall className="text-red-100 text-base">
                            Unable to verify your payment. Please contact support.
                        </TypographySmall>
                    </div>
                    <div className="p-8">
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                            <p className="text-sm text-red-700">
                                If you were charged, please contact support with your transaction reference: {paymentDetails.trxref}
                            </p>
                        </div>
                        <Button
                            onClick={handleGoHome}
                            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-md py-3 font-semibold transition"
                        >
                            Back to Home
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Show success state
    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
                {/* Success Animation */}
                <div className="bg-linear-to-r from-green-500 to-green-600 p-8 text-center">
                    <div className="w-32 h-32 mx-auto mb-4">
                        <Lottie
                            animationData={celebrationAnimation}
                            loop={false}
                            className="w-full h-full"
                        />
                    </div>
                    <div className="text-white">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-12 h-12 text-green-600"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <TypographyH5 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Payment Successful!
                        </TypographyH5>
                        <TypographySmall className="text-green-100 text-base">
                            Your certificate migration request has been submitted successfully
                        </TypographySmall>
                    </div>
                </div>

                {/* Payment Details */}
                <div className="p-8">
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Details</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                <span className="text-gray-600 font-medium">Request ID:</span>
                                <span className="text-gray-900 font-mono text-sm break-all ml-4">
                                    {paymentDetails.requestId || "N/A"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                <span className="text-gray-600 font-medium">Migration Status:</span>
                                <span className="font-mono text-sm break-all ml-4 capitalize text-orange-600">
                                    pending
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Information Message */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                        <div className="flex">
                            <div className="shrink-0">
                                <svg
                                    className="h-5 w-5 text-blue-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-blue-700">
                                    Your certificate will be processed and you will receive a notification once it's ready.
                                    Please keep your request ID for future reference.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            onClick={handleGoHome}
                            className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white rounded-md py-3 font-semibold transition"
                        >
                            Back to Home
                        </Button>
                        {/* <Button
                            onClick={() => window.print()}
                            variant="default"
                            className="w-full sm:flex-1 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 rounded-md py-3 font-semibold transition"
                        >
                            Print Receipt
                        </Button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
