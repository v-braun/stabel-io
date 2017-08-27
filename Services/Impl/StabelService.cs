using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;


namespace Stabel.IO.Services.Impl{
    public class StabelService : IStabelService{

        private readonly IStorageService _storage;
        public StabelService(IStorageService storage){
            _storage = storage;
        }

        private (string container, string compiled, string template) GetBlobLocation(string id){
            var container = "stabel-v1";
            var compiled = $"{id}_compiled";
            var template = $"{id}_template";

            return (container, compiled, template);
        }
        private string CompileTemplate(string content, Dictionary<string, string> parameters){
            foreach(var p in parameters){
                var exp = "{{"+p.Key+"}}";
                var regex = new Regex(exp);
                content = regex.Replace(content, p.Value);
            }

            return content;
        }
        
        private string CreateHash(string val){
            using(SHA256 shaHash = SHA256.Create()){
                var bytes = Encoding.UTF8.GetBytes(val);
                var result = SafeBase64(bytes);
                //var result = string.Join("", bytes.Select(b => b.ToString("x2")));

                return result;
            }
        }

        private string CreatePublicId(string privateId){
            return CreateHash(privateId);
        }
        private string CreatePrivateId(){
            var bytes = Guid.NewGuid().ToByteArray();
            var result = SafeBase64(bytes);
            
            return result;
        }

        private string SafeBase64(byte[] bytes){
            var result = Convert.ToBase64String(bytes);
            result = result.Replace("=", "");
            result = result.Replace("+", "");
            result = result.Replace("/", "");

            result = result.ToLower();
            return result;
        }

        public async Task<(string privateId, string publicId)> Create(string content, Dictionary<string, string> parameter){
            if(string.IsNullOrWhiteSpace(content)){
                throw new ArgumentNullException(nameof(content));
            }
            if(parameter == null){
                parameter = new Dictionary<string, string>();
            }

            var privId = CreatePrivateId();
            var pubId = CreatePublicId(privId);

            var meta = new Dictionary<string, string>(){
                {"publicid", pubId},
                {"privateid", privId},
                {"createdat", DateTime.UtcNow.ToString("yyyyMMddHHmmss")}
            };

            var location = GetBlobLocation(pubId);
            var template = content;
            var compiled = CompileTemplate(content, parameter);

            await _storage.CreateUrUpdateAsync(location.container, location.template, template, meta);
            await _storage.CreateUrUpdateAsync(location.container, location.compiled, compiled);

            return (privateId: privId, publicId: pubId);
        }

        public async Task<string> Get(string publicId){
            if(string.IsNullOrWhiteSpace(publicId)){
                throw new ArgumentNullException(nameof(publicId));
            }

            var location = GetBlobLocation(publicId);
            var data = await _storage.GetAsync(location.container, location.compiled);
            
            if(data.content == null) return null;

            return data.content;
        }

        public async Task Update(string privateId, Dictionary<string, string> parameter){
            if(string.IsNullOrWhiteSpace(privateId)){
                throw new ArgumentNullException(nameof(privateId));
            }
            if(parameter == null){
                parameter = new Dictionary<string, string>();
            }

            var pubId = CreatePublicId(privateId);
            var location = GetBlobLocation(pubId);

            var (content, meta) = await _storage.GetAsync(location.container, location.template);
            if(meta == null){
                throw new InvalidOperationException("not found");
            }

            if(!meta.ContainsKey("privateid")) return;
            if(meta["privateid"] != privateId) return;

            var compiled = CompileTemplate(content, parameter);

            await _storage.CreateUrUpdateAsync(location.container, location.compiled, compiled);
        }
    }
}