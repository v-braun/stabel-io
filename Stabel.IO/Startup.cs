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

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                // docker secrets file
                .AddJsonFile(@"C:\ProgramData\Docker\secrets\stabel.io.json", optional: true, reloadOnChange: true)
                .AddJsonFile(@"/run/secrets/stabel.io.json", optional: true, reloadOnChange: true)

                .AddEnvironmentVariables();

            
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services){
            // Add framework services.
            services.AddMvc();

            services.AddTransient<IStableService, StableService>();
            services.AddSingleton<IStorageService, InMemStorageService>();
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
