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
    
    public partial class vw_document_tracking_tbl_2be_rcvd_all
    {
        public string doc_ctrl_nbr { get; set; }
        public Nullable<int> route_seq { get; set; }
        public Nullable<int> route_ctrl_nbr { get; set; }
        public string docmnt_type { get; set; }
        public string doc_user_id { get; set; }
        public string doc_remarks { get; set; }
        public string doc_obr_nbr { get; set; }
        public string doc_fund_subcode { get; set; }
        public string doc_voucher_nbr { get; set; }
        public string doc_check_nbr { get; set; }
        public string doc_othr_info { get; set; }
        public Nullable<int> rlsd_retd_2_route_ctrl_nbr { get; set; }
        public string document_status { get; set; }
        public string document_status_descr { get; set; }
        public Nullable<bool> required_doc { get; set; }
        public string required_doc_type { get; set; }
        public string new_row_flag { get; set; }
        public string with_data_link { get; set; }
        public string data_mode { get; set; }
        public string docmnt_type_source { get; set; }
        public string payroll_registry_descr { get; set; }
        public Nullable<decimal> gross_pay { get; set; }
        public Nullable<decimal> net_pay { get; set; }
        public string payrolltemplate_code { get; set; }
        public string payroll_year { get; set; }
        public string payroll_month { get; set; }
        public string payrolltemplate_descr { get; set; }
        public string department_code { get; set; }
        public string role_id { get; set; }
        public Nullable<System.DateTime> doc_dttm { get; set; }
    }
}
