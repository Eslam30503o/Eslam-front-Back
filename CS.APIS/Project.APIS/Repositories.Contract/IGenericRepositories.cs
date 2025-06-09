using Core.Entities;
using Project.Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks; 

namespace Core.Repositories.Contract
{
    public interface IGenericRepositories<T> where T : BaseEntity
    {
        Task<T?> GetById(int id);
        Task<T?> GetByEmail(string Email);
        Task<IReadOnlyList<T>> GetAll(); 
        Task<IReadOnlyList<T>> GetAllWithSpecAsync(ISpecifications<T> spec); 
        Task<T?> GetWithspecAsync(ISpecifications<T> spec);
        Task<T> AddAsync(T entity);
        //Task AddAsync(T entity);
        Task<T>UpdateAsync(T entity);
        void Delete(T entity); 
    }
}
