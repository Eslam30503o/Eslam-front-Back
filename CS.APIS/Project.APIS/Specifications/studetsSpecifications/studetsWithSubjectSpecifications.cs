using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Core.Specifications;

namespace Core.Specifications.studetsSpecifications
{
    public class studetsWithSubjectSpecifications : BaseSpecifications<Students>
    {
        public studetsWithSubjectSpecifications(studetsSpecParams spec) : base(P =>
             (string.IsNullOrEmpty(spec.Search) || P.St_NameAr.ToLower().Contains(spec.Search.ToLower())) &&
             (!spec.Fac_ID.HasValue || P.Fac_ID == spec.Fac_ID.Value) &&
             (!spec.FacYearSem_ID.HasValue || P.FacYearSem_ID == spec.FacYearSem_ID.Value)
            )
        {
            //Includes.Add(P => P.Fac_ID);
            //Includes.Add(P => P.FacYearSem_ID);

            if (!string.IsNullOrEmpty(spec.sort))
            {
                switch (spec.sort)
                {
                    case "CodeAsc":
                        // orderby(P=>p.St_Code)
                        AddOrderBy(P => P.St_Code);
                        break;
                    case "CodeDcse":
                        AddOrderByDecs(P => P.St_Code);
                        // orderbyDecs(P=>p.St_Code)
                        break;
                    default:
                        AddOrderBy(P => P.St_NameAr);
                        break;
                }
            }
            else
            {
                AddOrderBy(P => P.ID);
            }
            ApplyPagination((spec.PageIndex - 1) * spec.PageSize, spec.PageSize);
        }
        public studetsWithSubjectSpecifications(int id) : base(P => P.ID == id)
        { 
        }
    }
}
