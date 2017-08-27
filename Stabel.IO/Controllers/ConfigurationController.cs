using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Stabel.IO.Models;

namespace Stabel.IO.Controllers{

    [Route("api/config")]
    public class ConfigurationController : Controller{
        private readonly IConfigurationRoot config;
        public ConfigurationController(IConfigurationRoot config){
            this.config = config;
        }

        [HttpGet()]
        public ActionResult Get(){
            var version = this.config.GetValue<string>("AppVersion");

            var config = new ConfigurationResponse{
                AppVersion = version
            };

            var result = Json(config);

            return result;
        }        

    }
}