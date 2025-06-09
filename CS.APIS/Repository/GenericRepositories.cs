using Core.Entities;
using Core.Repositories.Contract;
using Microsoft.EntityFrameworkCore;
using Repository.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Core.Specifications;
using Project.Repository;
using System.ComponentModel;

namespace Repository
{
    public class GenericRepositories<T> : IGenericRepositories<T> where T : BaseEntity
    {
        private readonly StoreContext _dbcontext; 
        public GenericRepositories(StoreContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public async Task<IReadOnlyList<T>> GetAll()
        {
            if (typeof(T) == typeof(Students))
            {
                return (IReadOnlyList<T>)await _dbcontext.Set<Students>().Include(p => p.Faculty).Include(p => p.FacultyYearSemister).ToListAsync();
            }
            if (typeof(T) == typeof(Studets_Rooms_Subject))
            {
                return (IReadOnlyList<T>)await _dbcontext.Set<Studets_Rooms_Subject>().Include(p => p.Rooms).Include(p => p.Students).ToListAsync();
            }
            if (typeof(T) == typeof(Subjects))
            {
                return (IReadOnlyList<T>)await _dbcontext.Set<Subjects>().Include(p => p.FacultyYearSemister).Include(p => p.Instructors).Include(p => p.Doctors).ToListAsync();
            }
            if (typeof(T) == typeof(Lecture_S))
            {
                return (IReadOnlyList<T>)await _dbcontext.Set<Lecture_S>().Include(p => p.Subjects).ToListAsync();
            }
            if (typeof(T) == typeof(FacultyYear))
            {
                return (IReadOnlyList<T>)await _dbcontext.Set<FacultyYear>().Include(p => p.Faculty).ToListAsync();
            }
            if (typeof(T) == typeof(FacultyYearSemister))
            {
                return (IReadOnlyList<T>)await _dbcontext.Set<FacultyYearSemister>().Include(p => p.FacultyYear).ToListAsync();
            }
            if (typeof(T) == typeof(Attendance_T))
            {
                return (IReadOnlyList<T>)await _dbcontext.Set<Attendance_T>().Include(p => p.Lecture).ToListAsync();
            }

            return await _dbcontext.Set<T>().ToListAsync();
        }
        public async Task<T?> GetById(int id)
        {
            if (typeof(T) == typeof(Students))
            {
                return await _dbcontext.Set<Students>().Where(p => p.ID == id).Include(p => p.Faculty).Include(p => p.FacultyYearSemister).FirstOrDefaultAsync() as T;
            } 
            if (typeof(T) == typeof(Studets_Rooms_Subject))
            {
                return await _dbcontext.Set<Studets_Rooms_Subject>().Where(p => p.ID == id).Include(p => p.Rooms).Include(p => p.Students).FirstOrDefaultAsync() as T;
            }
            if (typeof(T) == typeof(Subjects))
            {
                return await _dbcontext.Set<Subjects>().Where(p => p.ID == id).Include(p => p.FacultyYearSemister).Include(p => p.Instructors).Include(p => p.Doctors).FirstOrDefaultAsync() as T;
            }
            if (typeof(T) == typeof(Lecture_S))
            {
                return await _dbcontext.Set<Lecture_S>().Where(p => p.ID == id).Include(p => p.Subjects).FirstOrDefaultAsync() as T;
            }
            if (typeof(T) == typeof(FacultyYear))
            {
                return await _dbcontext.Set<FacultyYear>().Where(p => p.ID == id).Include(p => p.Faculty).FirstOrDefaultAsync() as T;
            }
            if (typeof(T) == typeof(FacultyYearSemister))
            {
                return await _dbcontext.Set<FacultyYearSemister>().Where(p => p.ID == id).Include(p => p.FacultyYear).FirstOrDefaultAsync() as T;
            }
            if (typeof(T) == typeof(Attendance_T))
            {
                return await _dbcontext.Set<Attendance_T>().Where(p => p.ID == id).Include(p => p.Lecture).FirstOrDefaultAsync() as T;
            }
            if (typeof(T) == typeof(Doctors))
            {
                return await _dbcontext.Set<Doctors>().Where(p => p.ID == id).FirstOrDefaultAsync() as T;
            }
            return await _dbcontext.Set<T>().FindAsync(id);
        }
        public async Task<T?> GetByEmail(string Email)
        {
            if (typeof(T) == typeof(Students))
            {
                return await _dbcontext.Set<Students>().Where(p => p.St_Email == Email).Include(p => p.Faculty).Include(p => p.FacultyYearSemister).FirstOrDefaultAsync() as T;
            }
            if (typeof(T) == typeof(Doctors))
            {
                return await _dbcontext.Set<Doctors>().Where(p => p.Dr_Email == Email).FirstOrDefaultAsync() as T;
            }
            return await _dbcontext.Set<T>().FindAsync(Email);
        }
        public async Task<IReadOnlyList<T>> GetAllWithSpecAsync(ISpecifications<T> spec)
        {
            return await SpecificationEvaluator<T>.GetQuery(_dbcontext.Set<T>(), spec).ToListAsync();
        }
        public async Task<T?> GetWithspecAsync(ISpecifications<T> spec)
        {
            return await SpecificationEvaluator<T>.GetQuery(_dbcontext.Set<T>(), spec).FirstOrDefaultAsync();
        } 
        public async Task<T> AddAsync(T entity)
        {
            await _dbcontext.AddAsync(entity);
            return entity;
        } 
        public async Task<T> UpdateAsync(T entity)
        {
            _dbcontext.Update(entity);
            return entity;
        } 
        public void Delete(T entity)
        {
            //MultilineStringConverter changes
            _dbcontext.Remove(entity);
        }
    }
}
