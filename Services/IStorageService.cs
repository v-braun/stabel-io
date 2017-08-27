using System.Collections.Generic;
using System.Threading.Tasks;

namespace Stabel.IO.Services{
    public interface IStorageService{
         Task CreateUrUpdateAsync(string container, string blobName, string content, IDictionary<string, string> meta = null);

         Task<(string content, IDictionary<string, string> meta)> GetAsync(string container, string blobName);
    }
}