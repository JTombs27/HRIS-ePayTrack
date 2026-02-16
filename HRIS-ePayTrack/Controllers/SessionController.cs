using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRIS_ePayTrack.Controllers
{
    public class SessionController : Controller
    {
        [HttpPost]
        public ActionResult KeepAlive()

        {
            // Touch the session
            Session["LastActivity"] = DateTime.Now;
            return new HttpStatusCodeResult(200);
        }
    }
}