using System.Collections.Generic;

namespace Stabel.IO.Models{
    public class StabelCreateRequest{
        public string Content { get; set; }
        public Dictionary<string,string> Parameter { get; set; } = new Dictionary<string,string>();
    }
}