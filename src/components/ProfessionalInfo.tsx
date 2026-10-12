import React, { useState } from 'react';
import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { FormSchemaType } from '../types/form';
import { AlertCircle, X, Plus, Info } from 'lucide-react';

interface ProfessionalInfoProps {
  register: UseFormRegister<FormSchemaType>;
  errors: FieldErrors<FormSchemaType>;
  setValue: UseFormSetValue<FormSchemaType>;
  watch: UseFormWatch<FormSchemaType>;
}

export const ProfessionalInfo: React.FC<ProfessionalInfoProps> = ({
  register,
  errors,
  setValue,
  watch,
}) => {
  const selectedBeats = watch('beats') || [];
  const [customBeatInput, setCustomBeatInput] = useState('');
  const [customError, setCustomError] = useState<string | null>(null);

  const maxReached = selectedBeats.length >= 3;

  const handleAddBeat = (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed) return;

    // Check if input contains commas
    if (trimmed.includes(',')) {
      const parts = trimmed
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);

      let current = [...selectedBeats];
      let addedCount = 0;

      for (const part of parts) {
        if (!current.includes(part)) {
          if (current.length < 3) {
            current.push(part);
            addedCount++;
          }
        }
      }

      if (addedCount === 0 && current.length >= 3) {
        setCustomError('Maximum of 3 beats allowed.');
      } else {
        setValue('beats', current, { shouldValidate: true, shouldDirty: true });
        setCustomBeatInput('');
        setCustomError(null);
      }
      return;
    }

    // Single beat entry
    if (selectedBeats.includes(trimmed)) {
      setCustomError(`"${trimmed}" is already added.`);
      return;
    }

    if (selectedBeats.length >= 3) {
      setCustomError('Maximum of 3 beats allowed.');
      return;
    }

    const updated = [...selectedBeats, trimmed];
    setValue('beats', updated, { shouldValidate: true, shouldDirty: true });
    setCustomBeatInput('');
    setCustomError(null);
  };

  const handleRemoveBeat = (beatToRemove: string) => {
    const updated = selectedBeats.filter((b) => b !== beatToRemove);
    setValue('beats', updated, { shouldValidate: true, shouldDirty: true });
    setCustomError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddBeat(customBeatInput);
    }
  };

  return (
    <section className="form-card">
      <div className="card-header">
        <div className="card-title-group">
          <span className="badge-step">2</span>
          <h2 className="card-title">Professional Information</h2>
        </div>
        <span className="card-step-indicator">Step 2 of 5</span>
      </div>

      <div className="grid-stack">
        <div className="form-group">
          <label className="form-label" htmlFor="organisation">
            <span>Organisation / Media House <span className="required-star">*</span></span>
          </label>
          <input
            type="text"
            id="organisation"
            placeholder="e.g. BusinessDay, Channels TV, The Guardian"
            className={`input-field ${errors.organisation ? 'input-error' : ''}`}
            {...register('organisation')}
          />
          {errors.organisation && (
            <span className="field-error-msg">
              <AlertCircle size={13} /> {errors.organisation.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="orgAddress">
            <span>Organisation Address <span className="required-star">*</span></span>
          </label>
          <textarea
            id="orgAddress"
            rows={2}
            placeholder="Bureau or office address"
            className={`input-field ${errors.orgAddress ? 'input-error' : ''}`}
            {...register('orgAddress')}
          />
          {errors.orgAddress && (
            <span className="field-error-msg">
              <AlertCircle size={13} /> {errors.orgAddress.message}
            </span>
          )}
        </div>

        {/* Beats Selection Box */}
        <div className="beats-selection-box">
          <div className="beats-header">
            <div>
              <label className="form-label" htmlFor="beatsInput" style={{ marginBottom: 2 }}>
                <span>Number of Beat / Fields Covered <span className="required-star">*</span></span>
              </label>
              <p className="field-hint" style={{ marginTop: 0 }}>
                Type your beat and press Enter or click Add (Maximum of 3 selections).
              </p>
            </div>
            <span className={`beats-counter-pill ${maxReached ? 'limit-reached' : ''}`}>
              {selectedBeats.length} / 3 selected {maxReached && '(Limit reached)'}
            </span>
          </div>

          {/* Currently selected beats tags */}
          <div className="selected-beats-list">
            {selectedBeats.length === 0 ? (
              <span className="field-hint" style={{ fontStyle: 'italic', padding: '0.2rem' }}>
                No beats added yet. Enter your field or beat below.
              </span>
            ) : (
              selectedBeats.map((beat) => (
                <span key={beat} className="selected-beat-chip">
                  <span>{beat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBeat(beat)}
                    className="beat-remove-btn"
                    title={`Remove ${beat}`}
                    aria-label={`Remove ${beat}`}
                  >
                    <X size={13} />
                  </button>
                </span>
              ))
            )}
          </div>

          {/* Validation error message for beats */}
          {errors.beats && (
            <span className="field-error-msg" style={{ marginBottom: '0.75rem' }}>
              <AlertCircle size={13} /> {errors.beats.message}
            </span>
          )}
          {customError && (
            <span className="field-error-msg" style={{ marginBottom: '0.75rem' }}>
              <Info size={13} /> {customError}
            </span>
          )}

          {/* Custom Beat Input & Add Button */}
          <div className="custom-beat-row">
            <input
              id="beatsInput"
              type="text"
              placeholder={
                maxReached
                  ? 'Maximum of 3 beats reached'
                  : 'Enter beat name (e.g. CBN, Capital Market, Energy) & press Enter'
              }
              value={customBeatInput}
              disabled={maxReached}
              onChange={(e) => setCustomBeatInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="input-field"
              style={{ fontSize: '0.9rem', padding: '0.65rem 0.85rem' }}
            />
            <button
              type="button"
              disabled={maxReached || !customBeatInput.trim()}
              onClick={() => handleAddBeat(customBeatInput)}
              className="btn-add-beat"
            >
              <Plus size={15} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
              Add
            </button>
          </div>
          <p className="field-hint" style={{ marginTop: '0.4rem', fontSize: '11px', color: '#6b7280' }}>
            Must be separated with commas if entering multiple at once.
          </p>
        </div>
      </div>
    </section>
  );
};
