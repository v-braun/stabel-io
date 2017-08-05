using System.Collections.Generic;

namespace Stabel.IO.Models{
    public class StabelUpdateRequest{
        public Dictionary<string,string> Parameter { get; set; } = new Dictionary<string,string>();        
    }
}