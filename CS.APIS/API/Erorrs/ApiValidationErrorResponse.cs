using Project.APIS.Erorrs; 

public class ApiValidationErrorResponse :ApiResponse
{
    //InvalidModelStateResponseFactory
    public IEnumerable<string> Errors { get; set; }

    public ApiValidationErrorResponse():base(400)//ApiBehaviorOptions depedancy injactions
    {
        Errors = new List<string>();
    }
}
