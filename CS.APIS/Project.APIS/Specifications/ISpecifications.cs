using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Specifications
{
    public interface ISpecifications<T> where T : BaseEntity
    {
        public Expression<Func<T, bool>> Critria { get; set; }// where
        public List<Expression<Func<T, object>>> Includes { get; set; }
        public Expression<Func<T, object>> OrderBy { get; set; }//orderby
        public Expression<Func<T, object>> OrderByDecs { get; set; }//OrderByDecs   
        public bool IsPaginationEnabled { get; set; }
        public int Take { get; set; }
        public int Skip { get; set; }
    }
}
