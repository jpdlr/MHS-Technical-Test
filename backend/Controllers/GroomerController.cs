using System.Security.Cryptography;
using System.Text;
using backend.Model;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/groomer")]
    [ApiController]
    public class GroomerRecordsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public GroomerRecordsController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET api/CustomerList
        [HttpGet]
        public async Task<ActionResult<List<GroomerRecord>>> Get()
        {
            return await _dbContext.GroomerRecords.ToListAsync();
        }

        // GET api/CustomerList/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GroomerRecord>> Get(string id, GroomerRecord model)
        {
            var entity = await _dbContext.GroomerRecords.FirstOrDefaultAsync(f => f.email == model.email && f.password == model.password);
            if (entity == null)
            {
                return NotFound();
            }
            return entity;
        }

        // POST api/CustomerList/login
        [HttpPost("login")]
        public async Task<ActionResult<GroomerRecord>> Login(GroomerRecord model)
        {
            var entity = await _dbContext.GroomerRecords.FirstOrDefaultAsync(f => f.email == model.email);
            if (entity == null)
            {
                return NotFound();
            }

            // Generate a 16-byte salt
            byte[] salt = Convert.FromBase64String(entity.salt);

            byte[] passwordBytes = Encoding.UTF8.GetBytes(model.password);
            byte[] combinedBytes = new byte[salt.Length + passwordBytes.Length];

            Buffer.BlockCopy(salt, 0, combinedBytes, 0, salt.Length);
            Buffer.BlockCopy(passwordBytes, 0, combinedBytes, salt.Length, passwordBytes.Length);
            string combinedPassword = Convert.ToBase64String(combinedBytes);

            // Use a secure hashing algorithm to hash the password
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: combinedPassword,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            if (hashedPassword != entity.password)
            {
                return NotFound();
            }

            entity.last_login = DateTime.Now;

            await _dbContext.SaveChangesAsync();

            return entity;
        }

        // POST api/CustomerList
        [HttpPost]
        public async Task Post(GroomerRecord model)
        {
            // First check if the email already exists
            var exists = await _dbContext.GroomerRecords.AnyAsync(f => f.email == model.email);
            if (exists)
            {
                throw new Exception("Email already exists");
            }

            model.id = Guid.NewGuid().ToString();
            model.register_date = DateTime.Now;
            model.last_login = DateTime.Now;

            // Generate a 16-byte salt
            byte[] salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            byte[] passwordBytes = Encoding.UTF8.GetBytes(model.password);
            byte[] combinedBytes = new byte[salt.Length + passwordBytes.Length];

            Buffer.BlockCopy(salt, 0, combinedBytes, 0, salt.Length);
            Buffer.BlockCopy(passwordBytes, 0, combinedBytes, salt.Length, passwordBytes.Length);
            string combinedPassword = Convert.ToBase64String(combinedBytes);

            // Use a secure hashing algorithm to hash the password
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: combinedPassword,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            model.salt = Convert.ToBase64String(salt);
            model.password = hashedPassword;

            // print out the model to the console
            Console.WriteLine(model);

            await _dbContext.AddAsync(model);

            await _dbContext.SaveChangesAsync();
        }

        // PUT api/CustomerList/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, GroomerRecord model)
        {
            var exists = await _dbContext.GroomerRecords.AnyAsync(f => f.id == id);
            if (!exists)
            {
                return NotFound();
            }

            _dbContext.GroomerRecords.Update(model);

            await _dbContext.SaveChangesAsync();

            return Ok();

        }

        // DELETE api/CustomerList/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var entity = await _dbContext.GroomerRecords.FindAsync(id);

            _dbContext.GroomerRecords.Remove(entity!);

            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}