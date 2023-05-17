namespace backend.Model
{
    public class PetRecord
    {
        public string id { get; set; } = "";
        public string customer_name { get; set; } = "";
        public string pet_name { get; set; } = "";
        public string tag_serial_number { get; set; } = "";
        public string visual_desc { get; set; } = "";
        public string allergies { get; set; } = "";
        public string customer_id { get; set; } = "";
        public CustomerRecord Customer { get; set; } = null!;
    }
}
