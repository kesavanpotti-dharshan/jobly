using Jobly.Application.Features.Analytics.DTOs;
using Jobly.Core.Enums;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;

namespace Jobly.Application.Features.Analytics.Queries.GetDashboardStats;

public class GetDashboardStatsQueryHandler
    : IRequestHandler<GetDashboardStatsQuery, DashboardStatsDto>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public GetDashboardStatsQueryHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<DashboardStatsDto> Handle(
        GetDashboardStatsQuery request,
        CancellationToken cancellationToken)
    {
        var userId = _currentUserService.UserId;

        var applications = await _unitOfWork.JobApplications
            .GetByUserIdAsync(userId, cancellationToken);

        var appList = applications.ToList();
        var total = appList.Count;

        if (total == 0)
            return new DashboardStatsDto(0, 0, 0, 0, 0, 0, 0, [], []);

        // Status counts
        var statusCounts = appList
            .GroupBy(a => a.Status)
            .ToDictionary(g => g.Key, g => g.Count());

        var offers      = statusCounts.GetValueOrDefault(ApplicationStatus.Offer, 0);
        var rejections  = statusCounts.GetValueOrDefault(ApplicationStatus.Rejected, 0);
        var interviews  = statusCounts.GetValueOrDefault(ApplicationStatus.Interview, 0);

        var activeStatuses = new[]
        {
            ApplicationStatus.Applied,
            ApplicationStatus.PhoneScreen,
            ApplicationStatus.Interview,
            ApplicationStatus.TechnicalAssessment,
            ApplicationStatus.Offer
        };
        var active = appList.Count(a => activeStatuses.Contains(a.Status));

        // Rates — based on applied (excludes Saved)
        var applied = appList.Count(a => a.Status != ApplicationStatus.Saved);
        double responseRate = applied > 0
            ? Math.Round((double)(applied - statusCounts.GetValueOrDefault(ApplicationStatus.Applied, 0)) / applied * 100, 1)
            : 0;
        double offerRate = applied > 0
            ? Math.Round((double)offers / applied * 100, 1)
            : 0;

        // Status breakdown
        var statusBreakdown = Enum.GetValues<ApplicationStatus>()
            .Select(s => new StatusBreakdownDto(
                s.ToString(),
                statusCounts.GetValueOrDefault(s, 0),
                total > 0
                    ? Math.Round((double)statusCounts.GetValueOrDefault(s, 0) / total * 100, 1)
                    : 0
            ))
            .Where(s => s.Count > 0)
            .ToList();

        // Monthly trend — last 6 months
        var sixMonthsAgo = DateTime.UtcNow.AddMonths(-6);
        var monthlyTrend = appList
            .Where(a => a.CreatedAt >= sixMonthsAgo)
            .GroupBy(a => new { a.CreatedAt.Year, a.CreatedAt.Month })
            .OrderBy(g => g.Key.Year)
            .ThenBy(g => g.Key.Month)
            .Select(g => new MonthlyApplicationDto(
                new DateTime(g.Key.Year, g.Key.Month, 1).ToString("MMM yyyy"),
                g.Count()
            ))
            .ToList();

        return new DashboardStatsDto(
            total,
            active,
            offers,
            rejections,
            interviews,
            responseRate,
            offerRate,
            statusBreakdown,
            monthlyTrend
        );
    }
}