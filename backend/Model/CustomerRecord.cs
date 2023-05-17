namespace backend.Model
{
    public class CustomerRecord
    {
        public string id { get; set; } = "";
        public string customer_name { get; set; } = "";
        public string email { get; set; } = "";
        public string contactno { get; set; } = "";
        public DateTime customer_since_date { get; set; } = DateTime.Now;

        public string groomer_id { get; set; } = "";
        public GroomerRecord Groomer { get; set; } = null!;

        public ICollection<PetRecord> Pets { get; set; } = new List<PetRecord>();
    }
}
