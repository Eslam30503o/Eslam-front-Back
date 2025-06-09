using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Core.Entities;
using Core.FingerId;

namespace Repository.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Attendance_T> Attendance { get; set; }   
        public DbSet<Doctors> Doctors { get; set; }  
        public DbSet<Faculty> Faculty { get; set; }  
        public DbSet<FacultyYear> FacultyYear { get; set; }  
        public DbSet<FacultyYearSemister> FacultyYearSemister { get; set; }  
        public DbSet<Instructors> Instructors { get; set; }   
        public DbSet<Lecture_S> Lecture { get; set; }   
        public DbSet<Rooms> Rooms { get; set; }  
        public DbSet<Students> Students { get; set; }  
        public DbSet<Studets_Rooms_Subject> Studets_Rooms_Subject { get; set; }  
        public DbSet<Subjects> Subjects { get; set; }  
        public DbSet<SensorData> SensorData { get; set; }  

    }
}
