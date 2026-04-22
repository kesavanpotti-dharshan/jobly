import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, LayoutGrid, List } from 'lucide-react';
import { useApplications, useCreateApplication, useUpdateApplication, useDeleteApplication } from '@/hooks/useApplications';
import { Modal } from '@/components/Modal';
import { ApplicationForm } from '@/components/ApplicationForm';
import type { Application, ApplicationStatus, CreateApplicationRequest, UpdateApplicationRequest } from '@/types/applications';
import type { ApplicationFormValues } from '@/lib/applicationSchemas';

export function ApplicationsPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | null>(null);

  const { data: applications = [], isLoading, error } = useApplications();
  const createMutation = useCreateApplication();
  const updateMutation = useUpdateApplication();
  const deleteMutation = useDeleteApplication();

  const filteredApplications =
    statusFilter === 'all' ? applications : applications.filter((app) => app.status === statusFilter);

  const handleCreate = async (data: ApplicationFormValues) => {
    const request = {
      companyName: data.companyName,
      roleTitle: data.roleTitle,
      jobUrl: data.jobUrl || '',
      status: data.status,
      location: data.location,
      workMode: data.workMode,
      appliedDate: data.appliedDate,
      deadlineDate: data.deadlineDate,
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      priority: data.priority,
    } as CreateApplicationRequest;
    await createMutation.mutateAsync(request);
    setIsCreateModalOpen(false);
  };

  const handleUpdate = async (data: ApplicationFormValues) => {
    if (!editingApp) return;
    const request = {
      id: editingApp.id,
      companyName: data.companyName,
      roleTitle: data.roleTitle,
      jobUrl: data.jobUrl || '',
      status: data.status,
      location: data.location,
      workMode: data.workMode,
      appliedDate: data.appliedDate,
      deadlineDate: data.deadlineDate,
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      priority: data.priority,
    } as UpdateApplicationRequest;
    await updateMutation.mutateAsync(request);
    setEditingApp(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const getStatusBadgeColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'Saved':
        return { bg: 'rgba(148,163,184,0.15)', text: '#cbd5e1' };
      case 'Applied':
        return { bg: 'rgba(59,130,246,0.15)', text: '#93c5fd' };
      case 'Interviewing':
        return { bg: 'rgba(168,85,247,0.15)', text: '#d8b4fe' };
      case 'Offered':
        return { bg: 'rgba(34,197,94,0.15)', text: '#86efac' };
      case 'Rejected':
        return { bg: 'rgba(239,68,68,0.15)', text: '#fca5a5' };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return '-';
    if (min && max) return `£${min.toLocaleString()} - £${max.toLocaleString()}`;
    if (min) return `£${min.toLocaleString()}+`;
    return `up to £${max?.toLocaleString()}`;
  };

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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 8px' }}>Applications</h1>
            <p style={{ color: '#94a3b8', margin: 0 }}>Manage all your job applications in one place.</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            <Plus size={18} /> New application
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | 'all')}
          style={{
            padding: '8px 12px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            color: '#f1f5f9',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          <option value="all">All statuses</option>
          <option value="Saved">Saved</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offered">Offered</option>
          <option value="Rejected">Rejected</option>
        </select>

        {/* View Toggle */}
        <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto' }}>
          <button
            onClick={() => setViewMode('table')}
            style={{
              padding: '8px 12px',
              background: viewMode === 'table' ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              color: viewMode === 'table' ? '#c4b5fd' : '#94a3b8',
              cursor: 'pointer',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <List size={16} /> Table
          </button>
          <button
            onClick={() => setViewMode('card')}
            style={{
              padding: '8px 12px',
              background: viewMode === 'card' ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              color: viewMode === 'card' ? '#c4b5fd' : '#94a3b8',
              cursor: 'pointer',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <LayoutGrid size={16} /> Card
          </button>
        </div>
      </div>

      {/* Loading/Error/Empty States */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
          Loading applications...
        </div>
      )}

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
          Error loading applications. Please try again.
        </div>
      )}

      {!isLoading && filteredApplications.length === 0 && (
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
            color: '#94a3b8',
          }}
        >
          <p style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 500 }}>No applications yet</p>
          <p style={{ margin: 0 }}>Create your first application to get started.</p>
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && !isLoading && filteredApplications.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>
                  Company
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>
                  Position
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>
                  Status
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>
                  Location
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>
                  Salary
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>
                  Applied
                </th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px', fontSize: '14px', color: '#f1f5f9' }}>{app.companyName}</td>
                  <td style={{ padding: '12px', fontSize: '14px', color: '#f1f5f9' }}>{app.roleTitle}</td>
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        background: getStatusBadgeColor(app.status).bg,
                        color: getStatusBadgeColor(app.status).text,
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#94a3b8' }}>
                    {app.location} · {app.workMode}
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#94a3b8' }}>
                    {formatSalary(app.salaryMin, app.salaryMax)}
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#94a3b8' }}>
                    {formatDate(app.appliedDate)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button
                      onClick={() => setEditingApp(app)}
                      style={{
                        background: 'rgba(168,85,247,0.15)',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#d8b4fe',
                        cursor: 'pointer',
                        padding: '6px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      style={{
                        background: 'rgba(239,68,68,0.15)',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#fca5a5',
                        cursor: 'pointer',
                        padding: '6px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Card View */}
      {viewMode === 'card' && !isLoading && filteredApplications.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {filteredApplications.map((app) => (
            <div
              key={app.id}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '16px',
              }}
            >
              <div style={{ marginBottom: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 4px', color: '#f1f5f9' }}>
                  {app.companyName}
                </h3>
                <p style={{ fontSize: '13px', margin: 0, color: '#94a3b8' }}>{app.roleTitle}</p>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    padding: '4px 8px',
                    background: getStatusBadgeColor(app.status).bg,
                    color: getStatusBadgeColor(app.status).text,
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  {app.status}
                </span>
              </div>

              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px', lineHeight: '1.8' }}>
                <div>{app.location} · {app.workMode}</div>
                <div>Salary: {formatSalary(app.salaryMin, app.salaryMax)}</div>
                <div>Applied: {formatDate(app.appliedDate)}</div>
                <div>Deadline: {formatDate(app.deadlineDate)}</div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setEditingApp(app)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: 'rgba(168,85,247,0.15)',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#d8b4fe',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 500,
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(app.id)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: 'rgba(239,68,68,0.15)',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fca5a5',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 500,
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        title="New application"
        onClose={() => setIsCreateModalOpen(false)}
      >
        <ApplicationForm
          onSubmit={handleCreate}
          isLoading={createMutation.isPending}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingApp}
        title="Edit application"
        onClose={() => setEditingApp(null)}
      >
        {editingApp && (
          <ApplicationForm
            onSubmit={handleUpdate}
            isLoading={updateMutation.isPending}
            defaultValues={editingApp}
          />
        )}
      </Modal>
    </div>
  );
}