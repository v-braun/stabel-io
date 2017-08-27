using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using Stabel.IO.Models;
using Stabel.IO.Services;

namespace Stabel.IO.Controllers{

    [Route("api/v1")]
    public class StabelV1Controller : Controller{

        private readonly IStabelService _service;

        public StabelV1Controller(IStabelService service){
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody]StabelCreateRequest request){
            if(request == null) return BadRequest();
            if(string.IsNullOrWhiteSpace(request.Content)) return BadRequest();            

            var result = await _service.Create(request.Content, request.Parameter);
            
            var rq = Url.ActionContext.HttpContext.Request;
            return Ok(new StabelCreateResponse{
                PublicId = result.publicId,
                PrivateId = result.privateId,
                PutUrl = $"{rq.Scheme}://{rq.Host}/api/v1/{result.privateId}",
                SendUrl = $"{rq.Scheme}://{rq.Host}/api/v1/p/{result.privateId}",
                GetUrl = $"{rq.Scheme}://{rq.Host}/api/v1/{result.publicId}",
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(string id){
            if(string.IsNullOrWhiteSpace(id)){
                return BadRequest();
            }

            var result = await _service.Get(id);
            if(string.IsNullOrWhiteSpace(result)){
                return NotFound();
            }

            return Content(result, "image/svg+xml");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, [FromBody]StabelUpdateRequest request){
            if(string.IsNullOrWhiteSpace(id)){
                return BadRequest();
            }
            if(request == null){
                request = new StabelUpdateRequest();
            }
            if(request.Parameter == null){
                request.Parameter = new Dictionary<string, string>();
            }

            try{
                await _service.Update(id, request.Parameter);
                return Ok();
            }
            catch(InvalidOperationException){
                return NotFound();
            }
            catch(Exception){
                return BadRequest();
            }
        }

        [HttpGet("p/{id}")]
        [HttpPut("p/{id}")]
        [HttpPost("p/{id}")]
        public async Task<ActionResult> Send(string id, [FromQuery]StabelUpdateRequest request){
            return await Put(id, request);
        }
    }
}