using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Supabase config
var supabaseUrl = Environment.GetEnvironmentVariable("SUPABASE_URL")
                 ?? builder.Configuration["Supabase:Url"];

var supabaseSignatureStr = Environment.GetEnvironmentVariable("SUPABASE_SIGNATURE")
                        ?? builder.Configuration["Supabase:Signature"];

if (string.IsNullOrWhiteSpace(supabaseSignatureStr))
    throw new Exception("Supabase signature is empty");

var supabaseSignatureKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(supabaseSignatureStr));
var validIssuer = $"{supabaseUrl}/auth/v1";
var validAudiences = new List<string> { "authenticated" };

// Auth
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = supabaseSignatureKey,
            ValidateIssuer = true,
            ValidIssuer = validIssuer,
            ValidateAudience = true,
            ValidAudiences = validAudiences,
            ValidateLifetime = true
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddControllers();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
