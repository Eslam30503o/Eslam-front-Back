using API.DTOs;
using AutoMapper;
using Core;
using Core.Entities;
using Core.Repositories.Contract;
using Core.Specifications.DoctorsSpecifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.APIS.Erorrs;
using Project.Core.Specifications;
using Repository.Data;
using System.Linq;

namespace API.Controllers
{
    public class DoctorsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly StoreContext context;

        public DoctorsController(IUnitOfWork unitOfWork, IMapper mapper, StoreContext context)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            this.context = context;
        }

        [HttpGet("GetDoctorByEmail")]
        public async Task<ActionResult<Doctors>> GetDoctorByEmail(string Email)
        {
            try
            {
                var Doctor = await _unitOfWork.Repository<Doctors>().GetByEmail(Email);
                if (Doctor == null)
                {
                    return NotFound(new ApiResponse(404));// 404
                }
                var data = _mapper.Map<Doctors, DoctorsDTO>(Doctor);
                return Ok(data); // 200
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);// 400
            }

        }

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]  
        [HttpGet("GetAllDoctors")]   //Doctors
        public async Task<ActionResult<IReadOnlyList<DoctorsDTO>>> GetAllDoctors()
        {
            var Doctors = await _unitOfWork.Repository<Doctors>().GetAll();
            var data = _mapper.Map<IReadOnlyList<Doctors>, IReadOnlyList<DoctorsDTO>>(Doctors);
            return Ok(data); //200
        }

        [HttpGet("DashBordDoctors")]   //Doctors
        public async Task<ActionResult<IReadOnlyList<DoctorsDTO>>> DashBordDoctors(int id)
        {

            var doctorId = id;

            var baseQuery = from d in context.Doctors
                            where d.ID == doctorId
                            join s in context.Subjects on d.ID equals s.Dr_ID
                            join l in context.Lecture on s.ID equals l.Sub_ID
                            select new
                            {
                                d.Dr_NameAr,
                                s.Sub_Name,
                                l.LectureDate,
                                SubjectID = s.ID
                            };

            var studetsRoomsSubjects = context.Studets_Rooms_Subject.AsNoTracking().ToList();
            var rooms = context.Rooms.AsNoTracking().ToList();

            var result = (from bq in baseQuery.ToList() // force client evaluation here
                          join srs in studetsRoomsSubjects on bq.SubjectID equals srs.Sub_ID into srsGroup
                          from srsLeft in srsGroup.DefaultIfEmpty()
                          join room in rooms on srsLeft?.Room_ID equals room.ID into roomGroup
                          from roomLeft in roomGroup.DefaultIfEmpty()
                          group new { bq, srsLeft, roomLeft } by new
                          {
                              bq.Dr_NameAr,
                              bq.Sub_Name,
                              Day = bq.LectureDate.DayOfWeek,
                              RoomNum = roomLeft?.Room_Num
                          } into g
                          select new
                          {
                              g.Key.Dr_NameAr,
                              g.Key.Sub_Name,
                              Day = g.Key.Day.ToString(),
                              g.Key.RoomNum,
                              TotalStudents = g.Count(x => x.srsLeft != null && x.srsLeft.St_ID != null)
                          }).ToList();

            return Ok(result);

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Doctors>> GetDoctor(int id)
        {
            try
            {
                var Doctor = await _unitOfWork.Repository<Doctors>().GetById(id);
                if (Doctor == null)
                {
                    return NotFound(new ApiResponse(404));// 404
                }
                var data = _mapper.Map<Doctors, DoctorsDTO>(Doctor);
                return Ok(data); // 200
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);// 400
            }

        }

        [HttpPost("Add_OR_UpdateDoctor")]
        public async Task<ActionResult<Doctors>> AddDoctor(DoctorsDTO Doctors)
        {
            //var mappedDoctors = _mapper.Map<DoctorsDTO, Doctors>(Doctors);  

            var mappedDoctors = new Doctors
            {
                ID = Doctors.ID,
                Dr_Code = Doctors.Dr_Code,
                Dr_NameAr = Doctors.Dr_NameAr,
                Dr_NameEn = Doctors.Dr_NameEn,
                Dr_Email = Doctors.Dr_Email,
                Dr_Image = Doctors.Dr_Image,
                Phone = Doctors.Phone,
            };
            if (mappedDoctors.ID != 0)
            {
                var data = await _unitOfWork.Repository<Doctors>().UpdateAsync(mappedDoctors);
                if (data is null) return BadRequest(new ApiResponse(400));
                await _unitOfWork.CompleteAsync();
                return Ok(data);
            }
            else
            {
                mappedDoctors.ID = 0;
                var data = await _unitOfWork.Repository<Doctors>().AddAsync(mappedDoctors);
                if (data is null) return BadRequest(new ApiResponse(400));
                await _unitOfWork.CompleteAsync();
                return Ok(data);
            }


        }
        [HttpDelete("DeleteDoctor")]
        public async Task DeleteDoctors(int id)
        {
            var Doctor = await _unitOfWork.Repository<Doctors>().GetById(id);
            if (Doctor is not null)
            {
                _unitOfWork.Repository<Doctors>().Delete(Doctor);
                await _unitOfWork.CompleteAsync();

            }
            else
            {
                NotFound(new ApiResponse(404));// 404
            }

        }
    }
}
