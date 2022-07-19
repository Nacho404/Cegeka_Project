using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using NbcArchitect.Application;
using NbcArchitect.Data;
using NbcArchitect.Domain;
using NbcArchitect.Web.Middlewares;
using Microsoft.AspNetCore.Identity;
using NbcArchitect.Web.Security;
using WebApplicationJwtAuth.Security;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authorization;
using NbcArchitect.Web.Common;

namespace NbcArchitect.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer("Bearer", o =>
            {
                var Key = Encoding.UTF8.GetBytes(Configuration["JWT:Key"]);
                o.SaveToken = true;
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Key),
                    LifetimeValidator = (_, expires, _, _) => expires > DateTime.UtcNow,
                };
                
            });

            services.AddControllers().AddJsonOptions(opt => opt.JsonSerializerOptions.Converters.Add(new HierarchyIdConverter()));
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "NbcArchitect.Web", Version = "v1" });
            });
            services.AddDbContext<NbcContext>(o =>
            {
                var conn = Configuration.GetConnectionString("Default");
                o.UseSqlServer(conn, opt => { opt.UseHierarchyId(); });
            });

            services.AddIdentity<User,IdentityRole>()
                .AddEntityFrameworkStores<NbcContext>()
                .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 8;
            });

            services.AddApplicationServices();
            services.AddTransient<IJwtManagerRepository, JwtManagerRepository>();
            services.AddControllers().AddJsonOptions(x =>
                         x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
            services.AddTransient<TokenManagerMiddleware>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "NbcArchitect.Web v1"));

            app.UseCors(app =>
            {
                app.AllowAnyHeader();
                app.AllowAnyMethod();
                app.AllowAnyOrigin();
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            
            app.UseErrorHandlerMiddleware();
            app.UseTokenManagerMiddleware();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
           
        }
    
    }
}