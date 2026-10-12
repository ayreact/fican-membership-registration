import React from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { FormSchemaType } from '../types/form';
import { NIGERIAN_STATES, MARITAL_STATUS_OPTIONS, RELIGION_OPTIONS } from '../types/form';
import { AlertCircle } from 'lucide-react';

interface PersonalInfoProps {
  register: UseFormRegister<FormSchemaType>;
  errors: FieldErrors<FormSchemaType>;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ register, errors }) => {
  return (
    <section className="form-card">
      <div className="card-header">
        <div className="card-title-group">
          <span className="badge-step">1</span>
          <h2 className="card-title">Personal Information</h2>
        </div>
        <span className="card-step-indicator">Step 1 of 5</span>
      </div>

      <div className="grid-stack">
        {/* Full Name & Email: Stacked on mobile, side-by-side on tablet/desktop */}
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">
              <span>Full Name <span className="required-star">*</span></span>
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="First, Middle & Surname"
              className={`input-field ${errors.fullName ? 'input-error' : ''}`}
              {...register('fullName')}
            />
            {errors.fullName && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.fullName.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              <span>Email Address <span className="required-star">*</span></span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@mediahouse.ng"
              className={`input-field ${errors.email ? 'input-error' : ''}`}
              {...register('email')}
            />
            {errors.email && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.email.message}
              </span>
            )}
          </div>
        </div>

        {/* DOB, Marital Status & State of Origin */}
        <div className="grid-3">
          <div className="form-group">
            <label className="form-label" htmlFor="dob">
              <span>Date of Birth <span className="required-star">*</span></span>
            </label>
            <input
              type="date"
              id="dob"
              className={`input-field ${errors.dob ? 'input-error' : ''}`}
              {...register('dob')}
            />
            {errors.dob && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.dob.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="maritalStatus">
              <span>Marital Status</span>
            </label>
            <select
              id="maritalStatus"
              className="input-field"
              {...register('maritalStatus')}
            >
              <option value="">Select Status</option>
              {MARITAL_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="stateOrigin">
              <span>State of Origin <span className="required-star">*</span></span>
            </label>
            <select
              id="stateOrigin"
              className={`input-field ${errors.stateOrigin ? 'input-error' : ''}`}
              {...register('stateOrigin')}
            >
              <option value="">Select State</option>
              {NIGERIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.stateOrigin && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.stateOrigin.message}
              </span>
            )}
          </div>
        </div>

        {/* Phone & Alternative Phone */}
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              <span>Phone Number <span className="required-star">*</span></span>
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="0803 000 0000"
              className={`input-field ${errors.phone ? 'input-error' : ''}`}
              {...register('phone')}
            />
            {errors.phone && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.phone.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="altPhone">
              <span>Alternative Phone Number</span>
            </label>
            <input
              type="tel"
              id="altPhone"
              placeholder="0812 000 0000"
              className={`input-field ${errors.altPhone ? 'input-error' : ''}`}
              {...register('altPhone')}
            />
            {errors.altPhone && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.altPhone.message}
              </span>
            )}
          </div>
        </div>

        {/* Religion */}
        <div className="form-group" style={{ maxWidth: '420px' }}>
          <label className="form-label" htmlFor="religion">
            <span>Religion</span>
          </label>
          <select
            id="religion"
            className="input-field"
            {...register('religion')}
          >
            <option value="">Select Religion</option>
            {RELIGION_OPTIONS.map((rel) => (
              <option key={rel} value={rel}>
                {rel}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};
