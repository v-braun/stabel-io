using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace Stabel.IO.Services.Impl{
    public class AzureStorageService : IStorageService{

        private readonly CloudBlobClient _blobClient;

        public AzureStorageService(string connectionString){
            var storageAccount = CloudStorageAccount.Parse(connectionString);
            _blobClient = storageAccount.CreateCloudBlobClient();
        }

        public async Task CreateUrUpdateAsync(string container, string blobName, string content, IDictionary<string, string> meta = null){
            var containerRef = _blobClient.GetContainerReference(container);
            await containerRef.CreateIfNotExistsAsync();
            
            var blobRef = containerRef.GetBlockBlobReference(blobName);
            await blobRef.UploadTextAsync(content);
            if(meta != null){
                await blobRef.FetchAttributesAsync();
                System.Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(meta));
                foreach(var item in meta){
                    
                    blobRef.Metadata[item.Key] = item.Value;
                }
            }

            await blobRef.SetMetadataAsync();
        }

        public async Task<(string content, IDictionary<string, string> meta)> GetAsync(string container, string blobName){
            var containerRef = _blobClient.GetContainerReference(container);
            bool exists = await containerRef.ExistsAsync();
            if(!exists){
                return (null, null);
            }
            var blobRef = containerRef.GetBlockBlobReference(blobName);
            exists = await blobRef.ExistsAsync();
            if(!exists){
                return (null, null);
            }

            await blobRef.FetchAttributesAsync();
            var content = await blobRef.DownloadTextAsync();
            var metadata = new Dictionary<string, string>(blobRef.Metadata);
            
            return (content, metadata);
        }
    }
}