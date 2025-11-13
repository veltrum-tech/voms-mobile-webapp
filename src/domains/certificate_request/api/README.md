# Certificate Public Services API

This module contains RTK Query endpoints for the VOMS public services API, specifically for certificate migration and ownership transfer operations.

## Available Endpoints

### Migration Endpoints

#### 1. Verify VIN
Verifies if a VIN is valid and eligible for certificate migration.

```typescript
import { useVerifyVinMutation } from './certificate.api';

const [verifyVin, { isLoading, error }] = useVerifyVinMutation();

const handleVerifyVin = async () => {
  try {
    const result = await verifyVin({ vin: '1HGBH41JXMN109186' }).unwrap();
    console.log('VIN verified:', result);
  } catch (err) {
    console.error('Verification failed:', err);
  }
};
```

#### 2. Submit Migration Info
Submits detailed vehicle and owner information for certificate migration.

```typescript
import { useSubmitMigrationInfoMutation } from './certificate.api';

const [submitInfo, { isLoading }] = useSubmitMigrationInfoMutation();

const handleSubmit = async (requestId: string) => {
  try {
    const result = await submitInfo({
      requestId,
      data: {
        request_id: requestId,
        state: 'Lagos',
        lga_id: 'uuid-lga-id',
        certificate_number: 'CERT-2023-12345',
        issue_date: '2023-01-15',
        plate_number: 'ABC-123-DE',
        purpose: 'Proof of Ownership',
        owner_name: 'Adebayo Ogunleye',
        owner_address: '123 Victoria Island, Lagos, Nigeria',
        engine_number: '1ZZ-FE-12345678',
        title: 'Mr',
        telephone: '+2348012345678',
        email: 'adebayo.ogunleye@email.com',
      },
    }).unwrap();
    console.log('Info submitted:', result);
  } catch (err) {
    console.error('Submission failed:', err);
  }
};
```

#### 3. Upload Certificate
Uploads the physical certificate document for migration.

```typescript
import { useUploadMigrationCertificateMutation } from './certificate.api';

const [uploadCertificate] = useUploadMigrationCertificateMutation();

const handleUpload = async (requestId: string, file: File) => {
  const formData = new FormData();
  formData.append('certificate', file);
  
  try {
    const result = await uploadCertificate({
      requestId,
      file: formData,
    }).unwrap();
    console.log('Certificate uploaded:', result);
  } catch (err) {
    console.error('Upload failed:', err);
  }
};
```

#### 4. Initiate Payment (Migration)
Initiates payment process for certificate migration.

```typescript
import { useInitiateMigrationPaymentMutation } from './certificate.api';

const [initiatePayment] = useInitiateMigrationPaymentMutation();

const handlePayment = async (requestId: string) => {
  try {
    const result = await initiatePayment({
      requestId,
      data: {
        request_id: requestId,
        amount: 5000,
      },
    }).unwrap();
    
    // Redirect to payment URL
    window.location.href = result.data?.payment_url || '';
  } catch (err) {
    console.error('Payment initiation failed:', err);
  }
};
```

### Transfer (Change of Ownership) Endpoints

#### 1. Verify Certificate
Verifies if a certificate number is valid for ownership transfer.

```typescript
import { useVerifyCertificateMutation } from './certificate.api';

const [verifyCertificate] = useVerifyCertificateMutation();

const handleVerify = async () => {
  try {
    const result = await verifyCertificate({
      certificate_number: 'CERT-2023-12345',
    }).unwrap();
    console.log('Certificate verified:', result);
  } catch (err) {
    console.error('Verification failed:', err);
  }
};
```

#### 2. Send OTP
Sends OTP to current owner for verification.

```typescript
import { useSendTransferOtpMutation } from './certificate.api';

const [sendOtp] = useSendTransferOtpMutation();

const handleSendOtp = async (requestId: string) => {
  try {
    const result = await sendOtp({
      requestId,
      data: {
        request_id: requestId,
        method: 'email', // or 'sms'
      },
    }).unwrap();
    console.log('OTP sent:', result);
  } catch (err) {
    console.error('Failed to send OTP:', err);
  }
};
```

#### 3. Verify OTP
Verifies the OTP sent to current owner.

```typescript
import { useVerifyTransferOtpMutation } from './certificate.api';

const [verifyOtp] = useVerifyTransferOtpMutation();

const handleVerifyOtp = async (requestId: string, otpCode: string) => {
  try {
    const result = await verifyOtp({
      requestId,
      data: {
        request_id: requestId,
        otp: otpCode,
      },
    }).unwrap();
    console.log('OTP verified:', result);
  } catch (err) {
    console.error('OTP verification failed:', err);
  }
};
```

#### 4. Submit Transfer Info
Submits new owner information for ownership transfer.

```typescript
import { useSubmitTransferInfoMutation } from './certificate.api';

const [submitTransfer] = useSubmitTransferInfoMutation();

const handleSubmitTransfer = async (requestId: string) => {
  try {
    const result = await submitTransfer({
      requestId,
      data: {
        request_id: requestId,
        new_owner_name: 'Funmi Adeyemi',
        new_owner_address: '456 Lekki Phase 1, Lagos, Nigeria',
        new_owner_phone: '+2348098765432',
        new_owner_email: 'funmi.adeyemi@email.com',
        new_plate_number: 'XYZ-789-GH',
      },
    }).unwrap();
    console.log('Transfer info submitted:', result);
  } catch (err) {
    console.error('Submission failed:', err);
  }
};
```

