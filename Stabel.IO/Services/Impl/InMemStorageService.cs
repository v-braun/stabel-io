using System.Collections.Generic;
using System.Threading.Tasks;

namespace Stabel.IO.Services.Impl{
    public class InMemStorageService : IStorageService{

        private class StorageItem{
            public string Container { get; set; }
            public string Name { get; set; }
            public string Content { get; set; }
            public string Id{
                get{
                    return $"{Container}_{Name}";
                }
            }
            public IDictionary<string, string> Meta { get; set; }
        }

        private readonly IDictionary<string, StorageItem> _data = new Dictionary<string, StorageItem>();
        
        public async Task CreateUrUpdateAsync(string container, string name, string content, IDictionary<string, string> meta = null){
            var item = new StorageItem{
                Container = container,
                Name = name,
                Meta = meta,
                Content = content
            };
            
            _data[item.Id] = item;
            await Task.FromResult(0);
        }

        public async Task<(string content, IDictionary<string, string> meta)> GetAsync(string container, string blobName){
            var item = new StorageItem{
                Container = container,
                Name = blobName
            };
            string content = null;
            IDictionary<string, string> meta = null;
            if(_data.ContainsKey(item.Id)){
                item = _data[item.Id];
                content = item.Content;
                meta = item.Meta;
            }
    
            return await Task.FromResult((content, meta));
        }
    }
}