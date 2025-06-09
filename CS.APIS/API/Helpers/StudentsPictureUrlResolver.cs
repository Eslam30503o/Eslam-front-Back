using API.DTOs;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class StudentsPictureUrlResolver : IValueResolver<Students, StudentsDTO, string>
    {
        private readonly IConfiguration _configuration;

        public StudentsPictureUrlResolver(IConfiguration configuration)
        {
           _configuration = configuration;
        }
        public string Resolve(Students source, StudentsDTO destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.St_Image))
            {
                return $"{_configuration["ApiBaseUrl"]}/{source.St_Image}";
            }
            return string.Empty;
        }
    }
}