#### 5. Initiate Payment (Transfer)
Initiates payment process for ownership transfer.

```typescript
import { useInitiateTransferPaymentMutation } from './certificate.api';

const [initiatePayment] = useInitiateTransferPaymentMutation();

const handlePayment = async (requestId: string) => {
  try {
    const result = await initiatePayment({
      requestId,
      data: {
        request_id: requestId,
        amount: 5000,
      },
    }).unwrap();
    
    // Redirect to payment URL
    window.location.href = result.data?.payment_url || '';
  } catch (err) {
    console.error('Payment initiation failed:', err);
  }
};
```

### Request Status Endpoint

Get the current status of a migration or transfer request.

```typescript
import { useGetRequestStatusQuery } from './certificate.api';

// Using the hook directly (auto-fetches on mount)
const { data, isLoading, error } = useGetRequestStatusQuery('request-id-123');

// Or use lazy query for manual triggering
import { useLazyGetRequestStatusQuery } from './certificate.api';

const [getStatus, { data, isLoading }] = useLazyGetRequestStatusQuery();

const handleCheckStatus = async (requestId: string) => {
  try {
    const result = await getStatus(requestId).unwrap();
    console.log('Request status:', result);
  } catch (err) {
    console.error('Failed to get status:', err);
  }
};
```

## Complete Flow Examples

### Certificate Migration Flow

```typescript
const CertificateMigration = () => {
  const [verifyVin] = useVerifyVinMutation();
  const [submitInfo] = useSubmitMigrationInfoMutation();
  const [uploadCert] = useUploadMigrationCertificateMutation();
  const [initiatePayment] = useInitiateMigrationPaymentMutation();
  
  const [requestId, setRequestId] = useState<string>('');

  // Step 1: Verify VIN
  const handleStep1 = async (vin: string) => {
    const result = await verifyVin({ vin }).unwrap();
    if (result.success) {
      // Proceed to step 2
    }
  };

  // Step 2: Submit Info
  const handleStep2 = async (data: SubmitMigrationInfoRequest) => {
    const result = await submitInfo({ requestId, data }).unwrap();
    if (result.success) {
      // Proceed to step 3
    }
  };

  // Step 3: Upload Certificate
  const handleStep3 = async (file: File) => {
    const formData = new FormData();
    formData.append('certificate', file);
    const result = await uploadCert({ requestId, file: formData }).unwrap();
    if (result.success) {
      // Proceed to step 4
    }
  };

  // Step 4: Initiate Payment
  const handleStep4 = async () => {
    const result = await initiatePayment({
      requestId,
      data: { request_id: requestId, amount: 5000 }
    }).unwrap();
    if (result.data?.payment_url) {
      window.location.href = result.data.payment_url;
    }
  };

  return (
    // Your component JSX
  );
};
```

### Change of Ownership Flow

```typescript
const ChangeOfOwnership = () => {
  const [verifyCert] = useVerifyCertificateMutation();
  const [sendOtp] = useSendTransferOtpMutation();
  const [verifyOtp] = useVerifyTransferOtpMutation();
  const [submitTransfer] = useSubmitTransferInfoMutation();
  const [initiatePayment] = useInitiateTransferPaymentMutation();
  
  const [requestId, setRequestId] = useState<string>('');

  // Step 1: Verify Certificate
  const handleStep1 = async (certNumber: string) => {
    const result = await verifyCert({ certificate_number: certNumber }).unwrap();
    if (result.success) {
      // Proceed to step 2
    }
  };

  // Step 2: Send OTP
  const handleStep2 = async () => {
    const result = await sendOtp({
      requestId,
      data: { request_id: requestId, method: 'email' }
    }).unwrap();
    if (result.success) {
      // Proceed to step 3
    }
  };

  // Step 3: Verify OTP
  const handleStep3 = async (otpCode: string) => {
    const result = await verifyOtp({
      requestId,
      data: { request_id: requestId, otp: otpCode }
    }).unwrap();
    if (result.success) {
      // Proceed to step 4
    }
  };

  // Step 4: Submit Transfer Info
  const handleStep4 = async (data: SubmitTransferRequest) => {
    const result = await submitTransfer({ requestId, data }).unwrap();
    if (result.success) {
      // Proceed to step 5
    }
  };

  // Step 5: Initiate Payment
  const handleStep5 = async () => {
    const result = await initiatePayment({
      requestId,
      data: { request_id: requestId, amount: 5000 }
    }).unwrap();
    if (result.data?.payment_url) {
      window.location.href = result.data.payment_url;
    }
  };

  return (
    // Your component JSX
  );
};
```

## TypeScript Types

All request and response types are exported from the models:

```typescript
import type {
  VerifyVinRequest,
  VerifyVinResponse,
  SubmitMigrationInfoRequest,
  SubmitMigrationInfoResponse,
  VerifyCertificateRequest,
  VerifyCertificateResponse,
  // ... and more
} from '../models';
```

## Error Handling

All mutations return standard RTK Query error objects:

```typescript
const [mutate, { isLoading, error, isError }] = useSomeMutation();

if (isError) {
  // error.status - HTTP status code
  // error.data - Response body
  console.error('Error:', error);
}
```
