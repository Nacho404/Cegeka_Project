using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NbcArchitect.Data;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using NbcArchitect.Domain;
using Microsoft.Extensions.Configuration;

namespace NbcArchitect.Web
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            Migrate(host);
            await CreateRoles(host);
            await CreateAdminUser(host);
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });

        private static void Migrate(IHost host)
        {
            using var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;
            try
            {
                var context = services.GetRequiredService<NbcContext>();
                context.Database.Migrate();
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occurred creating the DB.");
            }
        }
        private async static Task CreateRoles(IHost host)
        {
            using var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;
            try
            {
                var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
                string[] roleNames = { "Administrator", "Architect" };
                foreach (var roleName in roleNames)
                {
                    var roleExist = roleManager.RoleExistsAsync(roleName).Result;
                    if (!roleExist)
                    {
                        var roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
                    }

                }
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occurred when inserting the roles in the DB.");
            }
        }

        private async static Task CreateAdminUser(IHost host)
        {
            using var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;
            IConfiguration config = host.Services.GetRequiredService<IConfiguration>();
            try
            {
                var userManager = services.GetRequiredService<UserManager<User>>();
                User user = new()
                {
                    LastName = config["AdminInfo:LastName"],
                    FirstName = config["AdminInfo:FirstName"],
                    Email = config["AdminInfo:Email"],
                    UserName = config["AdminInfo:Email"],
                    SecurityStamp = Guid.NewGuid().ToString()
                };
                var password = config["AdminInfo:Password"];
                var userExists = await userManager.FindByNameAsync(user.Email);
                if (userExists == null)
                {
                    var result = await userManager.CreateAsync(user, password);
                    await userManager.AddToRoleAsync(user, "Administrator");
                }

            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occurred when inserting the roles in the DB.");
            }
        }

    }
}