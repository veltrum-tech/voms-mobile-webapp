/**
 * Example Component: Certificate Migration Flow
 * 
 * This is an example showing how to use the certificate migration APIs
 * in a React component.
 */

import { useState } from 'react';
import { toast } from 'sonner';
import {
    useVerifyVinMutation,
    useSubmitMigrationInfoMutation,
    useUploadMigrationCertificateMutation,
    useInitiateMigrationPaymentMutation,
} from '../api';
import type { SubmitMigrationInfoRequest } from '../models';

export const CertificateMigrationExample = () => {
    // API Hooks
    const [verifyVin, { isLoading: isVerifying }] = useVerifyVinMutation();
    const [submitInfo, { isLoading: isSubmitting }] = useSubmitMigrationInfoMutation();
    const [uploadCertificate] = useUploadMigrationCertificateMutation();
    const [initiatePayment, { isLoading: isInitiatingPayment }] = useInitiateMigrationPaymentMutation();

    // State
    const [currentStep, setCurrentStep] = useState(1);
    const [requestId, setRequestId] = useState<string>('');
    const [vin, setVin] = useState('');

    // Step 1: Verify VIN
    const handleVerifyVin = async () => {
        try {
            const result = await verifyVin({ vin }).unwrap();

            if (result.success) {
                toast.success('VIN verified successfully!');
                // Assuming the API returns a request_id after verification
                setRequestId('generated-request-id'); // Replace with actual request_id from API
                setCurrentStep(2);
            }
        } catch (error) {
            toast.error('Failed to verify VIN');
            console.error('VIN verification error:', error);
        }
    };

    // Step 2: Submit Migration Information
    const handleSubmitInfo = async (formData: Omit<SubmitMigrationInfoRequest, 'request_id'>) => {
        try {
            const result = await submitInfo({
                requestId,
                data: {
                    ...formData,
                    request_id: requestId,
                },
            }).unwrap();

            if (result.success) {
                toast.success('Information submitted successfully!');
                setCurrentStep(3);
            }
        } catch (error) {
            toast.error('Failed to submit information');
            console.error('Info submission error:', error);
        }
    };

    // Step 3: Upload Certificate
    const handleUploadCertificate = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('certificate', file);

            const result = await uploadCertificate({
                requestId,
                file: formData,
            }).unwrap();

            if (result.success) {
                toast.success('Certificate uploaded successfully!');
                setCurrentStep(4);
            }
        } catch (error) {
            toast.error('Failed to upload certificate');
            console.error('Upload error:', error);
        }
    };

    // Step 4: Initiate Payment
    const handleInitiatePayment = async () => {
        try {
            const result = await initiatePayment({
                requestId,
                data: {
                    request_id: requestId,
                    amount: 5000, // Amount in NGN
                },
            }).unwrap();

            if (result.success && result.data?.payment_url) {
                toast.success('Redirecting to payment...');
                // Redirect to payment gateway
                window.location.href = result.data.payment_url;
            }
        } catch (error) {
            toast.error('Failed to initiate payment');
            console.error('Payment error:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Certificate Migration</h1>

            {/* Step 1: VIN Verification */}
            {currentStep === 1 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Step 1: Verify VIN</h2>
                    <input
                        type="text"
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                        placeholder="Enter VIN (17 characters)"
                        className="w-full px-4 py-2 border rounded"
                        maxLength={17}
                    />
                    <button
                        onClick={handleVerifyVin}
                        disabled={isVerifying || vin.length !== 17}
                        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
                    >
                        {isVerifying ? 'Verifying...' : 'Verify VIN'}
                    </button>
                </div>
            )}

            {/* Step 2: Submit Information */}
            {currentStep === 2 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Step 2: Vehicle Information</h2>
                    {/* Add your form fields here */}
                    <p className="text-gray-600">Form fields for vehicle and owner information...</p>
                    <button
                        onClick={() => handleSubmitInfo({
                            state: 'Lagos',
                            lga_id: 'uuid-lga-id',
                            certificate_number: 'CERT-2023-12345',
                            issue_date: '2023-01-15',
                            plate_number: 'ABC-123-DE',
                            purpose: 'Proof of Ownership',
                            owner_name: 'John Doe',
                            owner_address: '123 Street',
                            engine_number: 'ENG123',
                            title: 'Mr',
                            telephone: '+234',
                            email: 'email@example.com',
                        })}
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Information'}
                    </button>
                </div>
            )}

            {/* Step 3: Upload Certificate */}
            {currentStep === 3 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Step 3: Upload Certificate</h2>
                    <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUploadCertificate(file);
                        }}
                        className="w-full"
                    />
                    <p className="text-sm text-gray-600">
                        Upload a clear image or PDF of your physical certificate
                    </p>
                </div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Step 4: Payment</h2>
                    <div className="bg-gray-100 p-4 rounded">
                        <p className="text-lg">Amount: ₦5,000.00</p>
                    </div>
                    <button
                        onClick={handleInitiatePayment}
                        disabled={isInitiatingPayment}
                        className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
                    >
                        {isInitiatingPayment ? 'Processing...' : 'Proceed to Payment'}
                    </button>
                </div>
            )}

            {/* Progress Indicator */}
            <div className="mt-8 flex justify-between">
                {[1, 2, 3, 4].map((step) => (
                    <div
                        key={step}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300'
                            }`}
                    >
                        {step}
                    </div>
                ))}
            </div>
        </div>
    );
};
