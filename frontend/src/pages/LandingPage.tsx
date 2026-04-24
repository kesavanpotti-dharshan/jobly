import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '@/store/themeStore';
import { BriefcaseBusiness, BarChart3, Clock, Zap, Moon, Sun, ArrowRight } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();
  const isDark = useThemeStore((s) => s.isDark);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  const bgColor = isDark ? '#0f0f1e' : '#f8f9fa';
  const textColor = isDark ? '#f1f5f9' : '#1e293b';
  const secondaryText = isDark ? '#94a3b8' : '#64748b';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const heroBg = isDark 
    ? 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(37,99,235,0.1) 100%)'
    : 'linear-gradient(135deg, rgba(124,58,237,0.05) 0%, rgba(37,99,235,0.05) 100%)';

  const features = [
    {
      icon: BriefcaseBusiness,
      title: 'Application Tracker',
      description: 'Organize and manage all your job applications in one centralized place.',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Visualize your job search funnel with detailed conversion metrics and trends.',
    },
    {
      icon: Clock,
      title: 'Smart Reminders',
      description: 'Never miss a follow-up with automated reminders for important deadlines.',
    },
    {
      icon: Zap,
      title: 'Real-time Insights',
      description: 'Get actionable insights on your application success rate and patterns.',
    },
  ];

  return (
    <div style={{ background: bgColor, color: textColor, minHeight: '100vh', transition: 'all 0.3s ease' }}>
      {/* Navbar */}
      <nav style={{ padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${cardBorder}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '24px', fontWeight: 700, background: 'linear-gradient(135deg, #c4b5fd, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          <BriefcaseBusiness size={28} style={{ color: isDark ? '#a78bfa' : '#7c3aed' }} />
          Jobly
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'transparent',
              border: 'none',
              color: textColor,
              cursor: 'pointer',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
            }}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
              borderRadius: '6px',
              color: textColor,
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '14px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Login
          </button>

          <button
            onClick={() => navigate('/register')}
            style={{
              padding: '10px 24px',
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(124,58,237,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '80px 32px', textAlign: 'center', background: heroBg }}>
        <h1 style={{ fontSize: '56px', fontWeight: 700, margin: '0 0 20px', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.2' }}>
          Your Personal Job Search Command Center
        </h1>
        <p style={{ fontSize: '20px', color: secondaryText, margin: '0 0 40px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.6' }}>
          Track applications, analyze your job search funnel, and land your dream role faster. Jobly makes job hunting organized, data-driven, and stress-free.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '60px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/register')}
            style={{
              padding: '14px 32px',
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(124,58,237,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Start for Free <ArrowRight size={18} />
          </button>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '14px 32px',
              background: cardBg,
              border: `1px solid ${cardBorder}`,
              borderRadius: '8px',
              color: textColor,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '16px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = cardBg;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Sign In
          </button>
        </div>

        {/* Demo Image Placeholder */}
        <div style={{
          maxWidth: '1000px',
          marginLeft: 'auto',
          marginRight: 'auto',
          background: cardBg,
          border: `1px solid ${cardBorder}`,
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          color: secondaryText,
          fontSize: '14px',
        }}>
          <p>Dashboard Preview (Screenshot would go here)</p>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 32px', maxWidth: '1400px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 700, margin: '0 0 16px' }}>Powerful Features Built for Job Seekers</h2>
          <p style={{ fontSize: '16px', color: secondaryText, margin: 0, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Everything you need to ace your job search and track your progress like a pro.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {features.map((feature) => (
            <div
              key={feature.title}
              style={{
                background: cardBg,
                border: `1px solid ${cardBorder}`,
                borderRadius: '12px',
                padding: '32px 24px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(124,58,237,0.05)';
                e.currentTarget.style.borderColor = isDark ? 'rgba(124,58,237,0.3)' : 'rgba(124,58,237,0.2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = cardBg;
                e.currentTarget.style.borderColor = cardBorder;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '16px', color: '#a78bfa' }}>
                <feature.icon size={40} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 12px' }}>{feature.title}</h3>
              <p style={{ fontSize: '14px', color: secondaryText, margin: 0, lineHeight: '1.6' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 32px', background: heroBg, textAlign: 'center' }}>
        <h2 style={{ fontSize: '40px', fontWeight: 700, margin: '0 0 16px' }}>Ready to Transform Your Job Search?</h2>
        <p style={{ fontSize: '16px', color: secondaryText, margin: '0 0 40px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          Join thousands of job seekers who are organizing their search and landing roles faster.
        </p>

        <button
          onClick={() => navigate('/register')}
          style={{
            padding: '14px 40px',
            background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '16px',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(124,58,237,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Get Started Today
        </button>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 32px', borderTop: `1px solid ${cardBorder}`, textAlign: 'center', color: secondaryText, fontSize: '14px' }}>
        <p style={{ margin: 0 }}>© 2026 Jobly. Built with ❤️ for job seekers everywhere.</p>
      </footer>
    </div>
  );
}