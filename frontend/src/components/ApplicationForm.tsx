import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicationSchema, type ApplicationFormValues } from '@/lib/applicationSchemas';
import type { Application } from '@/types/applications';

interface ApplicationFormProps {
  onSubmit: (data: ApplicationFormValues) => void;
  isLoading?: boolean;
  defaultValues?: Application;
}

export function ApplicationForm({ onSubmit, isLoading = false, defaultValues }: ApplicationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: defaultValues
      ? ({
          companyName: defaultValues.companyName,
          roleTitle: defaultValues.roleTitle,
          jobUrl: defaultValues.jobUrl || '',
          status: defaultValues.status,
          location: defaultValues.location,
          workMode: defaultValues.workMode,
          appliedDate: defaultValues.appliedDate,
          deadlineDate: defaultValues.deadlineDate,
          salaryMin: defaultValues.salaryMin ?? undefined,
          salaryMax: defaultValues.salaryMax ?? undefined,
          priority: defaultValues.priority ?? undefined,
        } as ApplicationFormValues)
      : undefined,
  });

  const handleFormSubmit = (data: ApplicationFormValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Company Name */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }}>Company Name</label>
        <input
          {...register('companyName')}
          placeholder="e.g., Google, Microsoft"
          style={{
            padding: '10px 12px',
            background: 'rgba(255,255,255,0.06)',
            border: `1px solid ${errors.companyName ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '8px',
            color: '#f1f5f9',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        {errors.companyName && <span style={{ fontSize: '12px', color: '#f87171' }}>{errors.companyName.message}</span>}
      </div>

      {/* Role Title */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }}>Role Title</label>
        <input
          {...register('roleTitle')}
          placeholder="e.g., Senior Software Engineer"
          style={{
            padding: '10px 12px',
            background: 'rgba(255,255,255,0.06)',
            border: `1px solid ${errors.roleTitle ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '8px',
            color: '#f1f5f9',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        {errors.roleTitle && <span style={{ fontSize: '12px', color: '#f87171' }}>{errors.roleTitle.message}</span>}
      </div>

      {/* Job URL */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }}>Job URL (optional)</label>
        <input
          {...register('jobUrl')}
          type="url"
          placeholder="https://careers.example.com/jobs/123"
          style={{
            padding: '10px 12px',
            background: 'rgba(255,255,255,0.06)',
            border: `1px solid ${errors.jobUrl ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '8px',
            color: '#f1f5f9',
            fontSize: '14px',
            outline: 'none',
          }}
        />
      </div>

      {/* Location & Work Mode */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }}>Location</label>
          <input
            {...register('location')}
            placeholder="e.g., London"
            style={{
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.06)',
              border: `1px solid ${errors.location ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '8px',
              color: '#f1f5f9',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          {errors.location && <span style={{ fontSize: '12px', color: '#f87171' }}>{errors.location.message}</span>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }}>Work Mode</label>
          <select
            {...register('workMode')}
            style={{
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.06)',
              border: `1px solid ${errors.workMode ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '8px',
              color: '#f1f5f9',
              fontSize: '14px',
              outline: 'none',
            }}
          >
            <option value="">Select work mode</option>
            <option value="Onsite">Onsite</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          {errors.workMode && <span style={{ fontSize: '12px', color: '#f87171' }}>{errors.workMode.message}</span>}
        </div>
      </div>

      {/* Applied Date & Deadline */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }}>Applied Date</label>
          <input
            {...register('appliedDate')}
            type="date"
            style={{
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.06)',
              border: `1px solid ${errors.appliedDate ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '8px',
              color: '#f1f5f9',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          {errors.appliedDate && <span style={{ fontSize: '12px', color: '#f87171' }}>{errors.appliedDate.message}</span>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }}>Deadline</label>
          <input
            {...register('deadlineDate')}
            type="date"
            style={{
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.06)',
              border: `1px solid ${errors.deadlineDate ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '8px',
              color: '#f1f5f9',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          {errors.deadlineDate && <span style={{ fontSize: '12px', color: '#f87171' }}>{errors.deadlineDate.message}</span>}
        </div>
      </div>

      {/* Salary Min & Max */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }}>Salary Min (optional)</label>
          <input
            {...register('salaryMin', { valueAsNumber: true })}
            type="number"
            placeholder="e.g., 80000"
            style={{
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.06)',
              border: `1px solid ${errors.salaryMin ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '8px',
              color: '#f1f5f9',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }}>Salary Max (optional)</label>
          <input
            {...register('salaryMax', { valueAsNumber: true })}
            type="number"
            placeholder="e.g., 120000"
            style={{
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.06)',
              border: `1px solid ${errors.salaryMax ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '8px',
              color: '#f1f5f9',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Status & Priority */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }}>Status</label>
          <select
            {...register('status')}
            style={{
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.06)',
              border: `1px solid ${errors.status ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '8px',
              color: '#f1f5f9',
              fontSize: '14px',
              outline: 'none',
            }}
          >
            <option value="">Select status</option>
            <option value="Saved">Saved</option>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
          {errors.status && <span style={{ fontSize: '12px', color: '#f87171' }}>{errors.status.message}</span>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }}>Priority (optional)</label>
          <input
            {...register('priority', { valueAsNumber: true })}
            type="number"
            min="1"
            max="5"
            placeholder="1-5"
            style={{
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.06)',
              border: `1px solid ${errors.priority ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '8px',
              color: '#f1f5f9',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        style={{
          padding: '10px 16px',
          background: isLoading ? 'rgba(124,58,237,0.5)' : 'linear-gradient(135deg, #7c3aed, #2563eb)',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          fontWeight: 600,
          fontSize: '14px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        {isLoading ? 'Saving...' : 'Save Application'}
      </button>
    </form>
  );
}