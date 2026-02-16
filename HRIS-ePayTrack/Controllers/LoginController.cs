using HRIS_Common;
using HRIS_ePayTrack.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRIS_ePayTrack.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        HRIS_TRKEntities db = new HRIS_TRKEntities();
        CommonDB Cmn = new CommonDB();
        Dev_Version_Name dvn = new Dev_Version_Name();
        // GET: Login
        public ActionResult Index()
        {
            dvn.DVName = "(" + db.Database.Connection.DataSource.ToString().Split('\\')[db.Database.Connection.DataSource.ToString().Split('\\').Length - 1] + ")";
            if (Session["user_id"] != null)
            {
                return RedirectToAction("Index", "Tracking");
            }
            else
            {

                return View(dvn);
            }
        }
        public ActionResult GetUserIsLogin()
        {

            if (Session["user_id"] != null)
            {
                return Json(new { data = Session["user_id"], success = 1 }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { data = 0, success = 0 }, JsonRequestBehavior.AllowGet);
            }


        }
        public ActionResult isUserLogin()
        {
            if (Session["user_id"] != null)
            {
                var user = Session["user_id"];
                return Json(new { user = user, isLogin = 1 }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { user = "", isLogin = 0 }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Login_Validation(string username, string password)
        {
            var message = "";
            var success = 0;
            object cred = new object();
            try
            {
                var data = db.sp_user_login_TRK(username.Trim(), Cmn.EncryptString(password.Trim(), Cmn.CONST_WORDENCRYPTOR)).FirstOrDefault();
                if(data == null)
                {
                    success = 2;
                }
                else
                {
                       
                        Session["TEMP_user_id"] = data.user_id;
                        Session["role_id"] = data.role_id;
                        Session["paytrk_authority"] = data.paytrk_authority;
                        Session["empl_id"] = data.empl_id;
                        Session["employee_name"] = data.employee_name;
                        Session["owner_fullname"] = data.employee_name;
                        Session["department_code"] = data.department_code;
                        Session["employment_type"] = data.employment_type;
                        
                        cred = data;
                        success = 1;
                    
                }
                


                return Json(new { data = data, success , message,cred}, JsonRequestBehavior.AllowGet);



            }
            catch (Exception ex)
            {
                return Json(new { message = ex.Message, success = 0 }, JsonRequestBehavior.AllowGet);

            }

        }
        public ActionResult logout()
        {
            Session.Clear();
            if (Session["user_id"] == null)
            {
                return Json(new { session = 0, success = 1 }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { session = 1, success = 0 }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult CheckSessionLogin()
        {
            if (Session["user_id"] == null)
            {
                return Json("expire", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("active", JsonRequestBehavior.AllowGet);
            }
        }
    }
}