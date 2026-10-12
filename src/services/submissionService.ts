import type { FormSchemaType } from '../types/form';

export interface SubmissionResponse {
  success: boolean;
  message: string;
  isDemo?: boolean;
  timestamp: string;
}

export async function submitRegistration(data: FormSchemaType): Promise<SubmissionResponse> {
  const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL || '';
  const isPlaceholderUrl = !scriptUrl || scriptUrl.includes('YOUR_SCRIPT_ID');

  const payload = {
    timestamp: new Date().toISOString(),
    submittedAt: new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }),
    fullName: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    dob: data.dob,
    maritalStatus: data.maritalStatus || 'Not Specified',
    stateOrigin: data.stateOrigin,
    phone: data.phone.trim(),
    altPhone: data.altPhone?.trim() || 'N/A',
    religion: data.religion || 'Not Specified',
    organisation: data.organisation.trim(),
    orgAddress: data.orgAddress.trim(),
    beats: data.beats.join(', '),
    beatsCount: data.beats.length,
    bankName: data.bankName,
    accountName: data.accountName.trim(),
    accountNumber: data.accountNumber.trim(),
    nok1Name: data.nok1Name.trim(),
    nok1Phone: data.nok1Phone.trim(),
    nok1Address: data.nok1Address.trim(),
    nok2Name: data.nok2Name.trim(),
    nok2Phone: data.nok2Phone.trim(),
    nok2Address: data.nok2Address.trim(),
  };

  if (isPlaceholderUrl) {
    // Artificial slight delay for realistic UX feedback
    await new Promise((resolve) => setTimeout(resolve, 1400));
    console.warn(
      '⚠️ VITE_GOOGLE_SHEETS_URL is configured with placeholder "YOUR_SCRIPT_ID". Showing demo success.'
    );
    return {
      success: true,
      isDemo: true,
      message: 'Demo Submission Successful! Configure your real Google Apps Script URL in .env.local to persist directly into Google Sheets.',
      timestamp: payload.submittedAt,
    };
  }

  try {
    // Google Apps Script endpoint requires 'no-cors' to bypass CORS restrictions
    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      isDemo: false,
      message: 'Your registration has been securely transmitted and recorded in the FICAN database.',
      timestamp: payload.submittedAt,
    };
  } catch (error) {
    console.error('Submission failed:', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Network error occurred while submitting data. Please check your connection and try again.'
    );
  }
}
