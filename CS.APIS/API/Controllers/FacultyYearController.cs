using API.DTOs;
using AutoMapper;
using Core;
using Core.Entities;
using Core.Repositories.Contract;
using Core.Specifications.FacultyYearSpecifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.APIS.Erorrs;
using Project.Core.Specifications;


namespace API.Controllers
{
    public class FacultyYearController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public FacultyYearController(IUnitOfWork unitOfWork,IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]  
        [HttpGet("GetAllFacultyYear")]   //FacultyYear
        public async Task<ActionResult<IReadOnlyList<FacultyYearDTO>>> GetAllFacultyYear()
        {
            var FacultyYear = await _unitOfWork.Repository<FacultyYear>().GetAll();
            var data = _mapper.Map<IReadOnlyList<FacultyYear>, IReadOnlyList<FacultyYearDTO>>(FacultyYear);
            return Ok(data); //200
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<FacultyYear>> GetFacultyYear(int id)
        {
            try
            {
                var FacultyYear = await _unitOfWork.Repository<FacultyYear>().GetById(id);
                if (FacultyYear == null)
                {
                    return NotFound(new ApiResponse(404));// 404
                }
                var data = _mapper.Map<FacultyYear, FacultyYearDTO>(FacultyYear);
                return Ok(data); // 200
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);// 400
            }

        }

        [HttpPost("Add_OR_UpdateFacultyYear")]
        public async Task<ActionResult<FacultyYear>> AddFacultyYear(FacultyYearDTO FacultyYears)
        {
            //var mappedFacultyYears = _mapper.Map<FacultyYearDTO, FacultyYear>(FacultyYear);  

            var mappedFacultyYears = new FacultyYear
            {
                ID = FacultyYears.ID,
                Year = FacultyYears.Year,
                Fac_ID = FacultyYears.FacultyId
            };
            if (mappedFacultyYears.ID != 0)
            {
                var data = await _unitOfWork.Repository<FacultyYear>().UpdateAsync(mappedFacultyYears);
                if (data is null) return BadRequest(new ApiResponse(400));
                await _unitOfWork.CompleteAsync();
                return Ok(data);
            }
            else
            {
                mappedFacultyYears.ID = 0;
                var data = await _unitOfWork.Repository<FacultyYear>().AddAsync(mappedFacultyYears);
                if (data is null) return BadRequest(new ApiResponse(400));
                await _unitOfWork.CompleteAsync();
                return Ok(data);
            }


        }
        [HttpDelete("DeleteFacultyYear")]
        public async Task DeleteFacultyYears(int id)
        {
            var FacultyYear = await _unitOfWork.Repository<FacultyYear>().GetById(id);
            if (FacultyYear is not null)
            {
                _unitOfWork.Repository<FacultyYear>().Delete(FacultyYear);
                await _unitOfWork.CompleteAsync();

            }
            else
            {
                NotFound(new ApiResponse(404));// 404
            }

        }

    }
}
