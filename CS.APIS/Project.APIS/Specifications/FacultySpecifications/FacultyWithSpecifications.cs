using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Core.Specifications;

namespace Core.Specifications.FacultySpecifications
{
    public class FacultyWithSpecifications : BaseSpecifications<Faculty>
    {
        public FacultyWithSpecifications(FacultySpecParams spec) : base(P =>
             (string.IsNullOrEmpty(spec.Search) || P.Fac_Name.ToLower().Contains(spec.Search.ToLower())))
        {
            if (!string.IsNullOrEmpty(spec.sort))
            {
                switch (spec.sort)
                {
                    case "CodeAsc":
                        // orderby(P=>p.St_Code)
                        AddOrderBy(P => P.Fac_Code);
                        break;
                    case "CodeDcse":
                        AddOrderByDecs(P => P.Fac_Code);
                        // orderbyDecs(P=>p.St_Code)
                        break;
                    default:
                        AddOrderBy(P => P.Fac_Name);
                        break;
                }
            }
            else
            {
                AddOrderBy(P => P.ID);
            }
            ApplyPagination((spec.PageIndex - 1) * spec.PageSize, spec.PageSize);
        }
        public FacultyWithSpecifications(int id) : base(P => P.ID == id)
        {

        }
    }
}
