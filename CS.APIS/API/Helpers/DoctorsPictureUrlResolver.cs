using API.DTOs;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class DoctorsPictureUrlResolver : IValueResolver<Doctors, DoctorsDTO, string>
    {
        private readonly IConfiguration _configuration;

        public DoctorsPictureUrlResolver(IConfiguration configuration)
        {
           _configuration = configuration;
        }
        public string Resolve(Doctors source, DoctorsDTO destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.Dr_Image))
            {
                return $"{_configuration["ApiBaseUrl"]}/{source.Dr_Image}";
            }
            return string.Empty;
        }
    }
}
