//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace HRIS_ePayTrack.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class document_tracking_tbl
    {
        public string doc_ctrl_nbr { get; set; }
        public int route_seq { get; set; }
        public int route_ctrl_nbr { get; set; }
        public string docmnt_type { get; set; }
        public System.DateTime doc_dttm { get; set; }
        public string doc_user_id { get; set; }
        public string doc_remarks { get; set; }
        public Nullable<int> rlsd_retd_2_route_ctrl_nbr { get; set; }
        public string document_status { get; set; }
    }
}
