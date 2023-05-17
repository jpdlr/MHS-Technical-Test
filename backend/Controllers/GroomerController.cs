using backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/register")]
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
        public async Task<ActionResult<GroomerRecord>> Get(string id)
        {
            return await _dbContext.GroomerRecords.FindAsync(id);
        }

        // POST api/CustomerList
        [HttpPost]
        public async Task Post(GroomerRecord model)
        {
            model.id = Guid.NewGuid().ToString();

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

            _dbContext.GroomerRecords.Remove(entity);

            await _dbContext.SaveChangesAsync();
            
            return Ok();
        }
    }
}