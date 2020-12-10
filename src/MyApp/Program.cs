using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace MyApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                        .UseStartup<Startup>();

                    if (OperatingSystem.IsLinux())
                    {
                        //Disable HTTPs for tests
                        webBuilder.UseUrls("http://*:1000", "http://0.0.0.0:5000");
                    }
                    else
                    {
                        webBuilder.UseUrls("http://*:1000", "https://*:1234", "http://0.0.0.0:5000");
                    }
                });
    }
}
