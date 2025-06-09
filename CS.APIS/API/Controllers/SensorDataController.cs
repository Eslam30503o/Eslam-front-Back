using API.DTOs;
using Core.FingerId;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository.Data;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SensorDataController : ControllerBase
    {
        private readonly StoreContext _storeContext;

        public SensorDataController(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        // POST api/SensorData
        [HttpPost]
        public async Task<ActionResult> PostData(SensorDataDTO sensorData)
        {
            // تحقق إذا الاسم موجود مسبقًا
            var exists = await _storeContext.SensorData.AnyAsync(x => x.Name == sensorData.Name);
            if (exists)
            {
                return Conflict(new { message = "Fingerprint already exists." }); // 409 Conflict
            }

            var mappedData = new SensorData
            {
                Name = sensorData.Name,
                Timestamp = DateTime.Now
            };

            _storeContext.SensorData.Add(mappedData);
            await _storeContext.SaveChangesAsync();

            return Ok(new { id = mappedData.ID, name = mappedData.Name });
        }

        // GET api/SensorData/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<SensorDataDTO>> GetData(int id)
        {
            var data = await _storeContext.SensorData
                .Where(x => x.ID == id)
                .OrderByDescending(x => x.Timestamp)
                .FirstOrDefaultAsync();

            if (data == null)
                return NotFound();

            var dto = new SensorDataDTO
            {
                ID = data.ID,
                Name = data.Name
            };

            return Ok(dto);
        }

        // GET api/SensorData/last-id
        [HttpGet("last-id")]
        public async Task<ActionResult<int>> GetLastId()
        {
            var lastId = await _storeContext.SensorData
                            .OrderByDescending(x => x.ID)
                            .Select(x => x.ID)
                            .FirstOrDefaultAsync();

            return Ok(lastId);
        }
        // GET api/SensorData
        [HttpGet]
        public async Task<ActionResult<List<SensorDataDTO>>> GetAllData()
        {
            var dataList = await _storeContext.SensorData
                            .OrderByDescending(x => x.Timestamp)
                            .Select(x => new SensorDataDTO
                            {
                                ID = x.ID,
                                Name = x.Name
                            })
                            .ToListAsync();

            return Ok(dataList);
        }

        [HttpPost("clear")]
        public async Task<IActionResult> ClearData()
        {
            _storeContext.SensorData.RemoveRange(_storeContext.SensorData);
            await _storeContext.SaveChangesAsync();
            return Ok();
        }
        // GET api/SensorData/generate-id
        [HttpGet("generate-id")]
        public async Task<ActionResult<int>> GenerateId()
        {
            // الحصول على آخر ID موجود، أو 0 إذا لا يوجد بيانات
            var lastId = await _storeContext.SensorData
                .OrderByDescending(x => x.ID)
                .Select(x => x.ID)
                .FirstOrDefaultAsync();

            int newId = lastId + 1;
            return Ok(newId);
        }
        // GET api/SensorData/count
        [HttpGet("count")]
        public async Task<ActionResult<int>> GetFingerprintCount()
        {
            var count = await _storeContext.SensorData.CountAsync();
            return Ok(count);
        }




    }
}
