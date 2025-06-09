using API.DTOs;
using AutoMapper;
using Core;
using Core.Entities;
using Core.Repositories.Contract;
using Core.Specifications.InstructorsSpecifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.APIS.Erorrs;
using Project.Core.Specifications;


namespace API.Controllers
{
    public class InstructorsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public InstructorsController(IUnitOfWork unitOfWork,IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]  
        [HttpGet("GetAllInstructors")]   //Instructors
        public async Task<ActionResult<IReadOnlyList<Instructors>>> GetAllInstructors()
        {
            var Instructors = await _unitOfWork.Repository<Instructors>().GetAll(); 
            return Ok(Instructors); //200
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Instructors>> GetInstructor(int id)
        {
            try
            {
                var Instructor = await _unitOfWork.Repository<Instructors>().GetById(id);
                if (Instructor == null)
                {
                    return NotFound(new ApiResponse(404));// 404
                } 
                return Ok(Instructor); // 200
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);// 400
            }

        }

        [HttpPost("Add_OR_UpdateInstructor")]
        public async Task<ActionResult<Instructors>> AddInstructor(Instructors Instructors)
        { 
            if (Instructors.ID != 0)
            {
                var data = await _unitOfWork.Repository<Instructors>().UpdateAsync(Instructors);
                if (data is null) return BadRequest(new ApiResponse(400));
                await _unitOfWork.CompleteAsync();
                return Ok(data);
            }
            else
            {
                Instructors.ID = 0;
                var data = await _unitOfWork.Repository<Instructors>().AddAsync(Instructors);
                if (data is null) return BadRequest(new ApiResponse(400));
                await _unitOfWork.CompleteAsync();
                return Ok(data);
            }


        }
        [HttpDelete("DeleteInstructor")]
        public async Task DeleteInstructors(int id)
        {
            var Instructor = await _unitOfWork.Repository<Instructors>().GetById(id);
            if (Instructor is not null)
            {
                _unitOfWork.Repository<Instructors>().Delete(Instructor);
                await _unitOfWork.CompleteAsync();

            }
            else
            {
                NotFound(new ApiResponse(404));// 404
            }

        }

    }
}
