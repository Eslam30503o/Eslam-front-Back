using Core.Entities;
using System.ComponentModel.DataAnnotations; 

namespace API.DTOs
{
    public class FacultyYearDTO
    {
        public int ID { get; set; }
        public string Year { get; set; }

        public int FacultyId { get; set; }
        public string Faculty { get; set; }
    }
}
