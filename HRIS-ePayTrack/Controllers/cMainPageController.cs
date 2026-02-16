using HRIS_Common;
using HRIS_ePayTrack.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace HRIS_ePayTrack.Controllers
{
   
        
    public class cMainPageController : Controller
    {
        HRIS_TRKEntities db     = new HRIS_TRKEntities();
        CommonDB Cmn            = new CommonDB();
        string role_id          = "";
        string paytrk_auth      = "";
        string leave_route_code = "";
        string route_level      = "";
        string my_leave_dep     = "";
        // GET: cMainPage
        public ActionResult Index()
        {
            if (Session["TEMP_user_id"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            else
            {
                Session["user_id"] = Session["TEMP_user_id"].ToString();
            }
           
            return View();
        }
        public ActionResult Initialize()
        {
            db.Database.CommandTimeout = int.MaxValue;
            DateTime date_tm    = DateTime.Now;
            var dt_tm           = String.Format("{0:yyyy-MM-dd hh:mm:ss}", date_tm);
            role_id             = Session["role_id"].ToString();
            paytrk_auth         = Session["paytrk_authority"].ToString();
            string user_id      = Session["user_id"].ToString();
            var department_code = Session["department_code"].ToString();
            var message         = "";
            var lv_user         = db.leave_route_users.Where(a => a.route_user_id == user_id).FirstOrDefault();
            //Updated By: Joseph M. Tombo Jr. 12-15-2020
            //Initialize count into 0
            //---------------------------------
            Session["saving_count"] = 0;
            Session["my_leave_dep"] = "";

            //----------------------------------
            try
            {
               
                //var departmentname = db.vw_department_tbl_list_TRK.Where(a => a.department_code == department_code).FirstOrDefault();
                db.Database.CommandTimeout = int.MaxValue;
                var dept                = Session["department_code"].ToString();
                if (lv_user != null)
                {
                    my_leave_dep            = lv_user.route_code;
                    Session["my_leave_dep"] = my_leave_dep;
                }
                if (paytrk_auth != "VW-ONL" && lv_user != null)
                {
                    
                    Session["leave_route_code"]         = lv_user.route_code.ToString();
                    Session["route_level"]              = lv_user.route_level;

                    var ToReceive       = "";// db.vw_edocument_trk_tbl_2be_rcvd.Where(       a => (a.department_code == dept && a.docmnt_type != "LV") || (a.department_code == my_leave_dep && a.docmnt_type == "LV")).ToList();
                    var ToRelease       = ""; //db.vw_edocument_trk_tbl_tobe_release.Where(   a => (a.department_code == dept && a.docmnt_type != "LV") || (a.department_code == my_leave_dep && a.docmnt_type == "LV")).ToList();
                    var DocType         = db.document_type_tbl_list().ToList();
                    var departmentnames = db.vw_department_tbl_list_TRK.ToList();
                    var docfundcode     = db.vw_cashadv_fund_sub_tbl_TRK;
                    var doc_link        = db.vw_document_tracking_link_tbl.ToList();
                    var func_list       = db.vw_functions_tbl_list_TRK.ToList(); // CAFOA
                    message = "success";
                    return JSON(new { message, ToReceive, ToRelease, DocType, paytrk_auth, departmentnames, department_code, docfundcode, dt_tm, doc_link, func_list }, JsonRequestBehavior.AllowGet);
                }
                else if (paytrk_auth == "VW-ONL" && lv_user != null)
                {
                    //my_leave_dep =  lv_user.route_level;
                    //Session["my_leave_dep"] = my_leave_dep;
                    Session["leave_route_code"] = lv_user.route_code.ToString();
                    Session["route_level"] = lv_user.route_level;

                    var ToReceive       = "";//db.vw_edocument_trk_tbl_2be_rcvd.Where(a=> a.docmnt_type == "LV" && a.department_code == my_leave_dep).ToList();
                    var ToRelease       = "";//db.vw_edocument_trk_tbl_tobe_release.Where(a =>  a.docmnt_type == "LV" && a.department_code == my_leave_dep).ToList();
                    var DocType         = db.document_type_tbl_list().ToList();
                    var departmentnames = db.vw_department_tbl_list_TRK.ToList();
                    var docfundcode     = db.vw_cashadv_fund_sub_tbl_TRK;
                    var doc_link        = db.vw_document_tracking_link_tbl.ToList();
                    var func_list       = db.vw_functions_tbl_list_TRK.ToList(); // CAFOA
                    message             = "success";
                    paytrk_auth         = "RC-RL";
                    return JSON(new { message, ToReceive, ToRelease, DocType, paytrk_auth, departmentnames, department_code, docfundcode, dt_tm, doc_link, func_list }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var ToReceive = ""; //db.vw_edocument_trk_tbl_2be_rcvd.Where(a => a.department_code == dept && a.docmnt_type != "LV").ToList();
                    var ToRelease = ""; //db.vw_edocument_trk_tbl_tobe_release.Where(a => a.department_code == dept && a.docmnt_type != "LV").ToList();
                    var DocType = db.document_type_tbl_list().ToList();
                    var departmentnames = db.vw_department_tbl_list_TRK.ToList();
                    var docfundcode = db.vw_cashadv_fund_sub_tbl_TRK;
                    var doc_link = db.vw_document_tracking_link_tbl.ToList();
                    var func_list = db.vw_functions_tbl_list_TRK.ToList(); // CAFOA
                    message = "success";
                    return JSON(new { message, ToReceive, ToRelease, DocType, paytrk_auth, departmentnames, department_code, docfundcode, dt_tm, doc_link, func_list }, JsonRequestBehavior.AllowGet);
                }
              
            }
            catch (DbEntityValidationException e)
            {
                 message = DbEntityValidationExceptionError(e);

                 return JSON(new { message }, JsonRequestBehavior.AllowGet);
            }
        }
     

        public string isnull(string val)
        {
            if(val == null)
            {
                return "";
            }
            else
            {
                return val;
            }
        }

        public ActionResult sp_set_remarks_leave_tracking(string par_doc_ctrl_nbr,string par_ledger_ctrl_no,string remarks)
        {
            db.Database.CommandTimeout = int.MaxValue;
            var dept = Session["department_code"].ToString();
            var userid = Session["user_id"].ToString();
            string message = "";
            try
            {
                db.sp_set_remarks_leave_tracking(par_doc_ctrl_nbr, par_ledger_ctrl_no, remarks, userid);  
                return JSON(new { message = "success" }, JsonRequestBehavior.AllowGet);
            }
            catch (DbEntityValidationException e)
            {
                message = DbEntityValidationExceptionError(e);

                return JSON(new { message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult sp_document_tracking_nbrs_tbl_update(vw_edocument_trk_tbl_2be_rcvd det, DocTrack dt)
        {
            db.Database.CommandTimeout = int.MaxValue;
            var dept = Session["department_code"].ToString();
            var userid = Session["user_id"].ToString();
            var message = "";
            try
            {
                if (det.required_doc == 1 && det.required_doc_type == "OBR")
               // if (det.required_doc == 1 )
                {
                    db.sp_edocument_trk_nbrs_tbl_update(
                              det.doc_ctrl_nbr
                            , ISNULL(dt.doc_fund_subcode, "")
                            , ISNULL(dt.doc_nbr, "")
                            ,""
                            , dept
                            //, Convert.ToDateTime(dt.dttm)
                            , DateTime.Now //UPDATE BY JORGE: 09-17-2020
                            , userid
                       );
                }

                if (det.required_doc == 1 && det.required_doc_type == "VCR")
                // if (det.required_doc == 1 )
                {
                    db.sp_edocument_trk_nbrs_tbl_update(
                              det.doc_ctrl_nbr
                            , ISNULL(dt.doc_fund_subcode, "")
                            , ISNULL(dt.doc_nbr, "")
                            , ""
                            , dept
                            //, Convert.ToDateTime(dt.dttm)
                            , DateTime.Now //UPDATE BY JORGE: 09-17-2020
                            , userid
                       );
                }

                else if (det.required_doc == 1 && det.required_doc_type == "CHK")
                //else if (det.required_doc == 1)
                {
                      db.sp_edocument_trk_nbrs_tbl_update(
                               det.doc_ctrl_nbr
                             , ""
                             , ISNULL(dt.doc_nbr, "")
                             ,""
                             , dept
                             //, Convert.ToDateTime(dt.dttm)
                             , DateTime.Now //UPDATE BY JORGE: 09-17-2020
                             , userid
                        );
                }
                message = "success";
                return JSON(new { message }, JsonRequestBehavior.AllowGet);
            }
            catch (DbEntityValidationException e)
            {
                message = DbEntityValidationExceptionError(e);

                return JSON(new { message }, JsonRequestBehavior.AllowGet);
            }
         
        }
        public ActionResult SaveRoute(vw_edocument_trk_tbl_2be_rcvd det, DocTrack dt, bool change_date)
        {
            db.Database.CommandTimeout  = int.MaxValue;
            role_id                     = Session["role_id"].ToString();
            paytrk_auth                 = Session["paytrk_authority"].ToString();
           
            DateTime date_tm    = DateTime.Now;
            var dt_tm           = String.Format("{0:yyyy-MM-dd HH:mm:ss}", date_tm);
            var dttm            = Convert.ToDateTime(String.Format("{0:yyyy-MM-dd HH:mm:ss}", dt.dttm));
            var message         = "";
            var routTo          = "";
            var doc_status      = "";
            var swl             = "";
            string refresh_grid = "N";

            if(dt.a_flag == "V")
            {
                routTo      = det.vlt_dept_code;
                doc_status  = det.document_status;
                swl         = "Successfully received";
            }
            else if(dt.a_flag == "L")
            {
                routTo      = dt.ToRelease_route;
                doc_status  = "L";
                swl         = "Successfully released";
            }
            else if(dt.a_flag == "T")
            {
                routTo      = dt.ToReturn_route;
                doc_status  = "T";
                swl         = "Successfully returned";
            }
            var dtm = "";
            if (paytrk_auth == "ADMIN" || paytrk_auth == "ADM-RL" || paytrk_auth == "ADM-RC")
            {
                if (change_date == true)
                {
                    dtm = dttm.ToString("yyyy-MM-dd HH:mm:ss");
                }
                else
                {
                    dtm = dt_tm;
                }
            }
            else
            {
                dtm = dt_tm;
            }

            object ToReceive = new object();
            object ToRelease = new object();
            var dept        = Session["department_code"].ToString();
            var userid      = Session["user_id"].ToString();
          
            try
            {

                //LASTT
                    edocument_trk_tbl doc   = new edocument_trk_tbl();
                    doc.doc_ctrl_nbr        = det.doc_ctrl_nbr;
                    doc.route_seq           = (int)det.route_seq;
                    doc.department_code     = (det.doc_ctrl_nbr.Substring(0,3) == "LV-" ?  Session["leave_route_code"].ToString():dept.ToString());
                    doc.vlt_dept_code       = routTo;
                    doc.doc_dttm            = Convert.ToDateTime(dtm); //DateTime.Now;
                    doc.doc_user_id         = userid;
                    doc.doc_remarks         = dt.remarks;
                    doc.document_status     = doc_status;
                    db.edocument_trk_tbl.Add(doc);
                     db.SaveChanges();
                    //If Count Updated By: Joseph M. Tombo Jr. 12-15-2020
                    if (int.Parse(Session["saving_count"].ToString().Trim()) == 9)
                    {
                        ToReceive       = db.sp_document_tracking_tbl_2be_rcvd(role_id, dept).ToList();
                        ToRelease       = db.sp_document_tracking_tbl_2be_rlsd(role_id, dept).ToList();
                        refresh_grid    = "Y";
                        Session["saving_count"] = 0;
                    }
                    else
                    {
                        Session["saving_count"] = (int.Parse(Session["saving_count"].ToString().Trim()) +1);
                    }
                    message = "success";
                    //Updated By: Joseph M. Tombo Jr. 12-15-2020 Added the refresh_grid flag in the return
                    return JSON(new { message, ToReceive, ToRelease, swl, refresh_grid }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                message = e.Message;//DbEntityValidationExceptionError(e);

                return JSON(new { message }, JsonRequestBehavior.AllowGet);
            }

        }





        //public ActionResult ToReturnRoute(int orig_route, string docctrlnbr)
        //{
        //    var dept = Session["department_code"].ToString();
        //    var message = "";
        //    try
        //    {
        //        var route = db.sp_document_tracking_return_2_route(dept, docctrlnbr).ToList();
        //        message = "success";
        //        return Json(new { message, route }, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (DbEntityValidationException e)
        //    {
        //        message = DbEntityValidationExceptionError(e);

        //        return Json(new { message }, JsonRequestBehavior.AllowGet);
        //    }
        //}
       
       public ActionResult ReturnReleaseRouting(string docctrlnbr, string par_action)
       {
            db.Database.CommandTimeout = int.MaxValue;
            DateTime date_tm    = DateTime.Now;
            var dt_tm           = String.Format("{0:yyyy-MM-dd hh:mm:ss}", date_tm);
            var paytrk_auth     = Session["paytrk_authority"].ToString();
            var dept            = Session["department_code"].ToString();
            var message         = "";
            var user_id         = Session["user_id"].ToString();
            try
            {
                var nbr_list        = db.edocument_trk_nbrs_tbl.ToList();
                if (par_action == "V")
                {
                    var release_route       = "";
                    var return_route        = "";
                    message = "success";
                    return JSON(new { message, release_route, return_route, paytrk_auth, nbr_list, dt_tm }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var release_route = db.sp_edocument_trk_release_V2_route(dept, docctrlnbr, user_id).ToList();
                    var return_route = db.sp_edocument_trk_return_2_route(dept, docctrlnbr).ToList();
                    message = "success";
                    return JSON(new { message, release_route, return_route, paytrk_auth, nbr_list, dt_tm }, JsonRequestBehavior.AllowGet);
                }
               
            }
            catch (DbEntityValidationException e)
            {
                message = DbEntityValidationExceptionError(e);

                return JSON(new { message }, JsonRequestBehavior.AllowGet);
            }
        }
        //public ActionResult ToReleaseRoute(int orig_route, string docctrlnbr)
        //{
        //    var dept = Session["department_code"].ToString();
        //    var message = "";
        //    try
        //    {
        //        var route = db.sp_document_tracking_release_2_route(dept, docctrlnbr).ToList();
        //        message = "success";
        //        return Json(new { message, route }, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (DbEntityValidationException e)
        //    {
        //        message = DbEntityValidationExceptionError(e);

        //        return Json(new { message }, JsonRequestBehavior.AllowGet);
        //    }
        //}
        public String DbEntityValidationExceptionError(DbEntityValidationException e)
        {
            string message = "";
            db.Database.CommandTimeout = int.MaxValue;
            foreach (var eve in e.EntityValidationErrors)
            {
                Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                    eve.Entry.Entity.GetType().Name, eve.Entry.State);
                foreach (var ve in eve.ValidationErrors)
                {


                    message = "- Property: \"{0}\", Error: \"{1}\"" + ve.PropertyName + "  :  " + ve.ErrorMessage;
                    Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                        ve.PropertyName, ve.ErrorMessage);


                }
            }
            return message;
        }

        public String ISNULL(string val,string val2)
        {
            if(val == null)
            {
                return val2;
            }
            else
            {
                return val;
            }
        }
        public DateTime ISNULL2(DateTime val, string val2)
        {
            if (val == null)
            {
                return Convert.ToDateTime(val2);
            }
            else
            {
                return val;
            }
        }
        public int ISNULL3(int val, string val2)
        {
            if (val == 0)
            {
                return Convert.ToInt32(val2);
            }
            else
            {
                return val;
            }
        }
        public string ActionTest(string id,string t1, string t2)
        {
            if(t1 == t2)
            {
                return id;
            }
            else
            {
                return "";
            }
        }


        //*********************************************************************//
        // Created By : VJA - Created Date : 01/21/2020
        // Description: Populate Template Type on Combolist
        ////*********************************************************************//
        public ActionResult RetrieveTemplate(string par_payrolltemplate_code)
        {
            //var sp_payrollregistry_template_combolist_TRK = db.sp_payrollregistry_template_combolist_TRK(par_payrolltemplate_code).ToList();
            //return Json(new { sp_payrollregistry_template_combolist_TRK }, JsonRequestBehavior.AllowGet);

            db.Database.CommandTimeout = int.MaxValue;
            var message = "";
            try
            {

                var sp_payrollregistry_template_combolist_TRK = db.sp_payrollregistry_template_combolist_TRK(par_payrolltemplate_code).ToList();
                if (sp_payrollregistry_template_combolist_TRK.Count > 0 )
                {

                    message = "success";
                }
                else
                {
                    message = "No Data Found";
                }
                return JSON(new { sp_payrollregistry_template_combolist_TRK, message }, JsonRequestBehavior.AllowGet);
            }
            catch (DbEntityValidationException e)
            {
                message = DbEntityValidationExceptionError(e);
                return JSON(new { message }, JsonRequestBehavior.AllowGet);
            }
        }


        //*********************************************************************//
        // Created By : MARVIN - Created Date : 02/07/2020
        // Description: GET DOCUMENT HISTORY FROM DOCUMENT TRACKING
        ////*********************************************************************//
        public ActionResult getHistory(string docctrlnbr)
        {
            db.Database.CommandTimeout = int.MaxValue;
            var message = "";
            try
            {

                var doc_xtory = db.document_tracking_tbl.Where(a => a.doc_ctrl_nbr == docctrlnbr).ToList();
                message = "success";
                return JSON(new { doc_xtory, message }, JsonRequestBehavior.AllowGet);
            }
            catch (DbEntityValidationException e)
            {
                message = DbEntityValidationExceptionError(e);
                return JSON(new { message }, JsonRequestBehavior.AllowGet);
            }
           
        }


        //*********************************************************************//
        // Created By : VJA - Created Date : 01/21/2020
        // Description: Populate Employment Type
        ////*********************************************************************//
        public ActionResult SelectReportFile(string par_payrolltemplate_code, string par_payrolltemplate_code1)
        {
            try
            {

                db.Database.CommandTimeout = int.MaxValue;
                var reportfile = db.sp_payrollregistry_template_combolist_TRK(par_payrolltemplate_code).
                    Where(a => a.payrolltemplate_code == par_payrolltemplate_code1).ToList();
                return JSON(new { reportfile }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return JSON(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        //*********************************************************************//
        // Created By : VJA - Created Date : 01/21/2020
        // Description: Report for Received, Released and Returned Documents
        ////*********************************************************************//
        public ActionResult ReportDocuments(string par_doc_status, int par_year, int par_month)
        {
            db.Database.CommandTimeout = int.MaxValue;
            try
            {
                role_id = Session["role_id"].ToString();
                var dept = "";
                if (role_id == "499")
                {
                    dept = "99";
                }
                else
                {
                    dept = Session["department_code"].ToString();
                }

                var data1 = (object)2;
                var data2 = (object)2;
                var data3 = (object)2;

                if (par_doc_status == "V")
                {
                    data1 = db.sp_edocument_trk_tbl_rcvd_list(dept, par_year, par_month).ToList();
                }
                else if (par_doc_status == "L")
                {
                    data2 = db.sp_edocument_trk_tbl_rlsd_list(dept, par_year, par_month).ToList();
                }
                else if (par_doc_status == "T")
                {
                    data3 = db.sp_edocument_trk_tbl_retd_list(dept, par_year, par_month).ToList();
                }
                Session["history_page"] = Request.UrlReferrer.ToString();

                return JSON(new { data1, data2, data3, dept }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return JSON(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        //*********************************************************************//
        // Created By : VJA - Created Date : 09/19/2019
        // Description: Extract Data 
        //*********************************************************************//
        public ActionResult PreviousValuesonPage_cMainPage
            (string par_doc_ctrl_nbr
            , string par_ddl_doc_status
            , string par_track_year
            , string par_track_month
            , string par_ddl_reports

            )
        {
            var PreviousValuesonPage_cMainPage = par_doc_ctrl_nbr
                                            + "," + par_ddl_doc_status
                                            + "," + par_track_year
                                            + "," + par_track_month
                                            + "," + par_ddl_reports;

            Session["history_page"] = Request.UrlReferrer.ToString();
            Session["PreviousValuesonPage_cMainPage"] = PreviousValuesonPage_cMainPage;
            return Json(PreviousValuesonPage_cMainPage, JsonRequestBehavior.AllowGet);
        }



        //*********************************************************************//
        // Created By   : Lorraine I. Ale 
        // Created Date : 01/20/2020
        // Description  : Get Document Type List
        //*********************************************************************//
        public ActionResult Get_DocType_List()
        {
            db.Database.CommandTimeout = int.MaxValue;
            try
            {
                var docType = db.document_type_tbl_list().ToList();

                return JSON(new { message = "success", docType }, JsonRequestBehavior.AllowGet);
            }
            catch (DbEntityValidationException e)
            {
                string message = DbEntityValidationExceptionError(e);
                return JSON(new { message = message }, JsonRequestBehavior.AllowGet);
            }
        }
        //*********************************************************************//
        // Created By   : Lorraine I. Ale 
        // Created Date : 01/22/2020
        // Description  : Check if document type code already exist before saving
        //*********************************************************************//
        public ActionResult CheckExist(string docmnt_type)
        {
            db.Database.CommandTimeout = int.MaxValue;
            try
            {
                string message = "";
                var od = db.document_type_tbl.Where(a =>
                   a.docmnt_type == docmnt_type).FirstOrDefault();
                if (od != null)
                {
                    message = "";
                }
                else
                {
                    message = "success";
                }

                return JSON(new { message }, JsonRequestBehavior.AllowGet);
            }
            catch (DbEntityValidationException e)
            {
                string message = DbEntityValidationExceptionError(e);
                return JSON(new { message = message }, JsonRequestBehavior.AllowGet);
            }
        }
        //*********************************************************************//
        // Created By   : Lorraine I. Ale 
        // Created Date : 01/20/2020
        // Description  : Add new record to cash advance type table
        //*********************************************************************//
        public ActionResult Save(document_type_tbl data)
        {
            db.Database.CommandTimeout = int.MaxValue;
            try
            {
                db.document_type_tbl.Add(data);
                db.SaveChangesAsync();
                return JSON(new { message = "success" }, JsonRequestBehavior.AllowGet);
            }
            catch (DbEntityValidationException e)
            {
                string message = DbEntityValidationExceptionError(e);
                return JSON(new { message = message }, JsonRequestBehavior.AllowGet);
            }
        }
        //*********************************************************************//
        // Created By   : Lorraine I. Ale 
        // Created Date : 01/20/2020
        // Description  : Edit existing record from table
        //*********************************************************************//
        public ActionResult SaveEdit(document_type_tbl data)
        {
            db.Database.CommandTimeout = int.MaxValue;
            try
            {
                var od = db.document_type_tbl.Where(a =>
                   a.docmnt_type == data.docmnt_type).FirstOrDefault();
                od.docmnt_type_descr = data.docmnt_type_descr;

                db.SaveChanges();

                return JSON(new { message = "success" }, JsonRequestBehavior.AllowGet);
            }
            catch (DbEntityValidationException e)
            {
                string message = DbEntityValidationExceptionError(e);
                return JSON(new { message = message }, JsonRequestBehavior.AllowGet);
            }
        }
        //*********************************************************************//
        // Created By   : Lorraine I. Ale 
        // Created Date : 01/20/2020
        // Description  : Delete from table
        //*********************************************************************//
        public ActionResult Delete(string docmnt_type)
        {
            db.Database.CommandTimeout = int.MaxValue;
            try
            {
                string message = "";
                var od = db.document_type_tbl.Where(a =>
                   a.docmnt_type == docmnt_type).FirstOrDefault();
                if (od != null)
                {
                    db.document_type_tbl.Remove(od);
                    db.SaveChanges();
                    message = "success";
                }
                else
                {
                    message = "";
                }

                return JSON(new { message }, JsonRequestBehavior.AllowGet);
            }
            catch (DbEntityValidationException e)
            {
                string message = DbEntityValidationExceptionError(e);

                return JSON(new { message = message }, JsonRequestBehavior.AllowGet);
            }
        }
        //*********************************************************************//
        // Created By   : Vincent Jade H. Alivio
        // Created Date : 02/03/2020
        // Description  : Delete from table
        //*********************************************************************//
        public ActionResult RetriveDocumentSearch(string p_search_type, string p_search_text)
        {
            db.Database.CommandTimeout = int.MaxValue;
            try
            {
                var message = "";
                var search_docs_data = db.sp_edocument_trk_tbl_search(p_search_type, p_search_text).ToList();

                if (search_docs_data.Count > 0)
                {
                    message = "success";
                }
                else
                {
                    message = "No Data Found !";
                }
                return JSON(new { search_docs_data, message }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return JSON(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        //*********************************************************************//
        // Created By : VJA - Created Date : 01/21/2020
        // Description: Populate Employment Type
        ////*********************************************************************//
        //public ActionResult RetrieveTemplate_Search(string par_employment_type)
        //{
        //    try
        //    {
        //        //var data = db.sp_payrolltemplate_tbl_list(par_employment_type).ToList();
        //        return Json(new { data }, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
        //    }
        //}


        //*********************************************************************//
        // Created By : VJA - Created Date : 01/21/2020
        // Description: Populate Employment Type
        ////*********************************************************************//
        public ActionResult RetrieveCALink(string p_doc_ctrl_nbr)
        {
            db.Database.CommandTimeout = int.MaxValue;
            var message = "";
            try
            {
                var sp_document_tracking_tbl_CA_link_list = db.sp_document_tracking_tbl_CA_link_list(p_doc_ctrl_nbr).ToList();
                if (sp_document_tracking_tbl_CA_link_list.Count >0)
                {
                    message = "success";
                }
                else
                {
                    message = "No Data for Cash Advance";
                }
                return JSON(new { sp_document_tracking_tbl_CA_link_list, message }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return JSON(new { message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        //*********************************************************************//
        // Created By : VJA - Created Date : 01/21/2020
        // Description: Populate Employment Type
        ////*********************************************************************//
        public ActionResult RetrieveDocHistory(string par_doc_ctrl_nbr)
        {
            db.Database.CommandTimeout = int.MaxValue;
            var message = "";
            try
            {
                var doctype = db.edocument_trk_payroll_tbl.Where(a => a.doc_ctrl_nbr == par_doc_ctrl_nbr).FirstOrDefault();
                var sp_document_tracking_tbl_history = db.sp_edocument_trk_tbl_history(par_doc_ctrl_nbr, doctype.docmnt_type).ToList();

                if (sp_document_tracking_tbl_history.Count > 0)
                {
                    message = "success";
                    Session["history_page"] = Request.UrlReferrer.ToString();
                }
                else
                {
                    message = "No Data for Cash Advance";
                    Session["history_page"] = Request.UrlReferrer.ToString();
                }
                return JSON(new { sp_document_tracking_tbl_history, message, doctype }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var doctype = db.edocument_trk_payroll_tbl.Where(a => a.doc_ctrl_nbr == par_doc_ctrl_nbr).FirstOrDefault();

                Session["history_page"] = Request.UrlReferrer.ToString();
                return JSON(new { message = ex.Message, doctype }, JsonRequestBehavior.AllowGet);
            }
        }


        public ActionResult SaveDTRFromITCD(document_tracking_link_tbl data)
        {
            db.Database.CommandTimeout = int.MaxValue;
            var duplicate = 0;
            var message = "";
            var icon = "";
            DateTime date_tm = DateTime.Now;
            var dt_tm = String.Format("{0:yyyy-MM-dd HH:mm:ss}", date_tm);
            var dttm = Convert.ToDateTime(String.Format("{0:yyyy-MM-dd HH:mm:ss}", data.it_doc_date));
            var userid = Session["user_id"].ToString();
            try
            {
                 duplicate = db.document_tracking_link_tbl.Where(a => a.it_control_nbr == data.it_control_nbr).Count();
                if (duplicate > 0)
                {
                     message = "Duplicate Control number!";
                     icon = "error";
                }
                else
                {
                    document_tracking_link_tbl lnk = new document_tracking_link_tbl();
                    lnk.it_control_nbr = data.it_control_nbr;
                    lnk.it_doc_date = dttm;
                    lnk.it_from_name = data.it_from_name;
                    lnk.it_from_off_pos = data.it_from_off_pos;
                    lnk.doc_ctrl_nbr = "";
                    lnk.doc_dttm = Convert.ToDateTime("1900-01-01 00:00:00");
                    lnk.created_by_user = userid;
                    lnk.created_dttm = Convert.ToDateTime(dt_tm);
                    db.document_tracking_link_tbl.Add(lnk);
                    db.SaveChanges();
                    message = "Successfully received documents";
                    icon = "success";
                    
                }

                return JSON(new { message, icon }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Session["history_page"] = Request.UrlReferrer.ToString();
                return JSON(new { message = ex.Message, icon = "error" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetDTRFromITCD()
        {
            db.Database.CommandTimeout = int.MaxValue;
            var message = "";
            try
            {
                var obj = db.vw_document_tracking_link_tbl.ToList();
                return JSON(new { message, obj,icon = "success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Session["history_page"] = Request.UrlReferrer.ToString();
                return JSON(new { message = ex.Message, icon = "error" }, JsonRequestBehavior.AllowGet);
            }

        }

        public ActionResult UpdateDocLink(string it_control_nbr,string doc_ctrl_nbr)
        {
            db.Database.CommandTimeout = int.MaxValue;
            var message = "";
            DateTime date_tm = DateTime.Now;
            var dt_tm = String.Format("{0:yyyy-MM-dd HH:mm:ss}", date_tm);
          
            try
            {
                var lnk = db.document_tracking_link_tbl.Where(a => a.it_control_nbr == it_control_nbr).FirstOrDefault();
                lnk.doc_ctrl_nbr = doc_ctrl_nbr;
                lnk.doc_dttm = Convert.ToDateTime(dt_tm);
                db.SaveChanges();

                var nlink = db.vw_document_tracking_link_tbl.ToList();
                message = "success";
                return JSON(new { message, nlink }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Session["history_page"] = Request.UrlReferrer.ToString();
                return JSON(new { message = ex.Message, icon = "error" }, JsonRequestBehavior.AllowGet);
            }
        }
        protected JsonResult JSON(object data, JsonRequestBehavior behavior)
        {
            return new JsonResult()
            {
                Data = data,
                ContentType = "application/json",
                ContentEncoding = Encoding.UTF8,
                JsonRequestBehavior = behavior,
                MaxJsonLength = Int32.MaxValue
            };
        }

        public ActionResult FETCH_DATA(string doc_ctrl_nbr)
        {
            db.Database.CommandTimeout = int.MaxValue;
            var t       = "";
            var dept    = Session["department_code"].ToString();
            role_id     = Session["role_id"].ToString();
            var message = "";
            object dtl          = new object();
            object lv_details   = new object();
            db.Database.CommandTimeout = int.MaxValue;
            
            try
            {

                //var ToReceive = db.vw_document_tracking_tbl_2be_rcvd_all.Where(a => a.role_id == role_id && a.department_code == dept).ToList();
                //var ToRelease = db.vw_document_tracking_tbl_2be_rlsd_all.Where(a => a.role_id == role_id && a.department_code == dept).ToList();

                //UPDATED BY JOSEPH
                //var ToReceive = db.vw_edocument_trk_tbl_2be_rcvd.Where(a => a.department_code == dept).ToList();
                //var ToRelease = db.vw_edocument_trk_tbl_2be_rlsd.Where(a => a.department_code == dept).ToList();
               
                string my_leave_dep = Session["my_leave_dep"].ToString();

                if (dept == "03")
                {
                    var ToReceive = db.vw_edocument_trk_tbl_2be_rcvd.Where(a => (a.doc_ctrl_nbr == doc_ctrl_nbr && a.department_code == dept && a.docmnt_type != "LV") || (a.doc_ctrl_nbr == doc_ctrl_nbr && a.department_code == my_leave_dep && a.docmnt_type == "LV")).FirstOrDefault();
                    var ToRelease = db.vw_edocument_phrmod_toberelease.Where(a => (a.doc_ctrl_nbr == doc_ctrl_nbr && a.department_code == dept && a.docmnt_type != "LV") || (a.doc_ctrl_nbr == doc_ctrl_nbr && a.department_code == my_leave_dep && a.docmnt_type == "LV")).FirstOrDefault();

                    var leave_details = db.sp_get_leave_transmittal_attachment(doc_ctrl_nbr, Session["user_id"].ToString()).ToList();
                    //UPDATED BY JOSEPH
                    var V = ToReceive;
                    var L = ToRelease;


                    if (V != null)
                    {
                        dtl = V;
                        t = "V";
                    }
                    else if (L != null)
                    {
                        dtl = L;
                        t = "L";

                    }

                    message = "success";
                    return JSON(new { message, ToReceive, ToRelease, dtl, t, leave_details }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var ToReceive = db.vw_edocument_trk_tbl_2be_rcvd.Where(a => (a.doc_ctrl_nbr == doc_ctrl_nbr && a.department_code == dept && a.docmnt_type != "LV") || (a.doc_ctrl_nbr == doc_ctrl_nbr && a.department_code == my_leave_dep && a.docmnt_type == "LV")).FirstOrDefault();
                    var ToRelease = db.vw_edocument_trk_tbl_tobe_release.Where(a => (a.doc_ctrl_nbr == doc_ctrl_nbr && a.department_code == dept && a.docmnt_type != "LV") || (a.doc_ctrl_nbr == doc_ctrl_nbr && a.department_code == my_leave_dep && a.docmnt_type == "LV")).FirstOrDefault();

                    var leave_details = db.sp_get_leave_transmittal_attachment(doc_ctrl_nbr, Session["user_id"].ToString()).ToList();
                    //UPDATED BY JOSEPH
                    var V = ToReceive;
                    var L = ToRelease;


                    if (V != null)
                    {
                        dtl = V;
                        t = "V";
                    }
                    else if (L != null)
                    {
                        dtl = L;
                        t = "L";

                    }

                    message = "success";
                    return JSON(new { message, ToReceive, ToRelease, dtl, t, leave_details }, JsonRequestBehavior.AllowGet);
                }
               
            }
            catch (Exception ex)
            {
                Session["history_page"] = Request.UrlReferrer.ToString();
                return JSON(new { message = ex.Message, icon = "error" }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult transmittalLink()
        {
            db.Database.CommandTimeout = int.MaxValue;
            var message = "";
            try
            {
                //var document_tracking_link_tbl = db.document_tracking_link_tbl.ToList();
              

                var sp_dtr_transmittal_hdr_tbl_list_ATS = db.sp_dtr_transmittal_hdr_tbl_list_ATS().ToList();
                message = "Success";
                var icon = "success";

                return JSON(new { message, icon, sp_dtr_transmittal_hdr_tbl_list_ATS }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Session["history_page"] = Request.UrlReferrer.ToString();
                return JSON(new { message = ex.Message, icon = "error" }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Retrieve_TransmittalDetails(string par_transmittal_nbr)
        {

            db.Database.CommandTimeout = int.MaxValue;
            var message = "";
            try
            {
                //var document_tracking_link_tbl = db.document_tracking_link_tbl.ToList();


                var sp_dtr_transmittal_dtl_tbl_list_ATS = db.sp_dtr_transmittal_dtl_tbl_list_ATS(par_transmittal_nbr).ToList();
                message = "Success";
                var icon = "success";

                return JSON(new { message, icon, sp_dtr_transmittal_dtl_tbl_list_ATS }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Session["history_page"] = Request.UrlReferrer.ToString();
                return JSON(new { message = ex.Message, icon = "error" }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult UpdateTransmittalStatus(string par_transmittal_nbr)
        {
            db.Database.CommandTimeout = int.MaxValue;
            var message = "";
            try
            {
                //var document_tracking_link_tbl = db.document_tracking_link_tbl.ToList();

				
                var sp_update_dtr_transmittal_hdr_tbl = db.sp_update_dtr_transmittal_hdr_tbl_ATS(par_transmittal_nbr).ToList();
                message = "success";
                var icon = "success";

                var sp_edocument_trk_transmit_insert_upd = db.sp_edocument_trk_transmit_insert_upd(par_transmittal_nbr, Session["user_id"].ToString(), "1");

                return JSON(new { message, icon}, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Session["history_page"] = Request.UrlReferrer.ToString();
                return JSON(new { message = ex.Message, icon = "error" }, JsonRequestBehavior.AllowGet);
            }
        }




        public ActionResult document_tracking_tbl_2be_rlsd_cr()
        {
            db.Database.CommandTimeout = int.MaxValue;
            //var paytrk_auth = Session["paytrk_authority"].ToString();
            var role_id = Session["role_id"].ToString();
            var department_code = Session["department_code"].ToString();

            var message = "";
            try
            {
                var dt_cr = db.sp_document_tracking_tbl_2be_rlsd_cr(department_code,role_id).ToList();
                message = "Success";
                var icon = "success";
                return JSON(new { message, icon, dt_cr }, JsonRequestBehavior.AllowGet);
            }
            catch (DbEntityValidationException ex)
            {
                message = DbEntityValidationExceptionError(ex);
                return JSON(new { message = ex.Message, icon = "error" }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult CorrectReleasedRoute(string doc_ctrl_nbr, string ToRelease_route, int route_seq, string remarks)
        {
            db.Database.CommandTimeout = int.MaxValue;
            //var paytrk_auth = Session["paytrk_authority"].ToString();
            var role_id = Session["role_id"].ToString();
            var department_code = Session["department_code"].ToString();

            DateTime date_tm = DateTime.Now;
            var dt_tm = String.Format("{0:yyyy-MM-dd HH:mm:ss}", date_tm);
          
           
            var message = "";
            try
            {
                if(ToRelease_route == null || ToRelease_route == "")
                {
                    message = "Undefined Route";
                    return JSON(new { message, icon="error" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var maxseq = db.edocument_trk_tbl.Where(a => a.doc_ctrl_nbr == doc_ctrl_nbr).Max(a => a.route_seq);
                    var doc = db.edocument_trk_tbl.Where(a => a.doc_ctrl_nbr == doc_ctrl_nbr && a.route_seq == maxseq).FirstOrDefault();
                    doc.doc_dttm = Convert.ToDateTime(dt_tm);
                    doc.vlt_dept_code = ToRelease_route;
                    doc.doc_remarks = remarks;
                    db.SaveChanges();

                    var dt_cr = db.sp_document_tracking_tbl_2be_rlsd_cr(department_code, role_id).ToList();
                    message = "Route successfully corrected!";
                    var icon = "success";

                    return JSON(new { message, icon, dt_cr }, JsonRequestBehavior.AllowGet);
                }
                
            }
            catch (Exception ex)
            {

                return JSON(new { message = ex.Message, icon = "error" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult getCorrectRoute(string doc_ctrl_nbr)
        {
            db.Database.CommandTimeout = int.MaxValue;
            var department_code = Session["department_code"].ToString();
            var message = "";
            try
            {

                var correct_route = db.sp_edocument_trk_correct_2_route(department_code, doc_ctrl_nbr).ToList();
                //var correct_route = db.sp_document_tracking_release_2_route(department_code, doc_ctrl_nbr).ToList();
                message     = "Success";
                var icon    = "success";

                return JSON(new { message, icon,correct_route }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                return JSON(new { message = ex.Message, icon = "error" }, JsonRequestBehavior.AllowGet);
            }
        }
        //*********************************************************************//
        // Created By : VJA - Created Date : 2020-10-29
        // Description: Populate Detail Grid for - CAFOA
        ////*********************************************************************//
        public ActionResult Retrieve_CAFOA(string par_payroll_year, string par_payroll_registry_nbr, string par_payrolltemplate_code)
        {
            db.Database.CommandTimeout = int.MaxValue;
            var message = "";
            try
            {
                var reportlist  = db.sp_payrollregistry_cafao_rep_new(par_payroll_year, par_payroll_registry_nbr, par_payrolltemplate_code).ToList().FirstOrDefault();
                // Execute Report for Trigger to Insert to sp_cafao_dtl_tbl_list
                var data    = db.sp_cafao_dtl_tbl_list(par_payroll_year, par_payroll_registry_nbr).ToList();
                message     = "Success";
                var icon    = "success";

                return JSON(new { message, icon, data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                return JSON(new { message = ex.Message, icon = "error" }, JsonRequestBehavior.AllowGet);
            }
        }
        //*********************************************************************//
        // Created By : VJA - Created Date : 2020-10-29
        // Description: Populate Detail Grid for - CAFOA
        ////*********************************************************************//
        public ActionResult GetLastRow(string par_payroll_year, string par_payroll_registry_nbr)
        {
            db.Database.CommandTimeout = int.MaxValue;
            var message = "";
            var last_row = 1;
            try
            {
                var data = db.cafao_dtl_tbl.Where(a => a.payroll_year == par_payroll_year && a.payroll_registry_nbr == par_payroll_registry_nbr).OrderByDescending(a=> a.seq_nbr).FirstOrDefault();
                last_row = data.seq_nbr;

                if (data == null)
                {
                    last_row = 1;
                }
                else
                {
                    last_row = last_row + 1;
                }

                message = "Success";
                return JSON(new { message, last_row }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                return JSON(new { message = ex.Message, last_row }, JsonRequestBehavior.AllowGet);
            }
        }
        //*********************************************************************//
        // Created By : VJA - Created Date : 2020-10-29
        // Description: Populate Detail Grid for - CAFOA
        ////*********************************************************************//
        public ActionResult SaveFromDatabase(cafao_dtl_tbl data)
        {
            db.Database.CommandTimeout = int.MaxValue;
            var message = "";
            var message_oth = "";
            try
            {
                var var_default_date = "1990-01-01";
                DateTime default_date = Convert.ToDateTime(var_default_date);
                
                data.payroll_year         = data.payroll_year        ;
                data.payroll_registry_nbr = data.payroll_registry_nbr;
                data.seq_nbr              = data.seq_nbr             ;
                data.function_code        = data.function_code       ;
                data.allotment_code       = data.allotment_code      ;
                data.account_code         = data.account_code        ;
                data.account_short_title  = data.account_short_title ;
                data.account_amt          = data.account_amt         ;
                data.created_by_user      = Session["user_id"].ToString();
                data.updated_by_user      = "";
                data.created_dttm         = DateTime.Now;
                data.updated_dttm         = default_date;

                message = "success";
                message_oth = Cmn.CONST_NEWREC;
                db.cafao_dtl_tbl.Add(data);
                db.SaveChanges();
                return Json(new { message, message_oth, data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                message_oth = e.InnerException.InnerException.Message;
                message = "Data Already Exist !";
                return Json(new { message, message_oth }, JsonRequestBehavior.AllowGet);
            }
        }
        //*********************************************************************//
        // Created By  : VJA - Created Date : 2020-04-08
        // Description :Save Edit Data to database
        //*********************************************************************//
        public ActionResult UpdateFromDatabase(cafao_dtl_tbl data)
        {
            db.Database.CommandTimeout = int.MaxValue;
            try
            {
                var var_default_date = "1990-01-01";
                DateTime default_date = Convert.ToDateTime(var_default_date);

                var message = "";
                var message_oth = "";
                var upd = db.cafao_dtl_tbl.Where(a => a.payroll_year == data.payroll_year && a.payroll_registry_nbr == data.payroll_registry_nbr && a.seq_nbr == data.seq_nbr).FirstOrDefault();
                
                upd.function_code        = data.function_code       ;
                upd.allotment_code       = data.allotment_code      ;
                upd.account_code         = data.account_code        ;
                upd.account_short_title  = data.account_short_title ;
                upd.account_amt          = data.account_amt         ;
                upd.updated_by_user      = Session["user_id"].ToString();
                upd.updated_dttm         = DateTime.Now;

                message = "success";
                message_oth = Cmn.CONST_EDITREC;
                db.SaveChanges();
                return Json(new { message, message_oth }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                string message_oth = "Data not Updated!";
                string message = e.InnerException.InnerException.Message;
                return Json(new { message, message_oth }, JsonRequestBehavior.AllowGet);
            }
        }
        //*********************************************************************//
        // Created By  : VJA - Created Date : 2020-04-08
        // Description : Delete From Database
        //*********************************************************************//
        public ActionResult DeleteFromDatabase(string par_payroll_year, string par_payroll_registry_nbr, int par_seq_nbr)
        {
            db.Database.CommandTimeout = int.MaxValue;
            var message = "";
            try
            {
                var dt = db.cafao_dtl_tbl.Where(a => a.payroll_year == par_payroll_year && a.payroll_registry_nbr == par_payroll_registry_nbr && a.seq_nbr == par_seq_nbr).FirstOrDefault();
                if (dt == null)
                {
                    message = "error";

                }
                else
                {
                    db.cafao_dtl_tbl.Remove(dt);
                    db.SaveChanges();
                    message = "success";
                }
                return Json(new { message }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                string messageflag = "";
                if (e is System.Data.Entity.Infrastructure.DbUpdateException)
                {
                    message = "Could not delete this record. The item was used as reference by other records.";
                }
                else if (e is DbEntityValidationException)
                {
                    message = e.Message;
                }
                else
                {
                    message = "Data already deleted by other user!";
                    messageflag = "0";
                }

                return Json(new { message = message, messageflag }, JsonRequestBehavior.AllowGet);
            }
        }
        //*********************************************************************//
        // Created By : VJA - Created Date : 2020-10-29
        // Description: Populate Detail Grid for - CAFOA
        ////*********************************************************************//
        public ActionResult RetrieveReports(string par_payroll_year, string par_payroll_registry_nbr, string par_payrolltemplate_code)
        {
            db.Database.CommandTimeout = int.MaxValue;
            var message = "";
            try
            {
                var data = db.sp_payrollregistry_cafao_rep(par_payroll_year, par_payroll_registry_nbr, par_payrolltemplate_code).ToList();
                message = "success";
                var icon = "success";
                Session["history_page"] = Request.UrlReferrer.ToString();
                return JSON(new { message, icon, data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Session["history_page"] = Request.UrlReferrer.ToString();
                return JSON(new { message = ex.Message, icon = "error" }, JsonRequestBehavior.AllowGet);
            }
        }
        //*********************************************************************//
        // Created By : VJA - Created Date : 2020-10-29
        // Description: Populate Detail Grid for - CAFOA
        ////*********************************************************************//
        public ActionResult UserProfile()
        {
            db.Database.CommandTimeout = int.MaxValue;
            var var_TEMP_user_id        =  Session["TEMP_user_id"]     ;       
               var var_role_id             =  Session["role_id"]          ;      
               var var_paytrk_authority    =  Session["paytrk_authority"] ;
               var var_empl_id             =  Session["empl_id"]          ;    
               var var_employee_name       =  Session["employee_name"]    ;     
               var var_owner_fullname      =  Session["owner_fullname"]   ;    
               var var_department_code     =  Session["department_code"]  ;
               var var_employment_type     =  Session["employment_type"]  ;
                var dept = db.vw_department_tbl_list_TRK.Where(a => a.department_code == var_department_code.ToString()).FirstOrDefault();
                return JSON(new {
                    var_TEMP_user_id
                    ,var_role_id
                    ,var_paytrk_authority
                    ,var_empl_id
                    ,var_employee_name
                    ,var_owner_fullname
                    ,var_department_code
                    ,var_employment_type
                    ,dept
                }, JsonRequestBehavior.AllowGet);
           
        }

    }
}