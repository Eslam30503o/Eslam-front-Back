using API.Helpers;
using Core;
using Core.Repositories.Contract;
using Core.Services.Contract;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Service;

namespace Project.APIS.Extensions
{
    public static class ApplicationServicesExtentions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        { 

            services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork)); 
            services.AddScoped(typeof(IAuthService), typeof(AuthService));
            services.AddScoped(typeof(IGenericRepositories<>), typeof(GenericRepositories<>));

            services.AddAutoMapper(typeof(MappingProfiles));

            services.Configure<ApiBehaviorOptions>(Options =>
            {
                Options.InvalidModelStateResponseFactory = (ActionContext) =>
                {
                    var errors = ActionContext.ModelState.Where(P => P.Value.Errors.Count() > 0)
                                                          .SelectMany(p => p.Value.Errors)
                                                          .Select(E => E.ErrorMessage)
                                                          .ToList();
                    var response = new ApiValidationErrorResponse()
                    {
                        Errors = errors
                    };
                    return new BadRequestObjectResult(response);
                };
            });
            services.AddScoped(typeof(IGenericRepositories<>), typeof(GenericRepositories<>));


            return services;
        }
    }

    //public static WebApplication UseSwaggerMiddleWare(this WebApplication app)
    //{ 
    //    app.UseSwagger();
    //    app.UseSwaggerUI();
    //    return app;

    //}

}
