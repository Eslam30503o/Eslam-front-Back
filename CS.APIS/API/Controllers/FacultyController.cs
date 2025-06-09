using API.DTOs;
using AutoMapper;
using Core;
using Core.Entities;
using Core.Repositories.Contract;
using Core.Specifications.FacultySpecifications; 
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.APIS.Erorrs;
using Project.Core.Specifications;


namespace API.Controllers
{
    public class FacultyController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public FacultyController(IUnitOfWork unitOfWork,IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]  
        [HttpGet("GetAllFaculty")]   //Faculty
        public async Task<ActionResult<IReadOnlyList<Faculty>>> GetAllFaculty()
        {
            var Faculty = await _unitOfWork.Repository<Faculty>().GetAll();
            var data = _mapper.Map<IReadOnlyList<Faculty>, IReadOnlyList<Faculty>>(Faculty);
            return Ok(data); //200
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Faculty>> GetFaculty(int id)
        {
            try
            {
                var Faculty = await _unitOfWork.Repository<Faculty>().GetById(id);
                if (Faculty == null)
                {
                    return NotFound(new ApiResponse(404));// 404
                } 
                return Ok(Faculty); // 200
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);// 400
            }

        }

        [HttpPost("Add_OR_UpdateFaculty")]
        public async Task<ActionResult<Faculty>> AddFaculty(Faculty Faculty)
        {
            //var mappedFaculty = _mapper.Map<FacultyDTO, Faculty>(Faculty);  

            
            if (Faculty.ID != 0)
            {
                var data = await _unitOfWork.Repository<Faculty>().UpdateAsync(Faculty);
                if (data is null) return BadRequest(new ApiResponse(400));
                await _unitOfWork.CompleteAsync();
                return Ok(data);
            }
            else
            {
                Faculty.ID = 0;
                var data = await _unitOfWork.Repository<Faculty>().AddAsync(Faculty);
                if (data is null) return BadRequest(new ApiResponse(400));
                await _unitOfWork.CompleteAsync();
                return Ok(data);
            }


        }
        [HttpDelete("DeleteFaculty")]
        public async Task DeleteFaculty(int id)
        {
            var Faculty = await _unitOfWork.Repository<Faculty>().GetById(id);
            if (Faculty is not null)
            {
                _unitOfWork.Repository<Faculty>().Delete(Faculty);
                await _unitOfWork.CompleteAsync();

            }
            else
            {
                NotFound(new ApiResponse(404));// 404
            }

        }  
    }
}
