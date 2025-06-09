using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Core.Specifications;
using Core.Specifications.SubjectsSpecParamsSpecifications;

namespace Core.Specifications.SubjectsSpecifications
{
    public class SubjectsWithSpecifications : BaseSpecifications<Subjects>
    {
        public SubjectsWithSpecifications(SubjectsSpecParams spec) : base(P =>
             (string.IsNullOrEmpty(spec.Search) || P.Sub_Name.ToLower().Contains(spec.Search.ToLower())))
        {
            if (!string.IsNullOrEmpty(spec.sort))
            {
                switch (spec.sort)
                {
                    case "NameAsc":
                        // orderby(P=>p.St_Code)
                        AddOrderBy(P => P.Sub_Name);
                        break;
                    case "NameDcse":
                        AddOrderByDecs(P => P.Sub_Name);
                        // orderbyDecs(P=>p.St_Code)
                        break;
                    default:
                        AddOrderBy(P => P.Sub_Name);
                        break;
                }
            }
            else
            {
                AddOrderBy(P => P.ID);
            }
            ApplyPagination((spec.PageIndex - 1) * spec.PageSize, spec.PageSize);
        }
        public SubjectsWithSpecifications(int id) : base(P => P.ID == id)
        {

        }
    }
}
