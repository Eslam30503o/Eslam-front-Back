using Core.Entities;

namespace API.DTOs
{
    public class Studets_RoomsDTO
    {
        public int ID { get; set; }
        public int St_ID { get; set; }
        public string Students { get; set; }
        public int Room_ID { get; set; }
        public string Rooms { get; set; }
    }
}
