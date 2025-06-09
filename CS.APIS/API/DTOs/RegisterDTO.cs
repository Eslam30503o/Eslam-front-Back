using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDTO 
    {
        [Required]
        public string DisplayName { set; get; }
        [Required]
        [EmailAddress]
        public string Email { set; get; }
        [Required]
        public string PhoneNumber { set; get; }
        [Required] 
        public string Password { set; get; }
        public string UserType { get; set; }


    }
}
