using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Parma.Gasps.BackgroundJobShedulerService.Infrastructure;
using SimpleInjector;
using SimpleInjector.Lifestyles;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Localization;
using System.Globalization;

namespace AngularAppDataServer
{
    public class Startup
    {
        private const string DefaultRequestCulture = "ru";
        private readonly IConfiguration _configuration;
        private readonly Container _container;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
            _container = new Container();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.Converters.Add(new StringEnumConverter(
                    new CamelCaseNamingStrategy()
                    {
                        OverrideSpecifiedNames = false
                    }));
            });

            _container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();
            SimpleInjectorConfig.RegisterSimpleInjectorService(services, _container, _configuration);
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "AngularAppDataServer", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var supportedCultures = new[] { new CultureInfo(DefaultRequestCulture) };

            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture(DefaultRequestCulture),
                SupportedCultures = supportedCultures,
                SupportedUICultures = supportedCultures,
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AngularAppDataServer v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            SimpleInjectorConfig.ConfigurateSimpleInjectorService(app, _container);
        }
    }
}
