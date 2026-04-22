import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function AnalyticsPage() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const { data: analyticsData, isLoading, error } = useAnalytics(
    dateRange.start
      ? {
          startDate: dateRange.start,
          endDate: dateRange.end,
        }
      : undefined
  );

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  // Transform data for funnel chart
  const funnelData = analyticsData
    ? [
        { name: 'Saved', value: analyticsData.saved || 0 },
        { name: 'Applied', value: analyticsData.applied || 0 },
        { name: 'Phone Screen', value: analyticsData.phoneScreen || 0 },
        { name: 'Interview', value: analyticsData.interview || 0 },
        { name: 'Technical Assessment', value: analyticsData.technicalAssessment || 0 },
      ]
    : [];

  // Calculate conversion rates
  const calculateConversion = (current: number, total: number) => {
    return total > 0 ? ((current / total) * 100).toFixed(1) : '0';
  };

  const total = funnelData.reduce((sum, item) => sum + item.value, 0);

  // Colors for pie chart
  const COLORS = ['#93c5fd', '#d8b4fe', '#fbbf24', '#86efac', '#fca5a5'];

  // Pie data
  const pieData = funnelData.filter((item) => item.value > 0);

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f1e', color: '#f1f5f9', padding: '32px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#a78bfa',
            cursor: 'pointer',
            fontSize: '14px',
            marginBottom: '16px',
          }}
        >
          <ArrowLeft size={16} /> Back to dashboard
        </button>
        <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 8px' }}>Analytics</h1>
        <p style={{ color: '#94a3b8', margin: 0 }}>Track your job application funnel and progression.</p>
      </div>

      {/* Filters */}
      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '32px',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }}>Start Date</label>
          <input
            type="date"
            name="start"
            value={dateRange.start}
            onChange={handleDateChange}
            style={{
              padding: '8px 12px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              color: '#f1f5f9',
              fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }}>End Date</label>
          <input
            type="date"
            name="end"
            value={dateRange.end}
            onChange={handleDateChange}
            style={{
              padding: '8px 12px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              color: '#f1f5f9',
              fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>

        <button
          onClick={() => setDateRange({ start: '', end: '' })}
          style={{
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            color: '#cbd5e1',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 500,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
          }}
        >
          Clear filters
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
          Loading analytics...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '8px',
            padding: '16px',
            color: '#fca5a5',
            marginBottom: '24px',
          }}
        >
          Error loading analytics. Please try again.
        </div>
      )}

      {/* Content */}
      {!isLoading && analyticsData && (
        <>
          {/* Key Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {[
              { label: 'Total applications', value: total, icon: '📋', color: '#93c5fd' },
              { label: 'Saved', value: analyticsData.saved || 0, icon: '📌', color: '#94a3b8' },
              { label: 'Applied', value: analyticsData.applied || 0, icon: '✈️', color: '#93c5fd' },
              { label: 'Phone screen', value: analyticsData.phoneScreen || 0, icon: '☎️', color: '#fbbf24' },
              { label: 'Interview', value: analyticsData.interview || 0, icon: '🎤', color: '#d8b4fe' },
              { label: 'Technical assessment', value: analyticsData.technicalAssessment || 0, icon: '💻', color: '#a78bfa' },
            ].map((metric) => (
              <div
                key={metric.label}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                }}
              >
                <div style={{ fontSize: '24px' }}>{metric.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px', fontWeight: 500 }}>{metric.label}</p>
                  <p style={{ fontSize: '22px', fontWeight: 700, margin: 0, color: metric.color }}>
                    {metric.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Funnel Chart - Horizontal Bar */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 20px', color: '#f1f5f9' }}>Application Funnel</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 140, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={130} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(26,26,46,0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                  }}
                  formatter={(value: any) => [value, 'Count']}
                />
                <Bar dataKey="value" fill="#a78bfa" />
              </BarChart>
            </ResponsiveContainer>

            {/* Detailed Breakdown */}
            <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
              {funnelData.map((stage, idx) => (
                <div key={stage.name} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '12px', borderLeft: `3px solid ${COLORS[idx % COLORS.length]}` }}>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px', fontWeight: 500 }}>{stage.name}</p>
                  <p style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 6px', color: COLORS[idx % COLORS.length] }}>
                    {stage.value}
                  </p>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>
                    {calculateConversion(stage.value, total)}% of total
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pie Chart - Distribution */}
          {pieData.length > 0 && (
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 20px', color: '#f1f5f9' }}>Application Distribution</h2>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#a78bfa"
                      dataKey="value"
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(26,26,46,0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#f1f5f9',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}