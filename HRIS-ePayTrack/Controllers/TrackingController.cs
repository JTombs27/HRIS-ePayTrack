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
    public class TrackingController : Controller
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
            var lv_user = db.leave_route_users.Where(a => a.route_user_id == user_id).FirstOrDefault();
            try
            {
                return JSON(new { message,paytrk_auth, department_code, dt_tm}, JsonRequestBehavior.AllowGet);
            }
            catch (DbEntityValidationException e)
            {
                message = DbEntityValidationExceptionError(e);

                return JSON(new { message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult RetrieveTobeReceived()
        {
            db.Database.CommandTimeout = int.MaxValue;
            role_id             = Session["role_id"].ToString();
            paytrk_auth         = Session["paytrk_authority"].ToString();
            string user_id      = Session["user_id"].ToString();
            var department_code = Session["department_code"].ToString();
            var message         = "";
            var tobeReceive     = db.sp_edocument_tobe_receive_list(department_code).ToList();
            try
            {
                return JSON(new { message, paytrk_auth, department_code, tobeReceive }, JsonRequestBehavior.AllowGet );
            }
            catch (DbEntityValidationException e)
            {
                message = DbEntityValidationExceptionError(e);

                return JSON(new { message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult ScanDocument(string par_doc_ctrl_nbr, string par_scan_action, string par_doc_type)
        {
            db.Database.CommandTimeout  = int.MaxValue;
            DateTime date_tm            = DateTime.Now;
            role_id                     = Session["role_id"].ToString();
            paytrk_auth                 = Session["paytrk_authority"].ToString();
            string user_id              = Session["user_id"].ToString();
            var department_code         = Session["department_code"].ToString();
            var message                 = "";
            try
            {
                var scan_details            = db.sp_edocument_trk_scan_tracking_V2026(par_doc_ctrl_nbr,department_code, par_scan_action,par_doc_type).FirstOrDefault();
                return JSON(new { message,paytrk_auth, department_code, scan_details}, JsonRequestBehavior.AllowGet);
            }
            catch (DbEntityValidationException e)
            {
                message = DbEntityValidationExceptionError(e);

                return JSON(new { message }, JsonRequestBehavior.AllowGet);
            }
        }


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
    }
}