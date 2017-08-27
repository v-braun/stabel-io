using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Stabel.IO.Services;
using Stabel.IO.Services.Impl;

namespace Stabel.IO{
    public class Startup{
        public Startup(IHostingEnvironment env){
            Console.WriteLine($"start with env {env.EnvironmentName}");
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
                // docker secrets file
                .AddJsonFile(@"C:\ProgramData\Docker\secrets\stabel_io_secrets", optional: true, reloadOnChange: true)
                .AddJsonFile(@"/run/secrets/stabel_io_secrets", optional: true, reloadOnChange: true)

                .AddEnvironmentVariables();

            
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services){
            // Add framework services.
            services.AddMvc();

            services.AddTransient<IStabelService, StabelService>();
            var azureStorageConnectionString = Configuration.GetValue("AzureStorageConnectionString", "");
            if(!string.IsNullOrEmpty(azureStorageConnectionString)){
                Console.WriteLine("Use Azure Storage Account");
                services.AddSingleton<IStorageService, AzureStorageService>(
                    (serviceProvider) => new AzureStorageService(azureStorageConnectionString)
                );
            }
            else{
                Console.WriteLine("Use InMem Blob Storage");
                services.AddSingleton<IStorageService, InMemStorageService>();
            }

            services.AddSingleton<IConfigurationRoot>(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory){
            var lvl = Configuration.GetSection("Logging").GetValue<bool>("IncludeScopes");
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseMvc();
            app.UseDefaultFiles();
            app.UseStaticFiles();
        }
    }
}
