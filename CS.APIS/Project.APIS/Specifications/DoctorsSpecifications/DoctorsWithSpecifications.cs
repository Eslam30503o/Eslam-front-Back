using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Core.Specifications;

namespace Core.Specifications.DoctorsSpecifications
{
    public class DoctorsWithSpecifications : BaseSpecifications<Doctors>
    {
        public DoctorsWithSpecifications(DoctorsSpecParams spec) : base(P =>
             (string.IsNullOrEmpty(spec.Search) || P.Dr_NameAr.ToLower().Contains(spec.Search.ToLower())))
        {
            if (!string.IsNullOrEmpty(spec.sort))
            {
                switch (spec.sort)
                {
                    case "CodeAsc":
                        // orderby(P=>p.St_Code)
                        AddOrderBy(P => P.Dr_Code);
                        break;
                    case "CodeDcse":
                        AddOrderByDecs(P => P.Dr_Code);
                        // orderbyDecs(P=>p.St_Code)
                        break;
                    default:
                        AddOrderBy(P => P.Dr_NameAr);
                        break;
                }
            }
            else
            {
                AddOrderBy(P => P.ID);
            }
            ApplyPagination((spec.PageIndex - 1) * spec.PageSize, spec.PageSize);
        }
        public DoctorsWithSpecifications(int id) : base(P => P.ID == id)
        {

        }
    }
}
