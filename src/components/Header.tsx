import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="portal-header">
      <div className="portal-header-inner">
        <div className="portal-brand">
          <div className="logo-container" title="Finance Correspondents Association of Nigeria">
            <img 
              src="/logo-bg.jpg" 
              alt="FICAN Emblem" 
              className="logo-image" 
            />
          </div>
          <div>
            <span className="portal-badge">Official Portal</span>
            <h1 className="portal-title">FICAN Data Collection</h1>
            <p className="portal-subtext">
              Finance Correspondents Association of Nigeria • Member Registration
            </p>
          </div>
        </div>

        <div className="portal-header-meta">
          <div className="portal-pill portal-pill-gold">
            <ShieldCheck size={14} />
            <span>Official Member Registry</span>
          </div>
        </div>
      </div>
    </header>
  );
};
