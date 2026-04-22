import { Outlet } from 'react-router-dom';
import { BriefcaseBusiness } from 'lucide-react';

export function AuthLayout() {
  return (
    <div className="auth-layout">
      {/* Ambient background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="auth-container">
        {/* Logo */}
        <div className="auth-logo">
          <span className="auth-logo-icon">
            <BriefcaseBusiness size={20} />
          </span>
          <span className="auth-logo-text">Jobly</span>
        </div>

        {/* Page content (Login or Register form) */}
        <Outlet />

        <p className="auth-footer">
          © {new Date().getFullYear()} Jobly. All rights reserved.
        </p>
      </div>

      <style>{`
        .auth-layout {
          min-height: 100dvh;
          background: #09090f;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', 'Geist', system-ui, sans-serif;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          pointer-events: none;
          animation: float 8s ease-in-out infinite;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #6d28d9, transparent 70%);
          top: -150px;
          left: -100px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #2563eb, transparent 70%);
          bottom: -100px;
          right: -80px;
          animation-delay: -3s;
        }

        .orb-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #0ea5e9, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -5s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-30px) scale(1.05); }
        }
        .orb-3 { animation-name: float-center; }
        @keyframes float-center {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50%       { transform: translate(-50%, calc(-50% - 20px)) scale(1.05); }
        }

        .auth-container {
          width: 100%;
          max-width: 440px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          position: relative;
          z-index: 10;
        }

        .auth-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #f8fafc;
        }

        .auth-logo-icon {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #6d28d9, #2563eb);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 0 24px rgba(109,40,217,0.5);
        }

        .auth-logo-text {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.5px;
          background: linear-gradient(135deg, #c4b5fd, #93c5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Glass card — used by login & register pages */
        .auth-card {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            0 4px 24px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .auth-card-title {
          font-size: 22px;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0 0 4px;
          letter-spacing: -0.3px;
        }

        .auth-card-subtitle {
          font-size: 14px;
          color: #94a3b8;
          margin: 0 0 1.75rem;
        }

        /* Form elements */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .auth-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .auth-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .auth-label {
          font-size: 13px;
          font-weight: 500;
          color: #cbd5e1;
        }

        .auth-input {
          width: 100%;
          height: 42px;
          padding: 0 14px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #f1f5f9;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
          box-sizing: border-box;
        }

        .auth-input::placeholder {
          color: #475569;
        }

        .auth-input:hover {
          border-color: rgba(255,255,255,0.2);
        }

        .auth-input:focus {
          border-color: #7c3aed;
          background: rgba(109,40,217,0.08);
          box-shadow: 0 0 0 3px rgba(109,40,217,0.2);
        }

        .auth-input.error {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.15);
        }

        .auth-error {
          font-size: 12px;
          color: #f87171;
          margin-top: 2px;
        }

        .auth-submit {
          width: 100%;
          height: 44px;
          margin-top: 0.25rem;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          border: none;
          border-radius: 10px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.1s, box-shadow 0.15s;
          box-shadow: 0 4px 16px rgba(109,40,217,0.4);
          letter-spacing: 0.2px;
        }

        .auth-submit:hover:not(:disabled) {
          opacity: 0.92;
          box-shadow: 0 6px 20px rgba(109,40,217,0.55);
        }

        .auth-submit:active:not(:disabled) {
          transform: scale(0.98);
        }

        .auth-submit:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #475569;
          font-size: 12px;
          margin: 0.25rem 0;
        }

        .auth-divider::before,
        .auth-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }

        .auth-link-row {
          text-align: center;
          font-size: 13px;
          color: #64748b;
          margin-top: 0.25rem;
        }

        .auth-link {
          color: #a78bfa;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.15s;
        }

        .auth-link:hover {
          color: #c4b5fd;
          text-decoration: underline;
        }

        .auth-api-error {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          color: #fca5a5;
        }

        .auth-footer {
          font-size: 12px;
          color: #334155;
          text-align: center;
          margin: 0;
        }

        /* Spinner */
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          display: inline-block;
          animation: spin 0.6s linear infinite;
          vertical-align: middle;
          margin-right: 6px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
