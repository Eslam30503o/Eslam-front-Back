using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks; 
using Core.Entities.Identity;

namespace Project.Repository.Data.Identity
{
    public static class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> _userManager)
        {
            if (_userManager.Users.Count() == 0)
            { 
            var user = new AppUser() 
            {
                DisplayName ="Yousef Ayman",
                Email="yousefxbx12@gmail.com",
                UserName="yousef_ayamn",
                PhoneNumber="01117811572"
            }; 
               await _userManager.CreateAsync(user,"Pa$$w0rd");
            }
        }
    }
}
