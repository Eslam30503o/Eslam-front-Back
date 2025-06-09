using System.ComponentModel.DataAnnotations; 

namespace API.DTOs
{
    public class AttendanceDTO  
    {
        public int ID { get; set; } 
        public string Sub_Name { get; set; }
        public int LectureID { get; set; } 
        public string Lecture { get; set; }
        public int St_ID { get; set; } 
        public string Students { get; set; }
        public int Sub_ID { get; set; } 
        public string Subjects { get; set; }
        public bool Atten { get; set; } 
    }
}
