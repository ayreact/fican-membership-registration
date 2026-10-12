import React from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { FormSchemaType } from '../types/form';
import { AlertCircle } from 'lucide-react';

interface NextOfKinSectionProps {
  register: UseFormRegister<FormSchemaType>;
  errors: FieldErrors<FormSchemaType>;
}

export const NextOfKinSection: React.FC<NextOfKinSectionProps> = ({ register, errors }) => {
  return (
    <div className="next-of-kin-container">
      {/* Section 4: Next of Kin 1 */}
      <section className="form-card" style={{ marginTop: '1.25rem' }}>
        <div className="card-header">
          <div className="card-title-group">
            <span className="badge-step">4</span>
            <h2 className="card-title">Next of Kin 1</h2>
          </div>
          <span className="card-step-indicator">Step 4 of 5</span>
        </div>

        <div className="grid-stack">
          <div className="form-group">
            <label className="form-label" htmlFor="nok1Name">
              <span>Full Name <span className="required-star">*</span></span>
            </label>
            <input
              type="text"
              id="nok1Name"
              placeholder="Full name of Next of Kin"
              className={`input-field ${errors.nok1Name ? 'input-error' : ''}`}
              {...register('nok1Name')}
            />
            {errors.nok1Name && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.nok1Name.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="nok1Phone">
              <span>Phone Number <span className="required-star">*</span></span>
            </label>
            <input
              type="tel"
              id="nok1Phone"
              placeholder="0800 000 0000"
              className={`input-field ${errors.nok1Phone ? 'input-error' : ''}`}
              {...register('nok1Phone')}
            />
            {errors.nok1Phone && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.nok1Phone.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="nok1Address">
              <span>Residential Address <span className="required-star">*</span></span>
            </label>
            <textarea
              id="nok1Address"
              rows={2}
              placeholder="Street name, City, State"
              className={`input-field ${errors.nok1Address ? 'input-error' : ''}`}
              {...register('nok1Address')}
            />
            {errors.nok1Address && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.nok1Address.message}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Section 5: Next of Kin 2 */}
      <section className="form-card" style={{ marginTop: '1.25rem' }}>
        <div className="card-header">
          <div className="card-title-group">
            <span className="badge-step">5</span>
            <h2 className="card-title">Next of Kin 2</h2>
          </div>
          <span className="card-step-indicator">Step 5 of 5</span>
        </div>

        <div className="grid-stack">
          <div className="form-group">
            <label className="form-label" htmlFor="nok2Name">
              <span>Full Name <span className="required-star">*</span></span>
            </label>
            <input
              type="text"
              id="nok2Name"
              placeholder="Full name of Second Next of Kin"
              className={`input-field ${errors.nok2Name ? 'input-error' : ''}`}
              {...register('nok2Name')}
            />
            {errors.nok2Name && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.nok2Name.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="nok2Phone">
              <span>Phone Number <span className="required-star">*</span></span>
            </label>
            <input
              type="tel"
              id="nok2Phone"
              placeholder="0800 000 0000"
              className={`input-field ${errors.nok2Phone ? 'input-error' : ''}`}
              {...register('nok2Phone')}
            />
            {errors.nok2Phone && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.nok2Phone.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="nok2Address">
              <span>Residential Address <span className="required-star">*</span></span>
            </label>
            <textarea
              id="nok2Address"
              rows={2}
              placeholder="Street name, City, State"
              className={`input-field ${errors.nok2Address ? 'input-error' : ''}`}
              {...register('nok2Address')}
            />
            {errors.nok2Address && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.nok2Address.message}
              </span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
