using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using HRIS_Common;
//using HRIS_eHRD.App_Start;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing.Printing;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace HRIS_ePayTrack.Reports
{
    public partial class CrystalViewer : System.Web.UI.Page
    {

        ReportDocument cryRpt = new ReportDocument();
        CommonDB MyCmn = new CommonDB();
        static string printfile = "";
        //static string lastpage = "";
        //static bool firstload = true;
        string paramList = "";
        //report file(.rpt) name
        string reportName = "";
        //save as to excel,pdf or word's file name
        string saveName = "";
        //report type for pdf, excel, word or inline preview
        string reportType = "";
        //report file path, base on ~/Reports folder
        string reportPath = "";
       
        //set the report file path
        string reportFile = "";
        //for save report file name
        string saveFileName ="";
        protected void Page_Init(object sender, EventArgs e)
        {
            string ls_val;
            paramList   = Request["Params"].Trim();
            reportName  = Request["ReportName"].Trim();
            saveName    = Request["SaveName"].Trim();
            reportType  = Request["ReportType"].Trim();
            reportPath  = Request["ReportPath"].Trim().Replace('-', '/');


            reportFile = Server.MapPath(string.Format("~/Reports/{0}/{1}.rpt", reportPath, reportName));

            saveFileName = saveName + DateTime.Now.ToString("_yyyy-MM-dd");
            if (!IsPostBack)
            {

                hf_printers.Value = "";
                hf_nexpage.Value = "0";
                PrinterSettings settings = new PrinterSettings();
                //firstload = true;
            }
            else
            {
                //firstload = false;
            }
            string[] ls_splitvalue;
            ls_val = Request.QueryString["id"];
            ls_splitvalue = ls_val.Split(',');
            loadreport(ls_splitvalue, reportPath);
           
            

            
        }


        protected void Page_Unload(object sender, EventArgs e)
        {
            cryRpt.Close();
            cryRpt.Dispose();
        }
        private void loadreport(string[] ls_splitvalue, string printfile)
        {

            DataTable dt = null;
            DataTable dtSub = null;
            DataTable dtTemp = null;
            string locationpath = printfile;
            cryRpt.Load(Server.MapPath(locationpath));
            if (ls_splitvalue.Length == 1)
            {

                dt = MyCmn.RetrieveData(ls_splitvalue[0]);
                //dt = customerdb.get_data(ls_splitvalue[1], Session["cust_account_no"].ToString(), Convert.ToInt32(Session["countryid"].ToString()), Session["comp_code"].ToString(), Session["branch_code"].ToString(), Convert.ToInt32(Session["franchise"].ToString()));
            }
            if (ls_splitvalue.Length ==3)
            {
                dt = MyCmn.RetrieveData(ls_splitvalue[0], ls_splitvalue[1], ls_splitvalue[2]);
                //dt = customerdb.get_data(ls_splitvalue[1], Session["cust_account_no"].ToString(), Convert.ToInt32(Session["countryid"].ToString()), Session["comp_code"].ToString(), Session["branch_code"].ToString(), Convert.ToInt32(Session["franchise"].ToString()), );
            }
            if (ls_splitvalue.Length == 5)
            {
                dt = MyCmn.RetrieveData(ls_splitvalue[0], ls_splitvalue[1], ls_splitvalue[2], ls_splitvalue[3], ls_splitvalue[4]);



                // dt = customerdb.get_data(ls_splitvalue[1], Session["cust_account_no"].ToString(), Convert.ToInt32(Session["countryid"].ToString()), Session["comp_code"].ToString(), Session["branch_code"].ToString(), Convert.ToInt32(Session["franchise"].ToString()), ls_splitvalue[2], ls_splitvalue[3], ls_splitvalue[4], ls_splitvalue[5]);
            }
            if (ls_splitvalue.Length == 7)
            {
                dt = MyCmn.RetrieveData(ls_splitvalue[0], ls_splitvalue[1], ls_splitvalue[2], ls_splitvalue[3], ls_splitvalue[4], ls_splitvalue[5], ls_splitvalue[6]);
                //if (ls_splitvalue[5] == "N")
                //{
                //dt = MyCmn.RetrieveData(ls_splitvalue[1], Session["cust_account_no"].ToString(), Convert.ToInt32(Session["countryid"].ToString()), Session["comp_code"].ToString(), Session["branch_code"].ToString(), Convert.ToInt32(Session["franchise"].ToString()), ls_splitvalue[2], ls_splitvalue[3], ls_splitvalue[4], Convert.ToInt32(ls_splitvalue[6]));
                //}
                //else
                //{
                //    dt = customerdb.get_data(ls_splitvalue[1], Session["cust_account_no"].ToString(), Convert.ToInt32(Session["countryid"].ToString()), Session["comp_code"].ToString(), Session["branch_code"].ToString(), Convert.ToInt32(Session["franchise"].ToString()), ls_splitvalue[2], ls_splitvalue[3], ls_splitvalue[4], ls_splitvalue[6]);
                //}
            }
            if (ls_splitvalue.Length == 9)
            {

                dt = MyCmn.RetrieveData(ls_splitvalue[0], ls_splitvalue[1], ls_splitvalue[2], ls_splitvalue[3], ls_splitvalue[4], ls_splitvalue[5], ls_splitvalue[6], ls_splitvalue[7], ls_splitvalue[8]);

                if (ls_splitvalue[0].ToString().Trim() == "sp_employeecard_re_ce_rep")
                {
                    dtSub = MyCmn.GetDatatable("SELECT * FROM vw_payrollemployeemaster_info_HRIS_ACT WHERE empl_id = '" + ls_splitvalue[4].ToString().Trim() + "' ORDER BY effective_date DESC");
                }

            }
            //FOR SUBREPORT ON CARDING 
            //ADDED BY JORGE: 11/16/2019
            
                
            if (ls_splitvalue.Length == 10)
            {
                //dt = customerdb.get_data(ls_splitvalue[1], Session["cust_account_no"].ToString(), Convert.ToInt32(Session["countryid"].ToString()), Session["comp_code"].ToString(), Session["branch_code"].ToString(), Convert.ToInt32(Session["franchise"].ToString()), ls_splitvalue[2], ls_splitvalue[3], ls_splitvalue[4], ls_splitvalue[5], ls_splitvalue[6], ls_splitvalue[7], ls_splitvalue[8], ls_splitvalue[9]);

            }
            if (ls_splitvalue.Length == 11)
            {
                dt = MyCmn.RetrieveData(ls_splitvalue[0], ls_splitvalue[1], ls_splitvalue[2], ls_splitvalue[3], ls_splitvalue[4], ls_splitvalue[5], ls_splitvalue[6], ls_splitvalue[7], ls_splitvalue[8], ls_splitvalue[9], ls_splitvalue[10]);
            }
            //NOSA : 12 PARAMS
            if (ls_splitvalue.Length == 12)
            {
                dt = MyCmn.RetrieveData(ls_splitvalue[0], ls_splitvalue[1], ls_splitvalue[2], ls_splitvalue[3], ls_splitvalue[4], ls_splitvalue[5], ls_splitvalue[6], ls_splitvalue[7], ls_splitvalue[8], ls_splitvalue[9], ls_splitvalue[10], "par_letter_body_line1", Session["BODY_LINE"].ToString().Trim());
            }
            //OATH : 13 PARAMS
            if (ls_splitvalue.Length == 13)
            {
                if (ls_splitvalue[12].ToString() == "O")
                {
                    dt = MyCmn.RetrieveData(ls_splitvalue[1], ls_splitvalue[2], ls_splitvalue[3], ls_splitvalue[4], ls_splitvalue[5], ls_splitvalue[6], ls_splitvalue[7], ls_splitvalue[8], ls_splitvalue[9], ls_splitvalue[10], ls_splitvalue[11]);
                }
            }

            else
            {
                //Label1.Text = ls_splitvalue.Length.ToString();
            }
            

            if (dt == null)
            {
                return;
            }

            if (dt.Rows.Count <= 0)
            {
                ScriptManager.RegisterStartupScript(this, this.GetType(), "MyFun1", "swal({title:'NO DATA FOUND!',text:'Data not found for Printing',icon:'warning',showCancelButton:false, dangerMode: true });", true);

                cryRpt.SetDataSource(dtTemp);
                //Response.Redirect("~/Views/cEmployeeCardRep/");
                return;

            }

            try
            {
                cryRpt.SetDataSource(dt);

                //FOR SUBREPORT ON CARDING 
                //ADDED BY JORGE: 11/16/2019
                if (ls_splitvalue[0].ToString().Trim() == "sp_employeecard_re_ce_rep")
                {
                    cryRpt.Subreports[0].SetDataSource(dtSub);
                }
                else if (ls_splitvalue[0].ToString().Trim() == "sp_payrollregistry_cafao_rep" ||
                         ls_splitvalue[0].ToString().Trim() == "sp_payrollregistry_cafao_rep_new")
                {
                    dtSub = new DataTable();
                    dtSub = MyCmn.RetrieveData("sp_payrollregistry_cafao_sub_rep", ls_splitvalue[1], ls_splitvalue[2], ls_splitvalue[3], ls_splitvalue[4]);
                    cryRpt.Subreports["cryCAFAO_SubRep.rpt"].SetDataSource(dtSub);
                }
                //END
                crvPrint.ReportSource = cryRpt;
                crvPrint.DataBind();
                PrinterSettings settings = new PrinterSettings();
            }
            catch (Exception)
            {
            }
        }
        private void BindReport(ReportDocument ReportPath)
        {
            crvPrint.ReportSource = ReportPath;
            crvPrint.DataBind();

        }
        private void shownextpage(int pageno)
        {
            crvPrint.ShowNthPage(pageno);
            hf_nexpage.Value = "0";

        }
        private void shoprevpage()
        {
            crvPrint.ShowPreviousPage();

        }
        protected void btn_print_Click(object sender, EventArgs e)
        {
            LinkButton btn = (LinkButton)sender;

            try
            {
                cryRpt.Refresh();

                switch (printfile)
                {
                    case "~/Reports/cryPlantilla/cryPlantilla.rpt":
                        cryRpt.PrintOptions.PaperOrientation = PaperOrientation.Landscape;
                        cryRpt.PrintOptions.PaperSize = CrystalDecisions.Shared.PaperSize.PaperLegal;
                        break;
                    case "~/Reports/cryPlantillaCSC/cryPlantillaCSC.rpt":
                        cryRpt.PrintOptions.PaperOrientation = PaperOrientation.Landscape;
                        cryRpt.PrintOptions.PaperSize = CrystalDecisions.Shared.PaperSize.PaperLegal;
                        break;
                    case "~/Reports/cryPlantillaHR/cryPlantillaHR.rpt":
                        cryRpt.PrintOptions.PaperOrientation = PaperOrientation.Landscape;
                        cryRpt.PrintOptions.PaperSize = CrystalDecisions.Shared.PaperSize.PaperLegal;
                        break;
                    case "~/Reports/cryPSSalariesWages/cryPSSalariesWages.rpt":
                        cryRpt.PrintOptions.PaperOrientation = PaperOrientation.Landscape;
                        cryRpt.PrintOptions.PaperSize = CrystalDecisions.Shared.PaperSize.PaperLetter;
                        break;
                    case "~/Reports/cryVacantItems/cryVacantItems.rpt":
                        cryRpt.PrintOptions.PaperOrientation = PaperOrientation.Portrait;
                        cryRpt.PrintOptions.PaperSize = CrystalDecisions.Shared.PaperSize.PaperLetter;
                        break;
                    case "~/Reports/cryListOfEmployees/cryListOfEmployees.rpt":
                        cryRpt.PrintOptions.PaperOrientation = PaperOrientation.Portrait;
                        cryRpt.PrintOptions.PaperSize = CrystalDecisions.Shared.PaperSize.PaperLetter;
                        break;
                    default:

                        break;
                }
            }
            catch (Exception)
            {
            }

        }

        private string GetDefaultPrinter()
        {
            PrinterSettings settings = new PrinterSettings();
            foreach (string printer in PrinterSettings.InstalledPrinters)
            {
                settings.PrinterName = printer;
                if (settings.IsDefaultPrinter)
                {
                    return printer;
                }
            }
            return string.Empty;
        }

        protected void btn_close_Click(object sender, EventArgs e)
        {
            closepage();
        }
        private void closepage()
        {
            ClientScript.RegisterClientScriptBlock(Page.GetType(), "script", "window.close();", true);
        }

        protected void img_nextpage_Click(object sender, ImageClickEventArgs e)
        {
            crvPrint.ShowNextPage();

        }
        protected void lbtn_pdf_Click(object sender, ImageClickEventArgs e)
        {
            converttopdf();

        }
        private void converttopdf()
        {
            try
            {
                ExportOptions CrExportOptions;
                DiskFileDestinationOptions CrDiskFileDestinationOptions = new DiskFileDestinationOptions();
                PdfRtfWordFormatOptions CrFormatTypeOptions = new PdfRtfWordFormatOptions();
                CrDiskFileDestinationOptions.DiskFileName = @"c:\\pdf\Plantilla.pdf";
                CrExportOptions = cryRpt.ExportOptions;
                {
                    CrExportOptions.ExportDestinationType = ExportDestinationType.DiskFile;
                    CrExportOptions.ExportFormatType = ExportFormatType.PortableDocFormat;
                    CrExportOptions.DestinationOptions = CrDiskFileDestinationOptions;
                    CrExportOptions.FormatOptions = CrFormatTypeOptions;
                }
                cryRpt.Export();

            }
            catch (Exception ex)
            {
                ex.ToString();
            }
        }

        protected void lbtn_pdf_Click(object sender, EventArgs e)
        {
            converttopdf();
        }

        protected void btn_save_Click(object sender, EventArgs e)
        {
            ScriptManager.RegisterStartupScript(this, this.GetType(), "Pop", "Clickprint();", true);
        }
        protected void crvPrint_Load(object sender, EventArgs e)
        {
            //    if (Session["first_load"].ToString() == "true")
            //     {
            //        ScriptManager.RegisterStartupScript(this, this.GetType(), "Pop", "setPageDisplay();", true);
            //     }
        }
       
    }
}