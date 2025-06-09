using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Faculty : BaseEntity
    { 
        public string Fac_Code { get; set; }
        public string Fac_Name { get; set; }
         
    }
}
