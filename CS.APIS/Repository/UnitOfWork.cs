using Core.Entities;
using Core;
using Repository.Data;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Repositories.Contract;

namespace Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext _dbcontext;

        private Hashtable _Repositories;
        public UnitOfWork(StoreContext dbcontext)
        {
            _dbcontext = dbcontext;
            _Repositories = new Hashtable();
        }
        public async Task<int> CompleteAsync()
        {
            return await _dbcontext.SaveChangesAsync();
        }
        public async ValueTask DisposeAsync()
        {
            await _dbcontext.DisposeAsync();
        }
        public IGenericRepositories<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            var key = typeof(TEntity).Name;// اسم الجدول
            if (!_Repositories.ContainsKey(key))
            {
                var repository = new GenericRepositories<TEntity>(_dbcontext);
                _Repositories.Add(key, repository);
            }
            return _Repositories[key] as IGenericRepositories<TEntity>;
        }
    }
}
