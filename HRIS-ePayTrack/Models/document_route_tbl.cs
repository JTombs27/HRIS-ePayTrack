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
    
    public partial class document_route_tbl
    {
        public System.DateTime effective_date { get; set; }
        public int route_ctrl_nbr { get; set; }
        public string route_descr { get; set; }
        public string department_code { get; set; }
        public Nullable<int> next_route_ctrl_nbr { get; set; }
        public string rcvd_docmnt_type { get; set; }
        public string rlsd_docmnt_type { get; set; }
        public string retd_docmnt_type { get; set; }
        public Nullable<bool> rcvd_required_doc { get; set; }
        public Nullable<bool> rlsd_required_doc { get; set; }
    }
}
