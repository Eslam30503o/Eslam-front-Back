using Core.Entities;
using System.ComponentModel.DataAnnotations; 

namespace API.DTOs
{
    public class FacultyYearSemisterDTO
    {
        public int ID { get; set; }
        public string Sem_Code { get; set; }
        public string Sem_Name { get; set; }
        public int FacultyYearId { get; set; }
        public string FacultyYear { get; set; }
    }
}
