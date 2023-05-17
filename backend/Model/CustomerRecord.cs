namespace backend.Model
{
    public class CustomerRecord
    {
        public string Id { get; set; } = "";
        public string CustomerName { get; set; } = "";
        public string PetName { get; set; } = "";
        public string Email { get; set; } = "";
        public string ContactNumber { get; set; } = "";
        public DateTime CustomerSinceDate { get; set; } = DateTime.Now;
        public string GroomDay { get; set; } = "";
        public string GroomFrequency { get; set; } = "";
    }
}
