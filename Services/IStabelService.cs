using System.Collections.Generic;
using System.Threading.Tasks;

namespace Stabel.IO.Services{
    public interface IStabelService{
         Task<(string privateId, string publicId)> Create(string content, Dictionary<string, string> parameter);

         Task Update(string privateId, Dictionary<string, string> parameters);

         Task<string> Get(string publicId);
    }
}