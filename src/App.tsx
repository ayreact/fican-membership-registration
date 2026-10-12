import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormSchemaType } from './types/form';
import { submitRegistration, type SubmissionResponse } from './services/submissionService';
import { Header } from './components/Header';
import { PersonalInfo } from './components/PersonalInfo';
import { ProfessionalInfo } from './components/ProfessionalInfo';
import { BankDetails } from './components/BankDetails';
import { NextOfKinSection } from './components/NextOfKinSection';
import { SubmissionSuccessModal } from './components/SubmissionSuccessModal';
import { ArrowRight, AlertCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);
  const [submittedData, setSubmittedData] = useState<FormSchemaType | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      dob: '',
      maritalStatus: '',
      stateOrigin: '',
      phone: '',
      altPhone: '',
      religion: '',
      organisation: '',
      orgAddress: '',
      beats: [],
      bankName: '',
      accountName: '',
      accountNumber: '',
      nok1Name: '',
      nok1Phone: '',
      nok1Address: '',
      nok2Name: '',
      nok2Phone: '',
      nok2Address: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: FormSchemaType) => {
    setSubmitError(null);
    try {
      const response = await submitRegistration(data);
      setSubmissionResult(response);
      setSubmittedData(data);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred during submission. Please try again.'
      );
    }
  };

  const handleResetForm = () => {
    reset();
    setSubmittedData(null);
    setSubmissionResult(null);
    setSubmitError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalErrors = Object.keys(errors).length;

  return (
    <div className="app-container">
      <main className="content-wrapper">
        <Header />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <PersonalInfo register={register} errors={errors} />

          <ProfessionalInfo
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />

          <BankDetails
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />

          <NextOfKinSection register={register} errors={errors} />

          {/* Form Action Area */}
          <div className="submit-section">
            {submitError && (
              <div
                style={{
                  width: '100%',
                  maxWidth: '480px',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                  color: '#991b1b',
                  fontSize: '0.8125rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>{submitError}</div>
                <button
                  type="button"
                  onClick={() => handleSubmit(onSubmit)()}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#991b1b',
                    cursor: 'pointer',
                    fontWeight: 700,
                    textDecoration: 'underline',
                  }}
                >
                  Retry
                </button>
              </div>
            )}

            {totalErrors > 0 && !submitError && (
              <div
                style={{
                  width: '100%',
                  maxWidth: '480px',
                  background: '#fffbeb',
                  border: '1px solid #fde68a',
                  borderRadius: '8px',
                  padding: '0.65rem 0.875rem',
                  color: '#92400e',
                  fontSize: '0.775rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <AlertCircle size={15} style={{ flexShrink: 0 }} />
                <span>
                  Please complete the {totalErrors} required {totalErrors === 1 ? 'field' : 'fields'} highlighted in red before submitting.
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-submit"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner" />
                  <span>Securing & Submitting Data...</span>
                </>
              ) : (
                <>
                  <span>Submit Registration</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0, textAlign: 'center' }}>
              Finance Correspondents Association of Nigeria (FICAN)
            </p>
          </div>
        </form>
      </main>

      {/* Success Modal */}
      {submittedData && (
        <SubmissionSuccessModal
          data={submittedData}
          isDemo={submissionResult?.isDemo}
          message={submissionResult?.message}
          onClose={() => setSubmittedData(null)}
          onReset={handleResetForm}
        />
      )}
    </div>
  );
};

export default App;
