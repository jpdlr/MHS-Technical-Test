namespace backend.Model
{
    public class CustomerRecord
    {
        public string id { get; set; } = "";
        public string customer_name { get; set; } = "";
        public string email { get; set; } = "";
        public string contactno { get; set; } = "";
        public DateTime cust_since_date { get; set; } = DateTime.Now;
        public string groom_day { get; set; } = "";
        public string groom_frequency { get; set; } = "";
        public string groomer_id { get; set; } = "";
        // public GroomerRecord Groomer { get; set; } = null!;

        // public ICollection<PetRecord> Pets { get; set; } = new List<PetRecord>();
    }
}
