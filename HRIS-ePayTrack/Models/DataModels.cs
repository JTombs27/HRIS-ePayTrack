using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRIS_ePayTrack.Models
{
    public class DataModels
    {
    }
    public class DocTrack 
    {
        public DateTime dttm { get; set; }
        public string remarks { get; set; }
        public string doc_nbr { get; set; }
        public string doc_fund_subcode { get; set; }
        public int nbr { get; set; }
        public string a_flag { get; set; }
        public string ToRelease_route  { get; set; }
        public string ToReturn_route  { get; set; }
        
    }
   
}