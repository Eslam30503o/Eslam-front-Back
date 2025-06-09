using Core.Entities;

namespace API.DTOs
{
    public class StudentsDTO
    {
        public int ID { get; set; }
        public string St_Code { get; set; }
        public string St_NameAr { get; set; }
        public string St_NameEn { get; set; }
        public string St_Email { get; set; }
        public string St_Image { get; set; }
        public string Phone { get; set; }
        public int Fac_ID { get; set; }
        public string Faculty { get; set; }
        public int FacYearSem_ID { get; set; }
        public string FacultyYearSemister { get; set; }
       // public int FingerID { get; set; }


        /// <summary>
        ///public decimal? Gpa { get; set; } // استخدم decimal قابل للإلغاء إذا كان المعدل التراكمي قد لا يكون موجودًا دائمًا
        /// </summary>
        // public bool FingerprintRegistered { get; set; }
    }
}
