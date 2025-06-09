using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Students, StudentsDTO>()
                .ForMember(d => d.Faculty, o => o.MapFrom(s => s.Faculty.Fac_Name))
                .ForMember(d => d.FacultyYearSemister, o => o.MapFrom(s => s.FacultyYearSemister.Sem_Name))  
                .ForMember(d => d.St_Image, o => o.MapFrom<StudentsPictureUrlResolver>()).ReverseMap();

            CreateMap<Doctors, DoctorsDTO>()
                .ForMember(d => d.Dr_Image, o => o.MapFrom<DoctorsPictureUrlResolver>()).ReverseMap();

         

            CreateMap<Attendance_T, AttendanceDTO>()
                 .ForMember(d => d.Lecture, o => o.MapFrom(s => s.Lecture.Lecture_Name)).ReverseMap();

            CreateMap<FacultyYear, FacultyYearDTO>()
                .ForMember(d => d.Faculty, o => o.MapFrom(s => s.Faculty.Fac_Name)).ReverseMap();

            CreateMap<FacultyYearSemister, FacultyYearSemisterDTO>()
                 .ForMember(d => d.FacultyYear, o => o.MapFrom(s => s.FacultyYear.Year)).ReverseMap();

            CreateMap<Studets_Rooms_Subject, Studets_RoomsDTO>()
             .ForMember(d => d.Rooms, o => o.MapFrom(s => s.Rooms.Room_Num))
             .ForMember(d => d.Students, o => o.MapFrom(s => s.Students.St_NameAr)).ReverseMap();

            CreateMap<Subjects, SubjectsDTO>()
             .ForMember(d => d.Doctors, o => o.MapFrom(s => s.Doctors.Dr_NameAr))
             .ForMember(d => d.Instructors, o => o.MapFrom(s => s.Instructors.Ins_NameAr))
             .ForMember(d => d.FacultyYearSemister, o => o.MapFrom(s => s.FacultyYearSemister.Sem_Name)).ReverseMap(); 
             
        }
    }
}
