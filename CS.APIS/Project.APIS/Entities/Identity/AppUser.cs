using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity
{
    public enum UserType
    {
        Student = 0,
        Doctor = 1,
        Admin = 2
    }

    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public Address Address { get; set; }

        public UserType UserType { get; set; }   
    }
}