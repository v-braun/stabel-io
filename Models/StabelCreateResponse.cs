namespace Stabel.IO.Models{
    public class StabelCreateResponse{
        public string PublicId { get; set; }
        public string PrivateId { get; set; }
        
        public string PutUrl { get; set; }
        public string GetUrl { get; set; }
        public string SendUrl { get; set; }

    }
}