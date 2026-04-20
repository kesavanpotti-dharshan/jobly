using System.Net;
using System.Text.Json;
using Jobly.Application.Common.Exceptions;

namespace Jobly.API.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        int statusCode;
        object response;

        switch (exception)
        {
            case ValidationException ve:
                statusCode = (int)HttpStatusCode.BadRequest;
                response = new { errors = ve.Errors };
                break;
            case NotFoundException nfe:
                statusCode = (int)HttpStatusCode.NotFound;
                response = new { errors = new Dictionary<string, string[]> { { "General", [nfe.Message] } } };
                break;
            case UnauthorizedException ue:
                statusCode = (int)HttpStatusCode.Unauthorized;
                response = new { errors = new Dictionary<string, string[]> { { "General", [ue.Message] } } };
                break;
            default:
                statusCode = (int)HttpStatusCode.InternalServerError;
                response = new
                {
                    errors = new Dictionary<string, string[]>
    {
        { "General", [$"{exception.GetType().Name}: {exception.Message} | Inner: {exception.InnerException?.Message} | Inner2: {exception.InnerException?.InnerException?.Message}"] }
    }
                };
                break;
        }

        context.Response.StatusCode = statusCode;
        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}