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
    
    public partial class sp_edocument_trk_tbl_history_Result
    {
        public string doc_ctrl_nbr { get; set; }
        public Nullable<int> route_seq { get; set; }
        public string vlt_dept_code { get; set; }
        public string department_short_name { get; set; }
        public string docmnt_type { get; set; }
        public string docmnt_type_descr { get; set; }
        public Nullable<System.DateTime> doc_dttm { get; set; }
        public string doc_pbo_nbr { get; set; }
        public string doc_voucher_nbr { get; set; }
        public string doc_cafoa { get; set; }
        public string doc_pto_nbr { get; set; }
        public string document_status { get; set; }
        public string doc_user_id { get; set; }
        public string doc_remarks { get; set; }
        public string payroll_registry_descr { get; set; }
        public Nullable<decimal> gross_pay { get; set; }
        public Nullable<decimal> net_pay { get; set; }
        public string payrolltemplate_code { get; set; }
        public string payrolltemplate_descr { get; set; }
        public string spent_time { get; set; }
        public string spent_time_tot { get; set; }
        public string doc_voucher_nbr_pay { get; set; }
        public string doc_voucher_nbr_ca { get; set; }
        public string payroll_registry_nbr_upd { get; set; }
        public string ca_ctrl_nbr_upd { get; set; }
        public string employee_name { get; set; }
    }
}
