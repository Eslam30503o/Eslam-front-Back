using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.APIS.Erorrs;

namespace Project.APIS.Controllers
{
    [Route("Errors/{code}")]
    [ApiController]
    [ApiExplorerSettings(IgnoreApi =true)]

    public class ErrorsController : ControllerBase
    { 
        public ActionResult Error(int code)
        {
            if (code == 401) 
            {
                return NotFound(new ApiResponse(401));

            }
            else if (code == 404)
            {
                return NotFound(new ApiResponse(404));

            }
            else
                return StatusCode(code);
        }


    }
}
