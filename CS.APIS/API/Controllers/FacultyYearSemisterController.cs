using API.DTOs;
using AutoMapper;
using Core;
using Core.Entities;  
using Microsoft.AspNetCore.Mvc;
using Project.APIS.Erorrs;
using Project.Core.Specifications;


namespace API.Controllers
{
    public class FacultyYearSemisterController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public FacultyYearSemisterController(IUnitOfWork unitOfWork,IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }


        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]  
        [HttpGet("GetAllSemisters")]   //FacultyYearSemister
        public async Task<ActionResult<IReadOnlyList<FacultyYearSemisterDTO>>> GetAllSemisters()
        {
            var Semister = await _unitOfWork.Repository<FacultyYearSemister>().GetAll();
            var data = _mapper.Map<IReadOnlyList<FacultyYearSemister>, IReadOnlyList<FacultyYearSemisterDTO>>(Semister);
            return Ok(data); //200
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<FacultyYearSemister>> GetSemister(int id)
        {
            try
            {
                var Semister = await _unitOfWork.Repository<FacultyYearSemister>().GetById(id);
                if (Semister == null)
                {
                    return NotFound(new ApiResponse(404));// 404
                }
                var data = _mapper.Map<FacultyYearSemister, FacultyYearSemisterDTO>(Semister);
                return Ok(data); // 200
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);// 400
            }

        }

        [HttpPost("Add_OR_UpdateSemister")]
        public async Task<ActionResult<FacultyYearSemister>> AddFacultyYearSemister(FacultyYearSemisterDTO FacultyYearSemisters)
        { 

            var mappedSemisters = new FacultyYearSemister
            {
                ID = FacultyYearSemisters.ID,
                Sem_Code = FacultyYearSemisters.Sem_Code ,
                Sem_Name = FacultyYearSemisters. Sem_Name,
                FacYear_Id = FacultyYearSemisters.FacultyYearId
            };
            if (mappedSemisters.ID != 0)
            {
                var data = await _unitOfWork.Repository<FacultyYearSemister>().UpdateAsync(mappedSemisters);
                if (data is null) return BadRequest(new ApiResponse(400));
                await _unitOfWork.CompleteAsync();
                return Ok(data);
            }
            else
            {
                mappedSemisters.ID = 0;
                var data = await _unitOfWork.Repository<FacultyYearSemister>().AddAsync(mappedSemisters);
                if (data is null) return BadRequest(new ApiResponse(400));
                await _unitOfWork.CompleteAsync();
                return Ok(data);
            }


        }
        [HttpDelete("DeleteSemister")]
        public async Task DeleteFacultyYearSemisters(int id)
        {
            var FacultyYearSemister = await _unitOfWork.Repository<FacultyYearSemister>().GetById(id);
            if (FacultyYearSemister is not null)
            {
                _unitOfWork.Repository<FacultyYearSemister>().Delete(FacultyYearSemister);
                await _unitOfWork.CompleteAsync();

            }
            else
            {
                NotFound(new ApiResponse(404));// 404
            }

        }


    }
}
