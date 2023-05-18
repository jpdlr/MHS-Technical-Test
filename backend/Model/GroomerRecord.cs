namespace backend.Model
{
    public class GroomerRecord
    {
        public string id { get; set; } = "";
        public string groomer_name { get; set; } = "";
        public string email { get; set; } = "";
        public string password { get; set; } = "";
        public DateTime register_date { get; set; } = DateTime.Now;
        public DateTime last_login { get; set; } = DateTime.Now;
        public ICollection<CustomerRecord> Customers { get; set; } = new List<CustomerRecord>();
    }
}
