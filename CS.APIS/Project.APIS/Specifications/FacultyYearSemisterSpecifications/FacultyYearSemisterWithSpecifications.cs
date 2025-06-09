using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Core.Specifications;
using Core.Specifications.FacultyYearSemisterSpecParamsSpecifications;

namespace Core.Specifications.FacultyYearSemisterSpecifications
{
    public class FacultyYearSemisterWithSpecifications : BaseSpecifications<FacultyYearSemister>
    {
        public FacultyYearSemisterWithSpecifications(FacultyYearSemisterSpecParams spec) : base(P =>
             (string.IsNullOrEmpty(spec.Search) || P.Sem_Name.ToLower().Contains(spec.Search.ToLower())))
        {
            if (!string.IsNullOrEmpty(spec.sort))
            {
                switch (spec.sort)
                {
                    case "CodeAsc":
                        // orderby(P=>p.St_Code)
                        AddOrderBy(P => P.Sem_Code);
                        break;
                    case "CodeDcse":
                        AddOrderByDecs(P => P.Sem_Code);
                        // orderbyDecs(P=>p.St_Code)
                        break;
                    default:
                        AddOrderBy(P => P.Sem_Name);
                        break;
                }
            }
            else
            {
                AddOrderBy(P => P.ID);
            }
            ApplyPagination((spec.PageIndex - 1) * spec.PageSize, spec.PageSize);
        }
        public FacultyYearSemisterWithSpecifications(int id) : base(P => P.ID == id)
        {

        }
    }
}
