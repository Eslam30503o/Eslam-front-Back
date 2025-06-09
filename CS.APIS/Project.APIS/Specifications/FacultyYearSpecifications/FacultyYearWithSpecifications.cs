using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Core.Specifications;

namespace Core.Specifications.FacultyYearSpecifications
{
    public class FacultyYearWithSpecifications : BaseSpecifications<FacultyYear>
    {
        public FacultyYearWithSpecifications(FacultyYearSpecParams spec) : base(P =>
             (string.IsNullOrEmpty(spec.Search) || P.Year.ToLower().Contains(spec.Search.ToLower())))
        {
            if (!string.IsNullOrEmpty(spec.sort))
            {
                switch (spec.sort)
                {
                    case "YearAsc":
                        // orderby(P=>p.St_Code)
                        AddOrderBy(P => P.Year);
                        break;
                    case "YearDcse":
                        AddOrderByDecs(P => P.Year);
                        // orderbyDecs(P=>p.St_Code)
                        break;
                    default:
                        AddOrderBy(P => P.Year);
                        break;
                }
            }
            else
            {
                AddOrderBy(P => P.ID);
            }
            ApplyPagination((spec.PageIndex - 1) * spec.PageSize, spec.PageSize);
        }
        public FacultyYearWithSpecifications(int id) : base(P => P.ID == id)
        {

        }
    }
}
