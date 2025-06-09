using API.DTOs;
using AutoMapper;
using Core;
using Core.Entities;
using Core.Repositories.Contract;
using Core.Specifications.FacultyYearSemisterSpecParamsSpecifications;
using Core.Specifications.RoomsSpecifications;
using Core.Specifications.RoomsSpecParamsSpecifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.APIS.Erorrs;

namespace API.Controllers
{
    public class RoomsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public RoomsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }


        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]  
        [HttpGet("GetAllRooms")]   //Rooms
        public async Task<ActionResult<IReadOnlyList<Rooms>>> GetAllRooms()
        {
            var Rooms = await _unitOfWork.Repository<Rooms>().GetAll();
            return Ok(Rooms); //200
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Rooms>> GetRoom(int id)
        {
            try
            {
                var Room = await _unitOfWork.Repository<Rooms>().GetById(id);
                if (Room == null)
                {
                    return NotFound(new ApiResponse(404));// 404
                }
                return Ok(Room); // 200
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);// 400
            }

        }

        [HttpPost("Add_OR_UpdateRoom")]
        public async Task<ActionResult<Rooms>> AddRoom(RoomsDTO Rooms)
        {

            var mapproom = new Rooms
            {
                ID = Rooms.ID,
                Room_Num =Rooms.Room_Num
            };
            if (Rooms.ID != 0)
            {
                var data = await _unitOfWork.Repository<Rooms>().UpdateAsync(mapproom);
                if (data is null) return BadRequest(new ApiResponse(400));
                await _unitOfWork.CompleteAsync();
                return Ok(data);
            }
            else
            {
                Rooms.ID = 0;
                var data = await _unitOfWork.Repository<Rooms>().AddAsync(mapproom);
                if (data is null) return BadRequest(new ApiResponse(400));
                await _unitOfWork.CompleteAsync();
                return Ok(data);
            }


        }
        [HttpDelete("DeleteRoom")]
        public async Task DeleteRooms(int id)
        {
            var Room = await _unitOfWork.Repository<Rooms>().GetById(id);
            if (Room is not null)
            {
                _unitOfWork.Repository<Rooms>().Delete(Room);
                await _unitOfWork.CompleteAsync();

            }
            else
            {
                NotFound(new ApiResponse(404));// 404
            }

        }

    }
}
