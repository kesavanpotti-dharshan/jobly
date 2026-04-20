namespace Jobly.Application.Features.Analytics.DTOs;

public record DashboardStatsDto(
    int TotalApplications,
    int ActiveApplications,
    int Offers,
    int Rejections,
    int Interviews,
    double ResponseRate,
    double OfferRate,
    List<StatusBreakdownDto> StatusBreakdown,
    List<MonthlyApplicationDto> MonthlyTrend
);

public record StatusBreakdownDto(
    string Status,
    int Count,
    double Percentage
);

public record MonthlyApplicationDto(
    string Month,
    int Count
);