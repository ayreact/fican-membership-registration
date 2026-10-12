import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Download, RefreshCw, X, ShieldCheck, AlertTriangle } from 'lucide-react';
import type { FormSchemaType } from '../types/form';

interface SubmissionSuccessModalProps {
  data: FormSchemaType;
  isDemo?: boolean;
  message?: string;
  onClose: () => void;
  onReset: () => void;
}

export const SubmissionSuccessModal: React.FC<SubmissionSuccessModalProps> = ({
  data,
  isDemo,
  message,
  onClose,
  onReset,
}) => {
  useEffect(() => {
    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#004d28', '#c5a059', '#16a34a', '#ffffff'],
      });
    } catch {
      // ignore in environments without canvas support
    }
  }, []);

  const handleDownloadSummary = () => {
    const summaryText = `
======================================================
  FINANCE CORRESPONDENTS ASSOCIATION OF NIGERIA (FICAN)
              OFFICIAL MEMBERSHIP RECORD
======================================================
Generated: ${new Date().toLocaleString('en-NG')}

[MEMBER PERSONAL INFORMATION]
Full Name:         ${data.fullName}
Email Address:     ${data.email}
Date of Birth:     ${data.dob}
Marital Status:    ${data.maritalStatus || 'N/A'}
State of Origin:   ${data.stateOrigin}
Phone Number:      ${data.phone}
Alternative Phone: ${data.altPhone || 'N/A'}
Religion:          ${data.religion || 'N/A'}

[PROFESSIONAL INFORMATION]
Organisation:      ${data.organisation}
Office Address:    ${data.orgAddress}
Assigned Beats:    ${data.beats.join(', ')}

[BANK DETAILS]
Bank:              ${data.bankName}
Account Name:      ${data.accountName}
Account Number:    ${data.accountNumber}

[NEXT OF KIN 1]
Name:              ${data.nok1Name}
Phone:             ${data.nok1Phone}
Address:           ${data.nok1Address}

[NEXT OF KIN 2]
Name:              ${data.nok2Name}
Phone:             ${data.nok2Phone}
Address:           ${data.nok2Address}

======================================================
  Verification Reference: FICAN-${Date.now().toString().slice(-8)}
======================================================
`.trim();

    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FICAN-Registration-${data.fullName.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: '#e8f5ec',
              color: '#004d28',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.75rem',
            }}
          >
            <CheckCircle2 size={34} color="#004d28" />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#004d28', margin: 0 }}>
            Registration Successful!
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '0.35rem' }}>
            {message || 'Your membership data has been securely received by FICAN.'}
          </p>

          {isDemo && (
            <div
              style={{
                marginTop: '0.75rem',
                padding: '0.6rem 0.85rem',
                backgroundColor: '#fffbeb',
                border: '1px solid #fef3c7',
                borderRadius: '8px',
                fontSize: '0.775rem',
                color: '#92400e',
                textAlign: 'left',
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'flex-start',
              }}
            >
              <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong>Notice:</strong> Using default demo script URL. To record live submissions
                into your Google Sheet, update <code>VITE_GOOGLE_SHEETS_URL</code> in <code>.env.local</code>.
              </div>
            </div>
          )}
        </div>

        {/* Member receipt details */}
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img
                src="/logo-bg.jpg"
                alt="FICAN"
                style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'contain', border: '1px solid #c5a059' }}
              />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#004d28', textTransform: 'uppercase' }}>
                Registration Summary
              </span>
            </div>
            <span
              style={{
                fontSize: '0.7rem',
                color: '#64748b',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <ShieldCheck size={12} color="#16a34a" /> Verified Entry
            </span>
          </div>

          <table className="receipt-table">
            <tbody>
              <tr>
                <td>Member Name:</td>
                <td>{data.fullName}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{data.email}</td>
              </tr>
              <tr>
                <td>Media House:</td>
                <td>{data.organisation}</td>
              </tr>
              <tr>
                <td>Covered Beats:</td>
                <td>{data.beats.join(', ')}</td>
              </tr>
              <tr>
                <td>Bank & Account:</td>
                <td>{data.bankName} • ****{data.accountNumber.slice(-4)}</td>
              </tr>
              <tr>
                <td>State:</td>
                <td>{data.stateOrigin}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={handleDownloadSummary}
            className="btn-submit"
            style={{
              flex: 1,
              backgroundColor: '#004d28',
              color: '#ffffff',
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
            }}
          >
            <Download size={16} />
            <span>Download Receipt</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="btn-submit"
            style={{
              flex: 1,
              backgroundColor: '#f3f4f6',
              color: '#374151',
              boxShadow: 'none',
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
            }}
          >
            <RefreshCw size={15} />
            <span>New Submission</span>
          </button>
        </div>
      </div>
    </div>
  );
};
