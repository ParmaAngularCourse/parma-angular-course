using AngularAppDataServer.Infrastructure;
using AngularAppDataServer.Repositories;
using AngularAppDataServer.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SimpleInjector;
using SimpleInjector.Lifestyles;

namespace Parma.Gasps.BackgroundJobShedulerService.Infrastructure
{
    public static class SimpleInjectorConfig
    {
        public static void RegisterSimpleInjectorService(IServiceCollection services, Container container, IConfiguration configuration)
        {
            ConfigurateContainer(container, configuration);

            services.AddSimpleInjector(container, options =>
            {
                options.AddAspNetCore().AddControllerActivation();
                options.AddLogging();
            });

            services.UseSimpleInjectorAspNetRequestScoping(container);
        }

        public static void ConfigurateSimpleInjectorService(IApplicationBuilder app, Container container)
        {
            app.UseSimpleInjector(container);
            container.Verify();
        }

        public static void ConfigurateContainer(Container container, IConfiguration configuration)
        {
            container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();
            RegisterServises(container);
            RegisterRepositories(container);
        }

        private static void RegisterServises(Container container)
        {
            container.Register<NewsDataService, NewsDataService>(Lifestyle.Scoped);
            container.Register<ExecuteService, ExecuteService>(Lifestyle.Scoped);
            container.Register<AuthService, AuthService>(Lifestyle.Scoped);
        }

        private static void RegisterRepositories(Container container)
        {
            container.Register<NewsDataRepository, NewsDataRepository>(Lifestyle.Singleton);
            container.Register<UsersRepository, UsersRepository>(Lifestyle.Singleton);
        }
    }
}
