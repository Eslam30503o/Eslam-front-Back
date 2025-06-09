using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Core.Specifications;

namespace Core.Specifications.InstructorsSpecifications
{
    public class InstructorsWithSpecifications : BaseSpecifications<Instructors>
    {
        public InstructorsWithSpecifications(InstructorsSpecParams spec) : base(P =>
             (string.IsNullOrEmpty(spec.Search) || P.Ins_NameAr.ToLower().Contains(spec.Search.ToLower())))
        {
            if (!string.IsNullOrEmpty(spec.sort))
            {
                switch (spec.sort)
                {
                    case "CodeAsc":
                        // orderby(P=>p.St_Code)
                        AddOrderBy(P => P.Ins_Code);
                        break;
                    case "CodeDcse":
                        AddOrderByDecs(P => P.Ins_Code);
                        // orderbyDecs(P=>p.St_Code)
                        break;
                    default:
                        AddOrderBy(P => P.Ins_NameAr);
                        break;
                }
            }
            else
            {
                AddOrderBy(P => P.ID);
            }
            ApplyPagination((spec.PageIndex - 1) * spec.PageSize, spec.PageSize);
        }
        public InstructorsWithSpecifications(int id) : base(P => P.ID == id)
        {

        }
    }
}
