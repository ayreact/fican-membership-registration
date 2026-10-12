import React from 'react';
import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { FormSchemaType } from '../types/form';
import { AlertCircle, CreditCard } from 'lucide-react';
import { BankSelector } from './BankSelector';

interface BankDetailsProps {
  register: UseFormRegister<FormSchemaType>;
  errors: FieldErrors<FormSchemaType>;
  setValue: UseFormSetValue<FormSchemaType>;
  watch: UseFormWatch<FormSchemaType>;
}

export const BankDetails: React.FC<BankDetailsProps> = ({
  register,
  errors,
  setValue,
  watch,
}) => {
  const currentBankName = watch('bankName') || '';

  return (
    <section className="form-card">
      <div className="card-header">
        <div className="card-title-group">
          <span className="badge-step">3</span>
          <h2 className="card-title">Bank Details</h2>
        </div>
        <span className="card-step-indicator">Step 3 of 5</span>
      </div>

      <div className="grid-stack">
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label" htmlFor="bankName">
              <span>Bank Name <span className="required-star">*</span></span>
            </label>
            <BankSelector
              id="bankName"
              value={currentBankName}
              onChange={(val) => {
                setValue('bankName', val, { shouldValidate: true, shouldDirty: true });
              }}
              error={errors.bankName?.message}
            />
            {errors.bankName && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.bankName.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="accountNumber">
              <span>Account Number <span className="required-star">*</span></span>
              <span className="field-hint" style={{ margin: 0 }}>10-digit NUBAN</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                id="accountNumber"
                maxLength={10}
                placeholder="10-digit NUBAN"
                className={`input-field ${errors.accountNumber ? 'input-error' : ''}`}
                style={{ fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.05em' }}
                {...register('accountNumber')}
              />
              <CreditCard
                size={16}
                color="#9ca3af"
                style={{ position: 'absolute', right: 12, top: 14, pointerEvents: 'none' }}
              />
            </div>
            {errors.accountNumber && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.accountNumber.message}
              </span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="accountName">
            <span>Account Name <span className="required-star">*</span></span>
          </label>
          <input
            type="text"
            id="accountName"
            placeholder="As registered with your bank"
            className={`input-field ${errors.accountName ? 'input-error' : ''}`}
            {...register('accountName')}
          />
          {errors.accountName && (
            <span className="field-error-msg">
              <AlertCircle size={13} /> {errors.accountName.message}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
