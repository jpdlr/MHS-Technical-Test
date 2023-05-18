using backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/CustomersList")]
    [ApiController]
    public class CustomerRecordsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public CustomerRecordsController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET api/CustomerList
        [HttpGet]
        public async Task<ActionResult<List<CustomerRecord>>> Get()
        {
            return await _dbContext.CustomerRecords.ToListAsync();
        }

        // GET api/CustomerList/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerRecord>> Get(string id)
        {
            return await _dbContext.CustomerRecords.FindAsync(id);
        }

        // POST api/CustomerList/groomer
        [HttpPost("groomer")]
        public async Task<ActionResult<List<CustomerRecord>>> GetGroomer(GroomerRecord model)
        {
            return await _dbContext.CustomerRecords.Where(f => f.groomer_id == model.email).ToListAsync();
        }

        // POST api/CustomerList
        [HttpPost]
        public async Task Post(CustomerRecord model)
        {
            model.id = Guid.NewGuid().ToString();

            // print out the model to the console
            Console.WriteLine(model);

            await _dbContext.AddAsync(model);

            await _dbContext.SaveChangesAsync();
        }

        // PUT api/CustomerList/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, CustomerRecord model)
        {
            var exists = await _dbContext.CustomerRecords.AnyAsync(f => f.id == id);
            if (!exists)
            {
                return NotFound();
            }

            _dbContext.CustomerRecords.Update(model);

            await _dbContext.SaveChangesAsync();

            return Ok();

        }

        // DELETE api/CustomerList/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var entity = await _dbContext.CustomerRecords.FindAsync(id);

            if (entity == null)
            {
                return NotFound();
            }

            // Remove all dogs associated with the customer
            var dogs = _dbContext.PetRecords.Where(p => p.customer_name == entity.customer_name);
            _dbContext.PetRecords.RemoveRange(dogs);

            _dbContext.CustomerRecords.Remove(entity);

            await _dbContext.SaveChangesAsync();

            return Ok();
        }

    }
}