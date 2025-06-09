using Core.Entities;

namespace API.DTOs
{
    public class SubjectsDTO
    {
        public int ID { get; set; }
        public string Sub_Name { get; set; }
        public int Dr_ID { get; set; }
        public string Doctors { get; set; }
        public int Ins_ID { get; set; }
        public string Instructors { get; set; }
        public int FacYearSem_ID { get; set; }
        public string FacultyYearSemister { get; set; }
    }
}
