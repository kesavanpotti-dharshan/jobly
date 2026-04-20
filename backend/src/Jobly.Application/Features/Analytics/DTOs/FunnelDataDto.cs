namespace Jobly.Application.Features.Analytics.DTOs;

public record FunnelDataDto(
    int Saved,
    int Applied,
    int PhoneScreen,
    int Interview,
    int TechnicalAssessment,
    int Offer,
    int Rejected,
    int Withdrawn
);