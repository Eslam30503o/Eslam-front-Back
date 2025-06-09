using Core.Entities;

namespace API.DTOs
{
    public class DoctorsDTO
    {
        public int ID { get; set; }
        public string Dr_Code { get; set; }
        public string Dr_NameAr { get; set; }
        public string Dr_NameEn { get; set; }
        public string Dr_Email { get; set; }
        public string Dr_Image { get; set; }
        public string Phone { get; set; }
    }
}
