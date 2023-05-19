using backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/PetsList")]
    [ApiController]
    public class PetRecordsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public PetRecordsController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET api/CustomerList
        [HttpGet]
        public async Task<ActionResult<List<PetRecord>>> Get()
        {
            return await _dbContext.PetRecords.ToListAsync();
        }

        // GET api/CustomerList/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PetRecord>> Get(string id)
        {
            return await _dbContext.PetRecords.FindAsync(id);
        }

        // POST api/CustomerList/customer
        [HttpPost("customer")]
        public async Task<ActionResult<List<PetRecord>>> GetByCustomer(CustomerRecord model)
        {
            return await _dbContext.PetRecords.Where(f => f.customer_name == model.customer_name).ToListAsync();
        }

        // POST api/CustomerList
        [HttpPost]
        public async Task Post(PetRecord model)
        {
            model.id = Guid.NewGuid().ToString();

            await _dbContext.AddAsync(model);

            await _dbContext.SaveChangesAsync();
        }

        // PUT api/CustomerList/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, PetRecord model)
        {
            var exists = await _dbContext.PetRecords.AnyAsync(f => f.id == id);
            if (!exists)
            {
                return NotFound();
            }

            _dbContext.PetRecords.Update(model);

            await _dbContext.SaveChangesAsync();

            return Ok();

        }

        // DELETE api/CustomerList/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var entity = await _dbContext.PetRecords.FindAsync(id);

            _dbContext.PetRecords.Remove(entity!);

            await _dbContext.SaveChangesAsync();
            
            return Ok();
        }
    }
}