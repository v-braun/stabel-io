namespace Stabel.IO.Models{
    public class SamplesResponse{
        
        public SampleEntry[] Items { get; set; } = new SampleEntry[]{};

        public class SampleEntry{
            public string Title { get; set; }
            public string Url { get; set; }

            public SampleEntryParam[] Parameters{ get; set; } = new SampleEntryParam[]{};
        }

        public class SampleEntryParam{
            public string Name{ get; set; }
            public string Value { get; set; }
        }
    }
}