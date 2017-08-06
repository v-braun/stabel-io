using Microsoft.AspNetCore.Mvc;
using Stabel.IO.Models;

namespace Stabel.IO.Controllers{

    [Route("api/[controller]")]
    public class SamplesController{
        
        [HttpGet]
        public SamplesResponse Get(){
            return new SamplesResponse{
                Items = new SamplesResponse.SampleEntry[]{
                    new SamplesResponse.SampleEntry{
                        Title = "counter",
                        Url = "/assets/samples/counter.svg",
                        Parameters = new SamplesResponse.SampleEntryParam[]{
                            new SamplesResponse.SampleEntryParam{
                                Name = "count",
                                Value = "42"
                            }
                        }
                    },
                    new SamplesResponse.SampleEntry{
                        Title = "Build Status",
                        Url = "/assets/samples/build_status.svg",
                        Parameters = new SamplesResponse.SampleEntryParam[]{
                            new SamplesResponse.SampleEntryParam{
                                Name = "passing or failure",
                                Value = "passing"
                            }
                        }
                    },
                    new SamplesResponse.SampleEntry{
                        Title = "colored status with text",
                        Url = "/assets/samples/ellipse-text.svg",
                        Parameters = new SamplesResponse.SampleEntryParam[]{
                            new SamplesResponse.SampleEntryParam{
                                Name = "color",
                                Value = "blue"
                            },
                            new SamplesResponse.SampleEntryParam{
                                Name = "text",
                                Value = "color me"
                            },
                            
                        }
                    },
                    new SamplesResponse.SampleEntry{
                        Title = "colored status",
                        Url = "/assets/samples/ellipse.svg",
                        Parameters = new SamplesResponse.SampleEntryParam[]{
                            new SamplesResponse.SampleEntryParam{
                                Name = "color",
                                Value = "red"
                            },
                        }                        
                    },
                    new SamplesResponse.SampleEntry{
                        Title = "location",
                        Url = "/assets/samples/location.svg",
                        Parameters = new SamplesResponse.SampleEntryParam[]{
                            new SamplesResponse.SampleEntryParam{
                                Name = "yes or no",
                                Value = "yes"
                            },
                            new SamplesResponse.SampleEntryParam{
                                Name = "location",
                                Value = "home"
                            },
                        }
                    },
                    new SamplesResponse.SampleEntry{
                        Title = "service status",
                        Url = "/assets/samples/service_status.svg",
                        Parameters = new SamplesResponse.SampleEntryParam[]{
                            new SamplesResponse.SampleEntryParam{
                                Name = "stopped or running",
                                Value = "running"
                            },
                            new SamplesResponse.SampleEntryParam{
                                Name = "service name",
                                Value = "backend"
                            },
                        }
                    },
                    new SamplesResponse.SampleEntry{
                        Title = "visitors counter",
                        Url = "/assets/samples/visitors.svg",
                        Parameters = new SamplesResponse.SampleEntryParam[]{
                            new SamplesResponse.SampleEntryParam{
                                Name = "count",
                                Value = "12387"
                            },
                        }
                    }
                }
            };
        }
    }
}