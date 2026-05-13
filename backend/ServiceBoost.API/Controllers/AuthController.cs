using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Serviceboost.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    [HttpGet("secure")]
    [Authorize]
    public IActionResult Secure()
    {
        var userId = User.FindFirst("sub")?.Value;
        return Ok(new { message = "OK", userId });
    }
}