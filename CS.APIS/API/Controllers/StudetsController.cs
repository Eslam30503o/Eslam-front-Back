using API.DTOs;
using AutoMapper;
using Core;
using Core.Entities;
using Core.Entities.Identity;
using Core.Repositories.Contract;
using Core.Services.Contract;
using Core.Specifications.studetsSpecifications;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.APIS.Erorrs;
using Repository;
using Repository.Data;
using System.Globalization;
using System.Numerics;
using static System.Runtime.InteropServices.JavaScript.JSType;
namespace API.Controllers
{
    public class StudetsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly StoreContext context;
        private readonly UserManager<AppUser> _userManager;
        public StudetsController(IUnitOfWork unitOfWork, IMapper mapper, StoreContext context, UserManager<AppUser> userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            this.context = context;
            _userManager = userManager;
        }

        [HttpGet("GetStudetByEmail")]
        public async Task<ActionResult<Students>> GetStudetByEmail(string Email)
        {
            try
            {
                var Studet = await _unitOfWork.Repository<Students>().GetByEmail(Email);
                if (Studet == null)
                {
                    return NotFound(new ApiResponse(404));// 404
                }
                var data = _mapper.Map<Students, StudentsDTO>(Studet);
                return Ok(data); // 200
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);// 400
            }

        }

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        [HttpGet("GetAllStudets")]   //Studets
        public async Task<ActionResult<IReadOnlyList<StudentsDTO>>> GetAllStudets()
        {
            var Studets = await _unitOfWork.Repository<Students>().GetAll();
            var data = _mapper.Map<IReadOnlyList<Students>, IReadOnlyList<StudentsDTO>>(Studets);
            return Ok(data); //200
        }
        [HttpGet("DashBordStudets")]   //Studets
        public async Task<ActionResult<IReadOnlyList<StudentsDTO>>> DashBordStudets(int id)
        {
            var result = (from srs in context.Studets_Rooms_Subject
                          join room in context.Rooms on srs.Room_ID equals room.ID
                          join student in context.Students on srs.St_ID equals student.ID
                          join subject in context.Subjects on srs.Sub_ID equals subject.ID
                          join doctor in context.Doctors on subject.Dr_ID equals doctor.ID
                          join lecture in context.Lecture on subject.ID equals lecture.Sub_ID
                          where student.ID == id
                          select new
                          {
                              student.St_Code,
                              student.St_NameAr,
                              subject.Sub_Name,
                              room.Room_Num,
                              doctor.Dr_NameAr,
                              lecture.Lecture_Name,
                              Day = lecture.LectureDate.DayOfWeek.ToString()
                          }).ToList();
            return Ok(result); //200
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Students>> GetStudet(int id)
        {
            try
            {
                var Studet = await _unitOfWork.Repository<Students>().GetById(id);
                if (Studet == null)
                {
                    return NotFound(new ApiResponse(404));// 404
                    return NotFound(new ApiResponse(404, $"Student with ID '{id}' not found.")); // 404
                }
                var data = _mapper.Map<Students, StudentsDTO>(Studet);
                return Ok(data); // 200
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);// 400
            }
        }



        [HttpPost("Add_OR_UpdateStudent")]
        public async Task<ActionResult<Students>> AddStudet(StudentsDTO students)
        {
            //var mappedStudents = _mapper.Map<StudentsDTO, Students>(students);  
            var mappedStudents = new Students
            {
                ID = students.ID,
                St_Code = students.St_Code,
                St_NameAr = students.St_NameAr,
                St_NameEn = students.St_NameEn,
                St_Email = students.St_Email,
                St_Image = students.St_Image,
                Phone = students.Phone,
                Fac_ID = students.Fac_ID,
                FacYearSem_ID = students.FacYearSem_ID,
            };
            if (mappedStudents.ID != 0)

            {
                var data = await _unitOfWork.Repository<Students>().UpdateAsync(mappedStudents);
                if (data is null) return BadRequest(new ApiResponse(400));
                await _unitOfWork.CompleteAsync();
                return Ok(data);
            }
            else
            {
                mappedStudents.ID = 0;
                var data = await _unitOfWork.Repository<Students>().AddAsync(mappedStudents);
                if (data is null) return BadRequest(new ApiResponse(400));
                await _unitOfWork.CompleteAsync();
                return Ok(data);
            }
        }
        [HttpDelete("DeleteStudent")]
        public async Task DeleteStudents(int id)
        {
            var Studet = await _unitOfWork.Repository<Students>().GetById(id);
            if (Studet is not null)
            {
                _unitOfWork.Repository<Students>().Delete(Studet);
                await _unitOfWork.CompleteAsync();
            }
            else
            {
                NotFound(new ApiResponse(404));// 404
            }
        }
        [HttpGet("GetStudentsCount")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<int>> GetStudentCount()
        {
            try
            {
                // استخدم الـ context مباشرة لحساب العدد
                var studentCount = await context.Students.CountAsync();
                return Ok(studentCount); // 200 OK مع العدد
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new ApiResponse(500, $"An error occurred while retrieving student count: {ex.Message}"));
            }
        }
    }   
}
