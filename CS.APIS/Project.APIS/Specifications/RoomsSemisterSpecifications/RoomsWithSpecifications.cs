using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Core.Specifications;
using Core.Specifications.RoomsSpecParamsSpecifications;

namespace Core.Specifications.RoomsSpecifications
{
    public class RoomsWithSpecifications : BaseSpecifications<Rooms>
    {
        public RoomsWithSpecifications(RoomsSpecParams spec) : base(P =>
             (string.IsNullOrEmpty(spec.Search) || P.Room_Num.ToLower().Contains(spec.Search.ToLower())))
        {
            if (!string.IsNullOrEmpty(spec.sort))
            {
                switch (spec.sort)
                {
                    case "CodeAsc":
                        // orderby(P=>p.St_Code)
                        AddOrderBy(P => P.Room_Num);
                        break;
                    case "CodeDcse":
                        AddOrderByDecs(P => P.Room_Num);
                        // orderbyDecs(P=>p.St_Code)
                        break;
                    default:
                        AddOrderBy(P => P.Room_Num);
                        break;
                }
            }
            else
            {
                AddOrderBy(P => P.ID);
            }
            ApplyPagination((spec.PageIndex - 1) * spec.PageSize, spec.PageSize);
        }
        public RoomsWithSpecifications(int id) : base(P => P.ID == id)
        {

        }
    }
}
