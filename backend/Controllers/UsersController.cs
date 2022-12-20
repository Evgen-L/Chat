using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.DbTools;
using System.Text.Json;

namespace backend.Controllers;


[ApiController]
public class UsersController : Controller
{
    [Route("api/users/login")]
    [HttpPost]
    public async Task<IActionResult> LogInUser()
    {
        return Ok();
    }
}