using Core.Entities;

namespace API.DTOs
{
    public class LectureDTO
    {
        public int ID { get; set; }
        public string Sub_Name { get; set; } 
        public int St_ID { get; set; }
        public string Students { get; set; }
        public int Room_ID { get; set; }
        public string Rooms { get; set; }
        public int Sub_ID { get; set; }
        public string Subjects { get; set; }
        public DateTime LectureDate { get; set; }
        public int Degree { get; set; }

    }
}
