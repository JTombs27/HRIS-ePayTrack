



ng_ePayTrack_App.controller("cMainpageCtrlr", function (commonScript, $scope, $http, $filter, $compile) {
    //alert("gasd")
    var s                       = $scope
    var h                       = $http
    var cs = commonScript

    s.department_cafoa = "";
    s.LV = ""
    s.rel_rec_ret = ""
    s.rel_rec_ret_hist = ""
    s.docs_type = ""
    s.list_type = "V"
    s.doc_ctrl_nbr = ""
    s.D = {}
    s.exec_block = false
    s.doc_nbr_lbl = "Document Number"
    s.department                = true;
    s.data_vl                   = []
    s.actionfield               = "";
    s.detail                    = false
    s.collapseIn1 = ""
    s.a_flag = ""
    s.sys_date = ""
    s.innertext1 = ""
    s.innertext2 = ""
    s.warningInfoText = ""
    s.doc_nbr_list = []
    s.year = []
    s.document_tracking_link_tbl = []
    s.document_transmittal_tbl = []
    s.document_transmittal_dtl_tbl = []
    s.to_return_route =  []
    s.to_release_route = []
    s.data_correct = {}
    s.ddl_reports = ""
    s.hs = {}
    s.itd = {
        it_doc_date: "",
        it_from_name: "",
        it_from_off_pos:""
    }
    //added By Joseph
    s.lv_detail = [];

    s.transmittal_tbl = null
    s.di = {}
    s.ds = {}
    s.required_doc_type = ""
    s.change_date = false;
    s.save_itcd_doc = false
    s.it_ctrl_nbr_found = false
    s.temp_date_serv = ""
    s.temp_date_front = ""
    s.departmentname = ""
    s.route_control_nbr = 0
    s.var_data_mode = ""
    //s.allow_release = false;
    //s.allow_return = false;
    //hide show elements
   
    //s.show_receive_btn          = false     // this variable value will 
    //s.show_release_btn          = false     // change depending 
    //s.show_return_btn           = false     // on paytrk_authority
    //s.allow_edit_date           = false     // value
    //s.show_receive_grid         = false     //
    //s.show_release_grid         = false     //
    //s.action_btn_receive_disb   = false     //
    //s.action_btn_receive_disb   = false     //

    var month = [
         { id:  '01',   text:   'January'   }
        ,{ id:  '02',   text:   'February'   }
        ,{ id:  '03',   text:   'March'   }
        ,{ id:  '04',   text:   'April'   }
        ,{ id:  '05',   text:   'May'   }
        ,{ id:  '06',   text:   'June'   }
        ,{ id:  '07',   text:   'July'   }
        ,{ id:  '08',   text:   'August'   }
        ,{ id:  '09',   text:   'September' }
        ,{ id:  '10',   text:   'October' }
        , { id: '11',   text:   'November' }
        , { id: '12',   text:   'December' }
    ]

    function GETMONTH(val)
    {
        var retval = "";
        for(var x = 0; x < 12; x++)
        {
            if(month[x].id == val)
            {
                retval = month[x].text;
                break;
            }
        }
        return retval;
    }
    

    function paytrk_authority(data)
    {
        if (data == "ADMIN"){
            $("#dttm").prop('disabled',false)
         
            s.allow_edit_date           = true
            s.show_receive_grid         = true
            s.show_release_grid         = true
            s.action_btn_receive_disb   = false
            s.action_btn_release_disb   = false
           
        }
        else if (data == "ADM-RC") {
            $("#dttm").prop('disabled', false)
            //s.show_receive_btn          = true
            //s.show_release_btn          = false
            //s.show_return_btn           = true
            s.allow_edit_date           = true
            s.show_receive_grid         = true
            s.show_release_grid         = false
            s.action_btn_receive_disb   = false
            s.action_btn_release_disb   = false
            change_grid_class("div_received", "col-lg-12", "col-lg-6")

        }
        else if (data == "ADM-RL") {
            $("#dttm").prop('disabled', false)
           
            s.allow_edit_date           = true
            s.show_receive_grid         = false
            s.show_release_grid         = true
            s.action_btn_receive_disb   = true
            s.action_btn_release_disb = true
            change_grid_class("div_released", "col-lg-12", "col-lg-6")
        }
        else if (data == "RC-RL") {
            $("#dttm").prop('disabled', true)
            s.allow_edit_date           = false
            s.show_receive_grid         = true
            s.show_release_grid         = true
            s.action_btn_receive_disb   = false
            s.action_btn_release_disb = false
            change_grid_class("div_received", "col-lg-6", "col-lg-12")
            change_grid_class("div_released", "col-lg-6", "col-lg-12")
        }
        else if (data == "RC-ONL") {
            $("#dttm").prop('disabled', true)
            //s.show_receive_btn          = true
            //s.show_release_btn          = false
            //s.show_return_btn           = true
            s.allow_edit_date           = false
            s.show_receive_grid         = true
            s.show_release_grid         = false
            s.action_btn_receive_disb   = false
            s.action_btn_release_disb = false
            change_grid_class("div_received", "col-lg-12", "col-lg-6")
        }
        else if (data == "RL-ONL") {
            $("#dttm").prop('disabled', true)
            //s.show_receive_btn            = false
            //s.show_release_btn            = true
            //s.show_return_btn             = true
            s.allow_edit_date               = false
            s.show_receive_grid             = false
            s.show_release_grid             = true
            s.action_btn_receive_disb       = false
            s.action_btn_release_disb       = false
            change_grid_class("div_released", "col-lg-12", "col-lg-6")
        }
        else if (data == "VW - ONL") {
            $("#dttm").prop('disabled', true)
            //s.show_receive_btn            = false
            //s.show_release_btn            = false
            //s.show_return_btn             = false
            s.allow_edit_date               = false
            s.show_receive_grid             = true
            s.show_release_grid             = true
            s.action_btn_receive_disb       = true
            s.action_btn_release_disb       = true
            change_grid_class("div_received", "col-lg-6", "col-lg-12")
            change_grid_class("div_released", "col-lg-6", "col-lg-12")
        }
       
    }

    function change_grid_class(el,cls1,cls2)
    {
        $("#" + el).removeClass(cls2);
        $("#" + el).addClass(cls1);

    }
    s.doc_voucher_nbr_show      = false     // this variable value depending on require_doc_voucher_nbr value 
    s.doc_obr_nbr_show          = false     // this variable value depending on require_doc_obr_nbr value 
    s.doc_other_info_show       = false     //  this variable value depending on require_doc_addnl_info value
 


    s.action_status = ""
    s.dd_ToRelease_route        = ""
    s.dd_ToReturn_route         = ""
    s.doc_voucher_nbr           = ""
    s.doc_pbo_nbr               = ""

    s.saveMode = "ADD";
    s.rowLen = "10";
    s.newRow = 0;
    s.editRow = 0;
    s.SaveOpen = false;

    
    s.di.doc_nbr = ""
    s.di.doc_fund_subcode = ""




    function CheckedRequiredFields()
    {
        var flag = 0;
        if (s.elEmpty(s.doc_ctrl_nbr))
        {
            s.required("doc_ctrl_nbr");
            s.notrequired("remarks");
            s.notrequired("doc_nbr");
            s.notrequired("doc_fund_subcode");
            s.notrequired("dd_ToRelease_route");
            s.notrequired("dd_ToReturn_route");
            s.doc_nbr_show     = false;
            s.doc_funcode_show = false;
            s.show_release_btn = false;
            s.show_return_btn  = false;
            s.allow_release    = false;
            s.allow_receive    = false;
            s.allow_return      = false;
            return flag = 1;
        }
        if(s.elEmpty(s.di.remarks))
        {
            s.required("remarks");
            flag = 1
        }
        else {
            s.notrequired("remarks");
        }

        if (s.doc_nbr_show == true)
        {
         
            if (s.elEmpty(s.di.doc_nbr))
            {
                s.notrequired("doc_nbr");
            }
            else {
                s.notrequired("doc_nbr");
            }
        }
       
        if (s.doc_funcode_show == true) {
          
            if (s.elEmpty(s.di.doc_fund_subcode)) {
                s.notrequired("doc_fund_subcode");
            }
            else
            {
                s.notrequired("doc_fund_subcode");
            }
        }
        if (s.show_release_btn == true && s.show_return_btn == false) {
            if (s.elEmpty(s.di.dd_ToRelease_route)) {
                s.required("dd_ToRelease_route");
                flag = 1;
            }
            else {
                s.notrequired("dd_ToRelease_route");
            }
        }
        if (s.show_return_btn == true && s.show_release_btn == false) {
            if (s.elEmpty(s.di.dd_ToReturn_route)) {
                s.required("dd_ToReturn_route");
                flag = 1
            }
            else {
                s.notrequired("dd_ToReturn_route");
            }
        }
        return flag
    }

    var Init_ToRecieve = function (par_data) {

        s.ToRecieve_Data = par_data;
       
        s.ToRecieve_Table = $('#torecieve').dataTable(
            {
                //scrollY: "50vh",
                //scrollCollapse: true,
                data: s.ToRecieve_Data,
                sDom: 'rt<"bottom"p>',
                pageLength: 10,
                //bAutoWidth: false,
                //"columnDefs": [
                //   { "width": "5%", "targets": 0 },
                //   { "width": "20%", "targets": 1 },
                //   { "width": "55%", "targets": 2 },
                //   { "width": "20%", "targets": 3 },
                //],
                columns:[
                    {
                        "title": "",
                        //"sWidth": "5%",
                        "mData": null,
                        "mRender": function (data, type, full, row) {
                            return "<span class='details-control' style='float:left;' ng-click='btn_show_details(" + '"torecieve"' + ")' >"
                        }
                    },
                    {
                        "title": "DOC. CTRL. NBR",
                        //"sWidth": "20%",
                        "mData": "doc_ctrl_nbr",
                        "mRender": function (data, type, full, row) {
                            return " <span class='text-center' style='padding-right:20%;padding-left:15%'>" + data + " </span>"
                        }
                    },

                    {
                        "title": "DESCRIPTION",
                        //"sWidth": "55%",
                        "mData": "payroll_registry_descr",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-left btn-block'>" + data + "</span>"
                        }
                    },

                    {
                        "title": "ACTIONS",
                        "mData": null,
                        //"sWidth": "20%",
                        "bSortable": false,
                        "mRender": function (data, type, full, row) {

                            return '<center><div class="btn-group">' +
                                //'<button type="button" class="btn btn-success btn-sm action" ng-click="btn_receive(' + row["row"] + ',1)" ng-disabled="action_btn_receive_disb"  data-toggle="tooltip" data-placement="top" title="Receive Document">   <i id="del_row' + row["row"] + '" class="fa fa-mail-reply"></i></button>' +
                                '<button type="button" class="btn btn-danger btn-sm action" ng-click="btn_ca_link_action(' + row["row"] + ',' + '\'ToRecieve_Data\'' + ')"   data-toggle="tooltip" data-placement="top" title="With CA Document"> <i class="fa fa-link"></i> </button>' +
                                '<button type="button" class="btn btn-warning btn-sm action" ng-click="btn_print_history_grid(' + row["row"] + ',' + '\'ToRecieve_Data\'' + ')"  data-toggle="tooltip" data-placement="top" title="Document History"> <i class="fa fa-history"></i> </button>' +
                                '</div></center>';
                        }
                    }

                ],
                "createdRow": function (row, data, index) {
                    $(row).addClass("dt-row");
                    $compile(row)($scope);  //add this to compile the DOM
                },

            });

        $("div.toolbar").html('<b>Custom tool bar! Text/images etc.</b>');
    }


    var Init_ToRelease = function (par_data) {
        s.ToRelease_Data = par_data;
        s.ToRelease_Table = $('#torelease').dataTable(
            {
                //scrollY: "50vh",
                //scrollCollapse: true,
                data: s.ToRelease_Data,
                sDom: 'rt<"bottom"p>',
                pageLength: 10,
                columns: [
                    {
                        "title": "",
                        "mData": null,
                        //"sWidth": "5%",
                        "mRender": function (data, type, full, row) {
                            return "<span class='details-control' style='float:left;' ng-click='btn_show_details(" + '"torelease"' + ")' >"
                        }
                    },
                    {
                        "title": "DOC. CTRL. NBR",
                        //"sWidth": "20%",
                        "mData": "doc_ctrl_nbr",
                        "mRender": function (data, type, full, row) {
                            return " <span class='text-center btn-block' >" + data + " </span>"
                        }
                    },

                    {
                        "title": "DESCRIPTION",
                        //"sWidth": "55%",
                        "mData": "payroll_registry_descr",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-left' >" + data + "</span>"
                        }
                    },

                    {
                        "title": "ACTIONS",
                        "mData": null,
                        //"sWidth": "20%",
                        "bSortable": false,
                        "mRender": function (data, type, full, row) {

                            return '<center ><div class="btn-group">' +
                                //'<button type="button" class="btn btn-primary btn-sm action" ng-click="btn_release(' + row["row"] + ',1)" ng-disabled="action_btn_release_disb" data-toggle="tooltip" data-placement="top" title="Receive Document">   <i id="del_row' + row["row"] + '" class="fa fa-mail-forward"></i></button>' +
                                '<button type="button" class="btn btn-danger btn-sm action" ng-click="btn_ca_link_action(' + row["row"] + ',' + '\'ToRelease_Data\'' + ')"  data-toggle="tooltip" data-placement="top" title="With CA Document"> <i class="fa fa-link"></i> </button>' +
                                '<button type="button" class="btn btn-warning btn-sm action" ng-click="btn_print_history_grid(' + row["row"] + ',' + '\'ToRelease_Data\'' + ')"  data-toggle="tooltip" data-placement="top" title="Document History"> <i class="fa fa-history"></i> </button>' +
                                '</div></center>';

                        }
                    }

                ],
                "createdRow": function (row, data, index) {
                    $(row).addClass("dt-row");
                    $compile(row)($scope);  //add this to compile the DOM
                },

            });

        $("div.toolbar").html('<b>Custom tool bar! Text/images etc.</b>');
    }

    var Init_ToCorrect = function (par_data) {
        s.ToCorrect_Data = par_data;
        s.ToCorrect_Table = $('#tocorrect').dataTable(
            {
                //scrollY: "50vh",
                //scrollCollapse: true,
                data: s.ToRelease_Data,
                sDom: 'rt<"bottom"p>',
                pageLength: 10,
                columns: [
                    {
                        "title": "",
                        "mData": null,
                        //"sWidth": "5%",
                        "mRender": function (data, type, full, row) {
                            return "<span class='details-control' style='float:left;' ng-click='btn_show_details(" + '"torelease"' + ")' >"
                        }
                    },
                    {
                        "title": "DOC. CTRL. NBR",
                        //"sWidth": "20%",
                        "mData": "doc_ctrl_nbr",
                        "mRender": function (data, type, full, row) {
                            return " <span class='text-center btn-block' >" + data + " </span>"
                        }
                    },

                    {
                        "title": "DESCRIPTION",
                        //"sWidth": "55%",
                        "mData": "payroll_registry_descr",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-left' >" + data + "</span>"
                        }
                    },

                    {
                        "title": "ACTIONS",
                        "mData": null,
                        //"sWidth": "20%",
                        "bSortable": false,
                        "mRender": function (data, type, full, row) {

                            return '<center ><div class="btn-group">' +

                                '<button type="button" class="btn btn-danger btn-sm action" ng-click="btn_correct_released(' + row["row"] + ')"  data-toggle="tooltip" data-placement="top" title="Correct Route"> <i class="correct' + row["row"] + ' fa fa-check"></i> </button>' +
                                //'<button type="button" class="btn btn-warning btn-sm action" ng-click="btn_print_history_grid(' + row["row"] + ',' + '\'ToRelease_Data\'' + ')"  data-toggle="tooltip" data-placement="top" title="Document History"> <i class="fa fa-history"></i> </button>' +
                                '</div></center>';

                        }
                    }

                ],
                "createdRow": function (row, data, index) {
                    $(row).addClass("dt-row");
                    $compile(row)($scope);  //add this to compile the DOM
                },

            });

        $("div.toolbar").html('<b>Custom tool bar! Text/images etc.</b>');
    }

    var Init_CaLink = function (par_data) {
        s.CA_Link_Data = par_data;
        s.CA_Link_Table = $('#ca_link_table').dataTable(
            {

               
                data: s.CA_Link_Data,
                sDom: 'rt<"bottom"p>',
                bAutoWidth: false,
                pageLength: 10,
                columns: [
                    //{
                    //    "mData": null,
                    //    "mRender": function (data, type, full, row) {
                    //        return "<span class='details-control' style='float:left;' ng-click='btn_show_details(" + '"ca_link_table"' + ")' >"
                    //    }
                    //},
                    {
                        "mData": "payroll_registry_nbr",
                        "mRender": function (data, type, full, row) {
                            return " <span class='text-center' style='padding-right:20%;padding-left:20%'>" + data + " </span>"
                        }
                    },

                    {
                        "mData": "payroll_registry_descr",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-left' >" + data + "</span>"
                        }
                    },
                    {
                        "mData": "gross_pay",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-right btn-block' >" + currency(data) + "</span>"
                        }
                    },
                    {
                        "mData": "net_pay",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-right btn-block' >" + currency(data) + "</span>"
                        }
                    },
                    {
                        "mData": null,
                        "bSortable": false,
                        "mRender": function (data, type, full, row) {

                            return '<center ><div class="btn-group">' +
                                '<button type="button" class="btn btn-primary btn-sm action" ng-click="btn_print_action2(' + row["row"] + ',' + '\'CA_Link_Data\'' + ')"> <i class="fa fa-print"></i> </button>' +
                                '</div></center>';

                        }
                    }

                ],
                "createdRow": function (row, data, index) {
                    $(row).addClass("dt-row");
                    $compile(row)($scope);  //add this to compile the DOM
                },

            });

        $("div.toolbar").html('<b>Custom tool bar! Text/images etc.</b>');
    }

    var Init_DocTracks = function (par_data) {
        s.DocTracks_Data  = par_data;
        s.DocTracks_Table = $('#doctracking').dataTable(
            {
                
                data: s.DocTracks_Data,
                sDom: 'rt<"bottom"p>',
                bAutoWidth: false,
                pageLength: 10,
                
                columns: [
                   {
                       "mData": "doc_ctrl_nbr",
                       "mRender": function (data, type, full, row) {
                           return "<span class='text-center btn-block'>" + data + "</span>"
                       }
                   },

                    {
                        "mData": "doc_pbo_nbr",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-left btn-block'>" + isnull(data) + "</span>"
                        }
                    },
                    {
                        "mData": "doc_voucher_nbr",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-center btn-block'>" +isnull(data) + "</span>"
                        }
                    },
                    {
                        "mData": "docmnt_type_descr",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-center btn-block'>" + data + "</span>"
                        }
                    },
                    {
                        "mData": "rcvd_dttm",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-center btn-block'>" + data + "</span>"
                        }
                    },
                    {
                        "mData": "rlsd_dttm",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-center btn-block'>" + data + "</span>"
                        }
                    },
                    {
                        "mData": "retd_dttm",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-center btn-block'>" + data + "</span>"
                        }
                    },
                    {
                        "mData": "spent_time",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-center btn-block'>" + data + "</span>"
                        }
                    },
                    {
                        "mData": "doc_remarks",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-center btn-block'>" + data + "</span>"
                        }
                    },
                    {
                        "mData": "routed_2_descr",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-center btn-block'>" + data + "</span>"
                        }
                    },
                    

                ],
                "createdRow": function (row, data, index) {
                    $(row).addClass("dt-row");
                    $compile(row)($scope);  //add this to compile the DOM
                },
               
            });

        $("div.toolbar").html('<b>Custom tool bar! Text/images etc.</b>');
    }
    var Init_DocType = function (par_data) {
        s.DocType_Data = par_data; //s.datalistgrid
        s.DocType_Table = $('#docType_datalist_grid').dataTable( //s.oTable
            {
                data: s.datalistgrid,
                sDom: 'rt<"bottom"ip>',
                bAutoWidth: false,
                pageLength: 10,
                columns: [
                    { "mData": "docmnt_type", "mRender": function (data, type, full, row) { return "<span class='text-center btn-block'>" + data + "</span>" } },
                    {
                        "mData": "docmnt_type_descr",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-left btn-block' ng-click='edit_cell(" + row["row"] + ")'>" + data + "</span>"
                        }
                    },
                    {
                        "mData": null,
                        "bSortable": false,
                        "mRender": function (data, type, full, row) {
                            if (s.newRow == 0) {
                                return '<center><div class="btn-group">' +
                                    '<button type="button"  class="btn btn-info btn-sm" ng-click="btn_edit_action(' + row["row"] + ')" data-toggle="tooltip" data-placement="top" title="Edit">  <i class="fa fa-edit"></i></button >' +
                                    '<button type="button" /*ng-show="ShowDelete"*/ class="btn btn-danger btn-sm" ng-click="btn_del_row(' + row["row"] + ')" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>' +
                                    '</div></center>';
                            }
                            else {
                                return '<center><div class="btn-group">' +
                                    '<button type="button"  class="btn btn-success btn-sm" ng-click="btn_save_click(' + row["row"] + ')" data-toggle="tooltip" data-placement="top" title="Save" id="addFinal">  <i class="fa fa-save"></i></button >' +
                                    '<button type="button" /*ng-show="ShowDelete"*/ class="btn btn-danger btn-sm" ng-click="btn_cancel_row(' + row["row"] + ')" data-toggle="tooltip" data-placement="top" title="Cancel"><i class="fa fa-times"></i></button>' +
                                    '</div></center>';
                            }

                        }
                    }
                ],
                "createdRow": function (row, data, index) {
                    $compile(row)($scope);  //add this to compile the DOM
                },
            });
    }
    var Init_search_docs = function (par_data) {
        s.search_docs_Data = par_data;
        s.search_docs_Table = $('#search_docs_table').dataTable(
            {
                //scrollY: "50vh",
                //scrollCollapse: true,
                data: s.search_docs_Data,
                sDom: 'rt<"bottom"p>',
                pageLength: 20,
                columns: [
                
                    {
                        "mData": null,
                        "mRender": function (data, type, full, row) {
                            return "<span class='details-control' style='float:left;' ng-click='btn_show_details_search(" + '"search_docs_table"' + ")' >"
                        }
                    },
                    {
                        "mData": "doc_ctrl_nbr",
                        "mRender": function (data, type, full, row) {
                            return " <span class='text-center' style='padding-right:20%;padding-left:20%'>" + data + " </span>"
                        }
                    },

                    {
                        "mData": "payroll_registry_descr",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-left' >" + data + "</span>"
                        }
                    },

                    {
                        "mData": null,
                        "bSortable": false,
                        "mRender": function (data, type, full, row) {

                            return '<center ><div class="btn-group">' +
                                '<button type="button" class="btn btn-danger btn-sm action" ng-click="btn_ca_link_action(' + row["row"] + ',' + '\'search_docs_Data\'' + ')"> <i class="fa fa-link"></i> </button>' +
                                '<button type="button" class="btn btn-warning btn-sm action" ng-click="btn_print_history_grid(' + row["row"] + ',' + '\'search_docs_Data\'' + ')"> <i class="fa fa-history"></i> </button>' +
                                '</div></center>';

                        }
                    }


                ],
                "createdRow": function (row, data, index) {
                    $(row).addClass("dt-row");
                    $compile(row)($scope);  //add this to compile the DOM
                },

            });

        $("div.toolbar").html('<b>Custom tool bar! Text/images etc.</b>');
    }

    s.search_in_list = function (value, table) {
        $("#" + table).DataTable().search(value).draw();
    }

    s.setNumOfRow = function (value, table) {
        $("#" + table).DataTable().page.len(s.rowLen).draw();
    }
    function isnull(data)
    {
        if(s.elEmpty(data))
        {
            return "";
        }
        else {
            return data
        }
    }

    function RetrieveYear() {

        var currentYear = new Date().getFullYear();

        var prev_year = currentYear - 5;
        for (var i = 1; i <= 8; i++) {
            var data = { "year": prev_year }
            s.year.push(data)
            prev_year++;
        }

    }
    function addvalueSearchDocModal(id,value)
    {
        $("#" + id).val(value)
        s.di[id] = value
    }
    function init() {

        $('#btn_rlsd').dblclick(false);
        $('#btn_rcvd').dblclick(false);
        $('#btn_retd').dblclick(false);
        $('#btn_cafoa').dblclick(false);
        
        $('#btn_rlsd').dblclick(function (e) {
            e.preventDefault();
        })

        $('#btn_rcvd').dblclick(function (e) {
            e.preventDefault();
        })

        $('#btn_retd').dblclick(function (e) {
            e.preventDefault();
        })

        $('#btn_cafoa').dblclick(function (e) {
            e.preventDefault();
        })

        Init_ToRecieve([])
        Init_ToRelease([])
        Init_search_docs([])
        Init_ToCorrect([])
        Init_DocType([])
        Init_CaLink([])
        
        loading("show")
        RetrieveYear()
        
        $('#dttm').val("");
        s.ds = {}
        s.ds.doc_status = "V"
        s.ds.track_year = ""
        s.ds.track_month = ""

        s.ds.track_year = new Date().getFullYear().toString()
        s.currentMonth = (new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1).toString()
        s.ds.track_month = s.currentMonth.toString();
        s.ddl_docs_type = "2"
       
        //s.allow_write = true
       
        h.post("../cMainPage/Initialize").then(function (d) {
            if(d.data.message == "success")
            {

                Init_Transmittal_dtl_List([])
                //s.departmentname = d.data.departmentname.department_short_name
                s.sys_date = d.data.dt_tm
                s.itd.it_doc_date = d.data.dt_tm
                s.docfundcode = d.data.docfundcode;
                s.paytrk_auth = d.data.paytrk_auth;
                paytrk_authority(s.paytrk_auth)

                //UPDATED BY JOSEPH....
                s.ToRecieve_Data = d.data.ToReceive.refreshTable('ToRecieve_Table', '');
                s.ToRelease_Data = d.data.ToRelease.refreshTable('ToRelease_Table', '');

              
                //s.ToRecieve_Table.columns.adjust().draw();
                //s.ToRelease_Table.columns.adjust().draw();

                s.document_tracking_link_tbl = d.data.doc_link

                s.departmentnames = d.data.departmentnames
                s.total_count_received = d.data.ToReceive.length
                s.total_count_released = d.data.ToRelease.length
            
                //-----------------------------------------------------------------------------------------
                s.DocType_Data = d.data.DocType
                d.data.DocType.refreshTable('DocType_Table', '');
                //-----------------------------------------------------------------------------------------

                s.ds.department_code = d.data.department_code
                s.department_cafoa   = d.data.department_code

                //---------------------------------------
                s.employmenttypelist = d.data.employmenttype
                s.payrolltemplate_list = d.data.payrolltemplate
                //---------------------------------------

                //---------------------------------------
                s.func_list = d.data.func_list // CAFOA
                Init_CAFOA_List([])
                //---------------------------------------
                
                loading("hide")
                $("#id_document_info").modal({ keyboard: false, backdrop: "static" })
                $("#doc_ctrl_nbr").focus();
               
                // document.getElementById("doc_ctrl_nbr").focus();
                //     s.search_box_receive = "asdasd";
                // setTimeout(function () {
                //     s.search_box_receive = "";
                // }, 2000);
            }
            else
            {
                alert(d.data.message)
            }
           
        })
    }

    init()
  
    
    function Today()
    {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var time = today.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        var hour = time.split(':')[0] < 10 ? '0' + time.split(':')[0] : time.split(':')[0];
        var min = time.split(':')[1].split(' ')[0];
        var sec = today.getSeconds();
        var milli = today.getMilliseconds();
        var mrdm = time.slice(-2);
        today = yyyy + '-' + mm + '-' + dd + ' ' + hour + ':' + min + ':' + sec;
        return today;
    }
    //for Document Control  number "doc_ctrl_nbr" ng-keyup -
    //Search documents in Receive and Release list via doc_ctrl_nbr
    
    var checkLocalData = function (nbr) {
      
        var dtl1 = s.ToRecieve_Data.filter(function (d, k) {
            return d.doc_ctrl_nbr == nbr
        })

        if (dtl1.length > 0)
        {
            return [dtl1,{'t':'V'}]
        }

        var dtl2 = s.ToRelease_Data.filter(function (d, k) {
            return d.doc_ctrl_nbr == nbr
        })

        if (dtl2.length > 0) {
            return [dtl2,{'t':'L'}]
        }
        return [[],{'t':'O'}]
    }


    s.correctReleasedRoute = function () {
        cs.spinnerAdd("correct_route", "fa-check")
        h.post("../cMainPage/document_tracking_tbl_2be_rlsd_cr").then(function (d) {
            if (d.data.icon == "success") {
                console.log(d.data.dt_cr)
                s.ToCorrect_Data = d.data.dt_cr.refreshTable('ToCorrect_Table', '');
                cs.spinnerRemove("correct_route", "fa fa-check")
                $("#correctReleasedModal").modal("show")
            }
            else {
                console.log(d.data.message)
                cs.spinnerRemove("correct_route", "fa fa-check")
            }
           

        })

    }
    s.btn_correct_released = function (row) {
        cs.spinnerAdd("correct" + row, "fa-check")
        s.data_correct = s.ToCorrect_Data[row]
        s.doc_ctrl_nbr = s.data_correct.doc_ctrl_nbr

        h.post("../cMainPage/getCorrectRoute", { doc_ctrl_nbr: s.doc_ctrl_nbr }).then(function (d) {
            if(d.data.icon =="success")
            {
                if (d.data.correct_route.length > 0)
                {
                   
                    addvalueSearchDocModal("remarks", s.data_correct.doc_remarks);
                    Required_Fields(s.data_correct)
                    s.to_release_route = d.data.correct_route
                    s.Data_Mode(s.data_correct, d.data.correct_route.length, 0, "L")
                    //$("#id_document_info").modal("show")
                    $("#id_document_info").modal({ keyboard: false, backdrop: "static" })
                    cs.spinnerRemove("correct" + row, "fa-check")
                    document.getElementById("doc_ctrl_nbr").focus();
                    cs.spinnerRemove("rlsd", "fa-forward")
                }
                else
                {
                    swal("No other routing option available", { icon: "warning" })
                    cs.spinnerRemove("correct" + row, "fa-check")
                }
            }
        })

        
    }


    s.scan_doc_ctrl_nbr = function (val) {
        var doc_len = 0
        if (val.substring(0,2) == "LV")
        {
            doc_len = 15;
        }
        else if (val.charAt(4) == "-")
        {
            doc_len = 12
        }
        else {
            doc_len = 6
        }
        if (val.length == doc_len || val.length == doc_len)
        {
            loading("show")
                //UPDATED BY JOSEPH
                //FETCH_DATA(val)

            FetchDataAgain();
        }
        else {
            docctrlnbrNotFound();
        }
    }

    var FETCH_DATA = function (nbr)
    {
        try {
            var dtl = []
            var rec = s.ToRecieve_Data.filter(function (d) {
                return d.doc_ctrl_nbr == nbr
            })

            var rel = s.ToRelease_Data.filter(function (d) {
                return d.doc_ctrl_nbr == nbr
            })

             //console.log(s.ToRecieve_Data)
             //console.log(s.ToRelease_Data)

            if (rec.length > 0) {
                dtl = rec
            }
            else if (rel.length > 0) {
                dtl = rel
            }
            // alert(dtl[0].document_status)
            var t = dtl[0].document_status

            console.log(dtl[0])
            console.log(dtl[0].doc_ctrl_nbr)
            if (t == "V")
            {
                s.list_type = "V"

                s.route_sequence = dtl[0].route_seq;

                s.rel_rec_ret = "Receive"

                var orig_route = dtl[0].route_ctrl_nbr
                var docctrlnbr = dtl[0].doc_ctrl_nbr


                h.post("../cMainPage/ReturnReleaseRouting", { docctrlnbr: docctrlnbr, par_action: t  }).then(function (d) {
                    s.temp_date_serv = d.data.dt_tm;
                    s.change_date = false;
                    s.doc_nbr_list = d.data.nbr_list
                    var paytrk_auth = d.data.paytrk_auth
                    paytrk_authority(paytrk_auth)
                    s.action_status = "RV"
                    s.di.payroll_registry_descr = dtl[0].payroll_registry_descr


                    $("#dttm").val(d.data.dt_tm);
                    s.data_vl = dtl
                    Required_Fields(dtl[0])
                    $("#barcode_notfound").addClass("hidden")
                    s.allow_receive = true
                    s.Data_Mode(dtl[0], s.l_len, s.t_len, "V")
                    loading("hide")
                    s.di.remarks = dtl[0].doc_remarks
                    $("#remarks").val(dtl[0].doc_remarks)

                })
            }
            else if (t == "L" || t == "T") {


                s.route_sequence = dtl[0].route_seq;
                s.list_type = "L"
                s.rel_rec_ret = "Release"
                s.allow_release = true;
                s.allow_return = false;
                //var orig_route = dtl[0].route_ctrl_nbr --MODIFIED BY JORGE: 03-10-2021
                var orig_route = dtl[0].department_code
                var docctrlnbr = dtl[0].doc_ctrl_nbr
                h.post("../cMainPage/ReturnReleaseRouting", { docctrlnbr: docctrlnbr, par_action: t  }).then(function (d) {
                    s.temp_date_serv = d.data.dt_tm;
                    s.change_date = false;
                    var paytrk_auth = d.data.paytrk_auth
                    s.doc_nbr_list = d.data.nbr_list
                    paytrk_authority(paytrk_auth)
                    ////console.log(d.data.release_route)
                    s.t_len = d.data.return_route.releaseReturnDropDown("T", "")
                    s.l_len = d.data.release_route.releaseReturnDropDown("L", dtl[0].vlt_dept_code)

                    //s.t_len = s.to_return_route.length
                    //s.l_len = s.to_release_route.length
                    //s.di.dd_ToRelease_route = dtl[0].rlsd_retd_2_route_ctrl_nbr.toString();

                    s.action_status = "RT"
                    s.di.payroll_registry_descr = dtl[0].payroll_registry_descr

                    $("#dttm").val(d.data.dt_tm);
                    s.data_vl = dtl
                    //s.di.dd_ToReturn_route = ""
                    Required_Fields(dtl[0])
                    $("#barcode_notfound").addClass("hidden")

                    s.Data_Mode(dtl[0], s.l_len, s.t_len, "L")

                    loading("hide")
                    s.di.remarks = dtl[0].doc_remarks
                    $("#remarks").val(dtl[0].doc_remarks)


                })
            }
            else {
                loading("hide")
            }

        } catch (e) {
            FetchDataAgain();
        }
       
    }

    
    Array.prototype.releaseReturnDropDown = function (action,def) {
        var data = this
        console.log(data)
        if(data.length > 0)
        {
            if(action == "L")
            {
                s.to_release_route = data
               
                if(cs.elEmpty(def))
                {
                    s.di.dd_ToRelease_route = def
                }
                else
                {
                    s.di.dd_ToRelease_route = ""
                }
              
            }
            else if(action == "T")
            {
                s.to_return_route = data
                
                if (cs.elEmpty(def)) {
                    s.di.dd_ToReturn_route = def
                }
                else {
                    s.di.dd_ToReturn_route = ""
                }
              
            }
        }

        return data.length
       
    }
    

    var docctrlnbrNotFound = function(){
        s.di.payroll_registry_descr = ""
        s.di.remarks = ""
        s.di.doc_voucher_nbr = ""
        s.di.doc_pbo_nbr = ""
        s.di.doc_othr_info = ""
        s.di.dd_ToRelease_route = ""
        s.di.dd_ToReturn_route = ""
        s.data_vl = []
        $("#barcode_notfound").removeClass("hidden")
    }

    // scan document control number for history start ----------------- marvin
    s.scan_doc_ctrl_nbr_history = function (val) {

        h.post("../cMainPage/getHistory", { docctrlnbr: val }).then(function (d) {
        
            if (d.data.message == "success") {
                var dh = d.data.doc_xtory


                if (dh.length > 0) {
                    if (dh.document_status == "T") {
                        s.rel_rec_ret_hist = "Returned"
                    }
                    else if (dh.document_status == "L") {
                        s.rel_rec_ret_hist = "Released"
                    }
                    else {
                        s.rel_rec_ret_hist = "Received"
                    }

                    s.hs.dttm = dh.doc_dttm
                    s.hs.payroll_registry_descr = ""
                    s.hs.remarks = dh.doc_remarks
                    $("#barcode_notfound_hist").addClass("hidden")
                }
                else {


                    s.hs.dttm = ""
                    s.hs.payroll_registry_descr = ""
                    s.hs.remarks = ""
                    $("#barcode_notfound_hist").removeClass("hidden")
                }

            }
            else {
                swal("Server Request Failed:n\\" + d.data.message, "List of Received Document not found", { icon: "warning", })
            }

        })


    }
        


    // scan document control number for history start ----------------- marvin



    //for Init_ToRecieve DataTable Grid action button - 
    // Search documents in Receive list via doc_ctrl_nbr
    s.btn_receive = function(row_id)
    {
        s.list_type = "V"
        s.rel_rec_ret = "Receive"
        var data_v = s.ToRecieve_Data[row_id]
       
        var orig_route = data_v.route_ctrl_nbr
        var docctrlnbr = data_v.doc_ctrl_nbr
        s.route_sequence = data_v.route_seq;
        h.post("../cMainPage/ReturnReleaseRouting", { docctrlnbr: docctrlnbr, par_action: "V"}).then(function (d) {
            s.temp_date_serv = d.data.dt_tm;
            s.change_date = false;
            var paytrk_auth = d.data.paytrk_auth
            s.doc_nbr_list = d.data.nbr_list
            paytrk_authority(paytrk_auth)
        
            
            s.doc_ctrl_nbr = data_v.doc_ctrl_nbr
            s.di.payroll_registry_descr = data_v.payroll_registry_descr
           s.di.remarks = data_v.doc_remarks
           

          

            //s.di.dttm = d.data.dt_tm
            $("#dttm").val(d.data.dt_tm);
            s.data_vl = [data_v]
            s.allow_receive = true
            s.Data_Mode(data_v,s.l_len,s.t_len,"V")
            Required_Fields(data_v)
            
            $('#collapseOne').collapse('show')
            $("#id_document_info").modal({ keyboard: false, backdrop: "static" })
        })
    }

    //for Init_ToRelease DataTable Grid action button - 
    // Search documents in Receive list via doc_ctrl_nbr
    s.btn_release = function (row_id) {
        s.list_type = "L"
        s.rel_rec_ret = "Release"
        s.allow_release = true;
        s.allow_return = false;
       
        var data_l = s.ToRelease_Data[row_id]
        var orig_route = data_l.route_ctrl_nbr
        var docctrlnbr = data_l.doc_ctrl_nbr
        s.route_sequence = data_l.route_seq;
        h.post("../cMainPage/ReturnReleaseRouting", { docctrlnbr: docctrlnbr, par_action: "L" }).then(function (d) {
            s.temp_date_serv = d.data.dt_tm;
            s.change_date = false;
            var paytrk_auth = d.data.paytrk_auth
            s.doc_nbr_list = d.data.nbr_list
            paytrk_authority(paytrk_auth)
            s.to_return_route = d.data.return_route
            s.to_release_route = d.data.release_route
            s.t_len = s.to_return_route.length
            s.l_len = s.to_release_route.length
           
            s.di.dd_ToRelease_route = data_l.rlsd_retd_2_route_ctrl_nbr.toString();
            
            s.doc_ctrl_nbr = data_l.doc_ctrl_nbr
            s.di.payroll_registry_descr = data_l.payroll_registry_descr
            s.di.remarks = data_l.doc_remarks
            if (data_l.required_doc_type == "OBR") {
                s.di.doc_nbr = data_l.doc_pbo_nbr
                s.di.doc_fund_subcode = data_l.doc_fund_subcode.toString()
            } else if (data_l.required_doc_type == "CHK") {
                s.di.doc_nbr = data_l.doc_check_nbr
                s.di.doc_fund_subcode = ""
            }
           
           
            $('#dttm').val(d.data.dt_tm);
           
          
            s.data_vl = [data_l]
            s.di.dd_ToReturn_route = ""
            s.Data_Mode(data_l, s.l_len, s.t_len,"L")
            Required_Fields(data_l)
            $('#collapseOne').collapse('show')
            $("#id_document_info").modal({ keyboard: false, backdrop: "static" })

        })
        
    }

   
    function SaveRoute(dt)
    {
        s.temp_date_front = $("#dttm").val()

        if (s.temp_date_front == s.temp_date_serv) {
            s.change_date = false;
        }
        else {
            s.change_date = true;
        }

        h.post("../cMainPage/sp_document_tracking_nbrs_tbl_update", { det: s.data_vl, dt: dt }).then(function (d) {
            if (d.data.message == "success")
            {
                h.post("../cMainPage/SaveRoute", {
                    det: s.data_vl,
                    dt: dt,
                    change_date: s.change_date,

                }).then(function (d) {
                  
                    if (d.data.message == "success")
                    {
                        if (s.ds.department_code == "03") {
                            h.post("../cMainPage/UpdateDocLink", { it_control_nbr: s.di.it_control_nbr, doc_ctrl_nbr: s.data_vl.doc_ctrl_nbr }).then(function (f) {
                                s.document_tracking_link_tbl = d.data.nlink;
                                swal(d.data.swl, { icon: "success", });
                                //ClearDocInfoFields2();
                                //removeSavingSpinner()
                            })
                        }
                        else {
                            swal(d.data.swl, { icon: "success", });
                            //removeSavingSpinner()
                            //ClearDocInfoFields2();
                           
                        }

                        //Added By: Joseph M. Tombo Jr. 12-15-2020 if refresh flag is Y then it will refresh all the table source
                        if (d.data.refresh_grid == "Y")
                        {
                            s.ToRelease_Data = d.data.ToRelease;
                            s.ToRecieve_Data = d.data.ToReceive;
                        }
                        else if (s.a_flag == "V")
                        {
                          
                            s.ToRecieve_Data = s.ToRecieve_Data.delete2(s.doc_ctrl_nbr);
                           // s.ToRelease_Data.push(initRelease_object(s.data_vl[0]));
                        }
                        else
                        {
                            s.ToRelease_Data = s.ToRelease_Data.delete2(s.doc_ctrl_nbr);
                        }

                        s.total_count_received = s.ToRecieve_Data.length
                        s.total_count_released = s.ToRelease_Data.length
                        //-----------------------------------------------

                        //Comment By: Joseph M. Tombo Jr. 12-15-2020
                        //s.ToRecieve_Data = d.data.ToReceive;
                        //s.ToRelease_Data = d.data.ToRelease;
                        //s.total_count_received = d.data.ToReceive.length
                        //s.total_count_released = d.data.ToRelease.length
                        //----------------------------------------------------
                        s.ToRecieve_Data.refreshTable('ToRecieve_Table', '');
                        s.ToRelease_Data.refreshTable('ToRelease_Table', '');
                        removeSavingSpinner();
                        ClearDocInfoFields2();
                        cs.spinnerRemove("rlsd", "fa-forward")
                        cs.spinnerRemove("rcvd", "fa-backward")
                       
                    }
                    else {
                        swal(d.data.message, { icon: "warning", });
                        cs.spinnerRemove("rlsd", "fa-forward")
                        cs.spinnerRemove("rcvd", "fa-backward")
                        removeSavingSpinner()
                    }
                })
            }
        })
    }

   
    s.ReceiveRoute = function (D)
    {
        cs.spinnerAdd("rcvd", "fa-backward")
        if (CheckedRequiredFields() == 1) {
            $("#requirefields").removeClass('hidden')
            return
        }
        s.a_flag = 'V'
        var date_dttm = $("#datetimepicker1").data("DateTimePicker").date()
       
        
        if (s.exec_block == true)
        {
            swal("Number already used!", { icon: "warning", })
            $("#doc_nbr").css({
                "border-color": "red",
                "border-width": "1px",
                "border-style": "solid"
            });
            return
        }
        $("#doc_nbr").css({
            "border": ""
        });
        $("#requirefields").addClass('hidden')
        $("#rcvd").removeClass("fa fa-forward")
        $("#rcvd").addClass("fa fa-spinner fa-spin")
        $("#btn_rcvd").prop('disabled', true)
        var dt = {
            
            dttm                : date_dttm,
            remarks             : D.remarks,
            doc_nbr             : D.doc_nbr,
            doc_fund_subcode    : D.doc_fund_subcode,
            a_flag              : s.a_flag,
            ToRelease_route     : s.di.dd_ToRelease_route,
            ToReturn_route      : s.di.dd_ToReturn_route,
        }

        SaveRoute(dt)
    }
    s.nbr_onkeyup = function(id,data)
    {
       
        var dtl = s.doc_nbr_list.filter(function (d) {
            return d.doc_ctrl_nbr != s.doc_ctrl_nbr
        })
        s.exec_block = false 
      
        if (!s.elEmpty(data))
        {
            if (s.docs_type == "OBR") {
                var dt = dtl.filter(function (d) {
                    return d.doc_pbo_nbr == data
                })
                if (dt.length > 0) {
                    swal("OBR number already used!", { icon: "warning", })
                    s.exec_block = true
                }

            }
            else if (s.docs_type == "CHK") {
                var dt = dtl.filter(function (d) {
                    return d.doc_voucher_nbr == data
                })
                if (dt.length > 0) {
                    swal("Voucher number already used!", { icon: "warning", })
                    s.exec_block = true
                }

            }
        }
        
       
     
    }
    function ClearDocInfoFields1() {
        s.it_control_nbr = ""
        s.itd.it_doc_date = ""
        $("#it_doc_date").val("")
        s.itd.it_from_name = ""
        s.itd.it_from_off_pos = ""
    }

    function ClearDocInfoFields2()
    {
        s.doc_ctrl_nbr              = ""
        s.di.payroll_registry_descr = ""
        s.di.remarks                = ""
        s.di.doc_nbr                = ""
        s.di.doc_fund_subcode       = ""
        s.di.dd_ToRelease_route     = ""
        s.di.dd_ToReturn_route      = ""
        s.di.it_control_nbr         = "" 
        s.show_release_btn          = false;
        s.show_return_btn           = false;
    }
    
    function removeSavingSpinner(){
        cs.spinnerRemove("rlsd", "fa-forward")

        $("#rcvd").removeClass("fa fa-spinner fa-spin")
        $("#rcvd").addClass("fa fa-forward")
        $("#btn_rcvd").prop('disabled', false)

        $("#retd").removeClass("fa fa-spinner fa-spin")
        $("#retd").addClass("fa fa-forward")
        $("#btn_retd").prop('disabled', false)
    }

    function removeRedBorder1()
    {
        $("#it_control_nbr").css({ "border": "none" })
        $(".it_control_nbr").addClass("hidden")
        $(".forChar").addClass("hidden")

        $("#it_doc_date").css({ "border": "none" })
        $(".it_doc_date").addClass("hidden")

        $("#it_from_name").css({ "border": "none" })
        $(".it_from_name").addClass("hidden")

        $("#it_from_off_pos").css({ "border": "none" })
        $(".it_from_off_pos").addClass("hidden")
    }
    

    function removeRedBorder2() {
        $("#doc_ctrl_nbr").css({ "border": "none" })
        $("#itcd_control_nbr").css({ "border": "none" })
        $("#dttm").css({ "border": "none" })
        $("#payroll_registry_descr").css({ "border": "none" })
        $("#remarks").css({ "border": "none" })
        $("#doc_nbr").css({ "border": "none" })
        $("#doc_fund_subcode").css({ "border": "none" })
        $("#doc_fund_subcode").css({ "border": "none" })
        $("#dd_ToRelease_route").css({ "border": "none" })
        $("#dd_ToReturn_route").css({ "border": "none" })
        $(".warningInfo").addClass("hidden")
        $("#barcode_notfound").addClass("hidden")

    }
    

    ////for btn_release ng-click 
    s.ReleaseRoute = function (D)
    {
        console.log(D);
        if (CheckedRequiredFields() == 1)
        {
            $("#requirefields").removeClass('hidden');
            return;
        }

        if (s.exec_block == true)
        {
            cs.required3("doc_nbr", "Number already used!")
            return
        }
        else
        {
            
            cs.required3("doc_nbr", "Required Field")
        }
        
        if (s.show_release_btn == true && s.elEmpty(s.di.dd_ToRelease_route))
        {
            cs.required3("dd_ToRelease_route","Required Field")
            return
        }
        else
        {
            cs.notrequired3("dd_ToRelease_route")
        }
       
        if (!cs.Validate1Field2("dd_ToRelease_route")) {
            return
        }
       

        cs.spinnerAdd("rlsd", "fa-forward")

        if(s.var_data_mode == "CR")
        {
            var dt = s.ToCorrect_Data.select("doc_ctrl_nbr", s.doc_ctrl_nbr);
            var route_seq = dt[0].route_seq;
            h.post("../cMainPage/CorrectReleasedRoute",
                {
                          doc_ctrl_nbr : s.doc_ctrl_nbr
                        , ToRelease_route : s.di.dd_ToRelease_route
                        , route_seq : route_seq
                        , remarks: s.di.remarks
                }).then(function (d) {
                        if(d.data.icon == "success")
                        {
                            
                            swal(d.data.message, { icon: d.data.icon })
                            $("#id_document_info").modal("hide")
                            s.ToCorrect_Data = d.data.dt_cr.refreshTable('ToCorrect_Table', '');
                            s.doc_ctrl_nbr.highliteRow("ToCorrect_Table", s.doc_ctrl_nbr)
                            removeSavingSpinner();
                            ClearDocInfoFields2();
                            cs.spinnerRemove("rlsd", "fa-forward");
                            cs.spinnerRemove("rcvd", "fa-backward");
                        }
                        else
                        {
                            swal(d.data.message, { icon: d.data.icon })
                        }
                })
        }
        else
        {
            var date_dttm = $("#datetimepicker1").data("DateTimePicker").date()
            var route = s.data_vl.route_ctrl_nbr
            s.a_flag = 'L'
            var dt = {

                dttm: date_dttm,
                remarks: D.remarks,
                doc_nbr: D.doc_nbr,
                doc_fund_subcode: D.doc_fund_subcode,
                a_flag: s.a_flag,
                ToRelease_route: s.di.dd_ToRelease_route,
                ToReturn_route: s.di.dd_ToReturn_route,
            }
            SaveRoute(dt)
        }
       
       
    }

    //for btn_return ng-click 
    s.ReturnRoute = function (D) {
        if (CheckedRequiredFields() == 1) {
            $("#requirefields").removeClass('hidden')
            return
        }
        if (!cs.Validate1Field2("dd_ToReturn_route")) {
            return
        }
        s.a_flag = 'T'
        var date_dttm = $("#datetimepicker1").data("DateTimePicker").date()
        var route = s.data_vl.route_ctrl_nbr
        
        if (s.exec_block == true) {
            swal("Number already used!", { icon: "warning", })
            $("#doc_nbr").css({
                "border-color": "red",
                "border-width": "1px",
                "border-style": "solid"
            });
            return
        }
        $("#doc_nbr").css({
            "border": ""
        });
        if (s.show_return_btn == true && s.elEmpty(s.di.dd_ToReturn_route)) {
            $("#dd_ToReturn_route").css({
                "border-color": "red",
                "border-width": "1px",
                "border-style": "solid"
            });
            
            $("#requirefields").removeClass('hidden')
            return
        }
        $("#requirefields").addClass('hidden')
        $("#retd").removeClass("fa fa-forward")
        $("#retd").addClass("fa fa-spinner fa-spin")
        $("#btn_retd").prop('disabled', true)
        var dt = {
           
            dttm: date_dttm,
            remarks: D.remarks,
            doc_nbr: D.doc_nbr,
            doc_fund_subcode: D.doc_fund_subcode,
            a_flag: s.a_flag,
            ToRelease_route   :  s.di.dd_ToRelease_route, 
            ToReturn_route    :  s.di.dd_ToReturn_route,  
        }

       SaveRoute(dt)
    }

    //for dd_ToReturn_route dropdown -
    //Get the list of offices that a certain documents is allowed to return.
    s.ToReturnRoute = function (data)
    {
        
        var orig_route  =   data.route_ctrl_nbr
        var docctrlnbr  =   data.doc_ctrl_nbr
        h.post("../cMainPage/ToReturnRoute", { orig_route: orig_route, docctrlnbr: docctrlnbr }).then(function (d) {
            s.to_return_route = d.data.route
           
            if (s.to_return_route.length < 1)
            {
                s.t_len = 0
            }
           
        })
    }


   
   

    //for dd_ToRelease_route ng-change -
    s.ToReleaseRouteSelect = function (val)
    {
        if(s.var_data_mode != "CR")
        {
            if (!s.elEmpty(val)) {
                s.rel_rec_ret = "Release"
                s.di.dd_ToReturn_route = "";
                s.allow_return = false
                s.allow_release = true;
                cs.notrequired3("dd_ToRelease_route")
            }
            else {
                s.rel_rec_ret = "Release"
                s.di.dd_ToReturn_route = "";
                s.allow_return = false
                s.allow_release = true;
                cs.required3("dd_ToRelease_route", "Required Field")
            }
           
            Required_Fields(s.data_vl)
            cs.notrequired3("dd_ToReturn_route")
        }

        //ADDED BY JORGE TO APPLY ON CHANGE ON REMARKS DETAILS.
        var dt = s.to_release_route.select("department_code", val)
        if (dt.length > 0) {
            s.di.remarks = dt[0].doc_remarks
        }
        else {
            s.di.remarks = ""
        }
       

    }

    //for dd_ToReturn_route ng-change -
    s.ToReturnRouteSelect = function (val) {

        if (!s.elEmpty(val)) {
            s.rel_rec_ret = "Return"
            s.di.dd_ToRelease_route = "";
            s.allow_release = false;
            s.allow_return = true;
            s.doc_nbr_show = false;
            s.doc_funcode_show = false
            cs.notrequired3("dd_ToReturn_route")
        }

        //ADDED BY JORGE TO APPLY ON CHANGE ON REMARKS DETAILS.
        var dt = s.to_return_route.select("department_code", val)
        if (dt.length > 0) {
            s.di.remarks = dt[0].doc_remarks
        }
        else {
            s.di.remarks = ""
        }
        cs.notrequired3("dd_ToReturn_route")
    }

    $('#id_document_info').on('shown.bs.modal', function () {
        $("#doc_ctrl_nbr").focus();
        $("#doc_fund_subcode").css({
            "border": "",
        });

        $("#doc_nbr").css({
            "border": "",
        });
        $("#remarks").css({
            "border": "",
        });

        s.di.doc_fund_subcode = ""
        $("#requirefields").addClass('hidden')
    })
    $('#id_document_info').on('hidden.bs.modal', function () {
        s.di.doc_nbr = ""
        s.allow_release = false;
        s.allow_return = false;
    })


  
    Array.prototype.refreshTable = function (table, id) {

        if (this.length == 0) {
           
            s[table].fnClearTable();
        }
        else {
           
            s[table].fnClearTable();
            s[table].fnAddData(this);
        }

        var el_id = s[table][0].id
        if (id != "") {
            for (var x = 1; x <= $("#" + el_id).DataTable().page.info().pages; x++) {
                if (id.get_page(table) == false) {
                    s[table].fnPageChange(x);
                }
                else {
                    break;
                }
            }
        }
        $("#spinner_load").modal("hide")
        return this
    }
    
    s.elEmpty = function(data) {
        if (data == null || data == "" || data == undefined) {
            return true
        }
        else {
            return false
        }

    }

    function currency(d) {

        var retdata = ""
        if (d == null || d == "" || d == undefined) {
            return retdata = "0.00"
        }
        else {
            retdata = parseFloat(d).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
       
            return retdata
           
        }
    }

    //data_mode: "CR"
    //department_code: "03"
    //doc_check_nbr: ""
    //doc_ctrl_nbr: "014108"
    //doc_dttm: "Oct  8 2020  3:21PM"
    //doc_fund_subcode: "105"
    //doc_obr_nbr: "200-20-10-00084"
    //doc_othr_info: ""
    //doc_user_id: ""
    //doc_voucher_nbr: "201023214"
    //docmnt_type: "01"
    //docmnt_type_source: "01-P"
    //document_status: "L"
    //document_status_descr: "For Releasing (Correction)"
    //fund_code: "10000021"
    //gross_pay: 4499.99
    //net_pay: 3789.99
    //new_row_flag: "N"
    //payroll_month: "09"
    //payroll_registry_descr: "SABITE, CHRISTIAN JOHN"
    //payroll_year: "2020"
    //payrolltemplate_code: "010"
    //payrolltemplate_descr: "1st Quincena Payroll"
    //required_doc: false
    //required_doc_type: ""
    //rlsd_retd_2_route_ctrl_nbr: 5
    //role_id: "400"
    //route_ctrl_nbr: 1
    //route_descr: "PHRMDO - Released Correction"
    //route_seq: 7
    //with_data_link: "N"
 
    function Required_Fields(data) {

        if (data.required_doc == 1 && data.required_doc_type == "OBR")
        { 
            s.doc_nbr_lbl = "Obligation Number"
            s.doc_nbr_show = false
            s.doc_funcode_show = true

            
            if (!s.elEmpty(data.doc_pbo_nbr))
            {
                s.di.doc_nbr = data.doc_pbo_nbr
            }

            if (!s.elEmpty(data.doc_fund_subcode.toString()))
            {
                s.di.doc_fund_subcode = data.doc_fund_subcode.toString()
            }

        }

        else if (data.required_doc == 1 && data.required_doc_type == "VCR") {
            s.doc_nbr_lbl = ""
            s.doc_nbr_show = false
            s.doc_funcode_show = true


            //if (!s.elEmpty(data.doc_cafoa))
            //{
            //    s.di.doc_nbr = data.doc_cafoa
            //}

            if (!s.elEmpty(data.doc_fund_subcode.toString()))
            {
                s.di.doc_fund_subcode = data.doc_fund_subcode.toString()
            }

        }

        else if (data.required_doc == 1 && data.required_doc_type == "CHK")
        {
            s.doc_nbr_lbl = "Check Number"
            s.doc_nbr_show = true
            s.doc_funcode_show = false
            if (!s.elEmpty(data.doc_check_nbr))
            {
                s.di.doc_nbr = data.doc_check_nbr
                s.di.doc_fund_subcode = ""
            }
           
        }
        else
        {
            s.doc_nbr_show = false
            s.doc_funcode_show = false
        }
        addvalueSearchDocModal("payroll_registry_descr", data.payroll_registry_descr)
    }


    s.Data_Mode = function (data, l, t, A) {
        //alert(data.data_mode)
        //console.log(data)
        ButtonCafoa();
        console.log("Data Mode is LT show release and return")
        console.log("Data Mode is LO show release only")
        console.log("Data Mode is TO show return only")
        console.log("Release Count is 0 hide release")
        console.log("Return Count is 0 hide return")
        console.log("Data Mode:" + data.data_mode)
        console.log("Release Count:" + l)
        console.log("Return Count:" + t)
        console.log("Action:" + A)

        s.allow_release     = false
        s.allow_receive     = false
        s.allow_return      = false
        s.show_release_btn  = false
        s.show_return_btn   = false


        if (A == "V")
        {
            s.allow_receive = true
        }
        else if (A == "L")
        {
            s.var_data_mode = data.data_mode

            if (data.data_mode == "LT")
            {
                s.show_return_btn = true
                s.show_release_btn = true

                if (l > 0)
                {
                    s.show_release_btn  = true
                    s.allow_release     = true

                    if (l == 1) {
                        s.di.dd_ToRelease_route = s.to_release_route[0].department_code;
                    }
                    else
                    {
                        s.di.dd_ToRelease_route = "";
                    }
                }
                else {
                    s.show_release_btn  = false
                    s.allow_release     = false
                }

                if (t > 0)
                {
                    s.show_return_btn = true
                    //s.allow_return = true
                }
                else
                {
                    s.show_return_btn   = false
                    //s.allow_return      = false
                }
            }
            else if (data.data_mode == "LO") {
                s.show_release_btn = true
                if (l > 0)
                {
                    s.show_release_btn  = true
                    s.allow_release     = true
                    if (l == 1)
                    {
                        s.di.dd_ToRelease_route = s.to_release_route[0].department_code;
                    }
                    else {
                        s.di.dd_ToRelease_route = "";
                    }
                }
                else {
                    s.show_release_btn = false
                    s.allow_release = false
                }
            }
            else if (data.data_mode == "TO")
            {
                s.doc_nbr_show = false
                s.doc_funcode_show = false

                if (t > 0) {
                    s.show_return_btn   = true
                    s.allow_return      = true
                }
                else {
                    s.show_return_btn   = false
                    s.allow_return      = false
                }
            }
            else if (data.data_mode == "CR") {
                s.show_release_btn = true
                if (l > 0) {
                    s.show_release_btn = true
                    s.allow_release = true
                }
                else {
                    s.show_release_btn = false
                    s.allow_release = false
                }
            }
        }
    }


    //***********************************//
    //***Print-Button-on-Grid*****VJA****//
    //***********************************// 
    s.btn_print_action2 = function (lst, table_data) {

        h.post("../cMainPage/RetrieveTemplate", { par_payrolltemplate_code: s[table_data][lst].payrolltemplate_code, }).then(function (d) {
            if (d.data.message = "success")
            {
                s.reports = d.data.sp_payrollregistry_template_combolist_TRK
                s.ShowSelected = true;
                s.txtb_descr                = s[table_data][lst].payroll_registry_descr
                s.txtb_ctrl_no              = s[table_data][lst].payroll_registry_nbr
                s.txtb_payroll_year         = s[table_data][lst].payroll_year
                s.txtb_payroll_month        = s[table_data][lst].payroll_month
                s.txtb_orig_template_code   = s[table_data][lst].payrolltemplate_code
                $('#modal_print_option').modal({ keyboard: false, backdrop: "static" });
                $('#modalLabelSmall').html("PAYROLL REPORT OPTIONS");

            } else {
                swal("NO DATA FOUND")
            }
        })

    }



    //***********************************//
    //***Print-Button-on-Grid*****VJA***//
    //***********************************// 
    s.btn_print_action = function (lst) {

        if (s.ToRecieve_Data[lst].docmnt_type_source == "01-P") {
            h.post("../cMainPage/RetrieveTemplate", { par_payrolltemplate_code: s.ToRecieve_Data[lst].payrolltemplate_code, }).then(function (d) {
                s.reports = d.data.sp_payrollregistry_template_combolist_TRK
            })
            s.ShowSelected = true;
            s.txtb_descr = s.ToRecieve_Data[lst].payroll_registry_descr
            s.txtb_ctrl_no = s.ToRecieve_Data[lst].doc_ctrl_nbr
            s.txtb_payroll_year = s.ToRecieve_Data[lst].payroll_year
            s.txtb_payroll_month = s.ToRecieve_Data[lst].payroll_month
            s.txtb_orig_template_code = s.ToRecieve_Data[lst].payrolltemplate_code
            $('#modalLabelSmall').html("PAYROLL REPORT OPTIONS");

        }
        else if (s.ToRecieve_Data[lst].docmnt_type_source == "01-V") {
            h.post("../cMainPage/RetrieveTemplate", { par_payrolltemplate_code: s.ToRecieve_Data[lst].payrolltemplate_code }).then(function (d) {
                s.reports = d.data.sp_payrollregistry_template_combolist_TRK
            })
            s.ShowSelected = true;
            s.txtb_descr = s.ToRecieve_Data[lst].payroll_registry_descr
            s.txtb_ctrl_no = s.ToRecieve_Data[lst].doc_ctrl_nbr
            s.txtb_payroll_year = s.ToRecieve_Data[lst].payroll_year
            s.txtb_payroll_month = s.ToRecieve_Data[lst].payroll_month
            s.txtb_orig_template_code = s.ToRecieve_Data[lst].payrolltemplate_code
            $('#modalLabelSmall').html("VOUCHER REPORT OPTIONS");

        }
        else if (s.ToRecieve_Data[lst].docmnt_type_source == "02") {
            s.ShowSelected = false;
            s.txtb_descr = s.ToRecieve_Data[lst].payroll_registry_descr
            s.txtb_ctrl_no = s.ToRecieve_Data[lst].doc_ctrl_nbr
            s.txtb_payroll_year = s.ToRecieve_Data[lst].payroll_year
            s.txtb_payroll_month = s.ToRecieve_Data[lst].payroll_month
            s.txtb_orig_template_code = s.ToRecieve_Data[lst].payrolltemplate_code
            $('#modalLabelSmall').html("CASH ADVANCE REPORT OPTIONS");
        }
        $('#modal_print_option').modal({ keyboard: false, backdrop: "static" });
    }
    //************************************//
    //*Select-Print-Action-on-Modal*VJA***//
    //***********************************// 
    s.select_ddl_reports = function () {
        h.post("../cMainPage/SelectReportFile", { par_payrolltemplate_code: s.txtb_orig_template_code, par_payrolltemplate_code1: $('#ddl_reports option:selected').val() }).then(function (d) {
            s.txtb_report_filename = d.data.reportfile[0].report_filename
        })

    }

    //***********************************//
    //***Print-Action-on-Modal*****VJA***//
    //***********************************// 
    s.btn_print_click = function () {
        //var id_ss
        //id_ss = index_update
      
        if (s.ddl_reports == "")
        {
            $("#ddl_reports").css({
                "border-color": "red",
                "border-width": "1px",
                "border-style": "solid"
            })
            $(".ddl_reports").removeClass("hidden");
            return
        }
        else
        {
            $("#ddl_reports").css({
                "border": "none",
            })
            $(".ddl_reports").addClass("hidden");
        }
        h.post("../cMainPage/PreviousValuesonPage_cMainPage", {

                  par_doc_ctrl_nbr: s.doc_ctrl_nbr
                , par_ddl_doc_status: s.ddl_doc_status
                , par_track_year: s.track_year
                , par_track_month: s.track_month
                , par_ddl_reports: s.ddl_reports
        }).then(function (d){})

        var controller = "Reports"
        var action = "Index"
        var ReportName = "CrystalReport"
        var SaveName = "Crystal_Report"
        var ReportType = "inline"

        var ReportPath = "~/Reports/"
        var sp = ""
        var parameters = ""

        ReportPath = ReportPath + s.txtb_report_filename

        switch ($('#ddl_reports option:selected').val()) {
            case "007": // Summary Monthly Salary  - For Regular 
                sp = "sp_payrollregistry_salary_re_ce_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()
                break;


            case "105": // Obligation Request (OBR) - For Regular 
            case "205": // Obligation Request (OBR) - For Casual
            case "305": // Obligation Request (OBR) - For Job-Order
                //printreport = hidden_report_filename.Text;
                //sp = "sp_payrollregistry_obr_rep";
                sp = "sp_payrollregistry_cafao_rep_new";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val();

                break;

                //---- START OF REGULAR REPORTS

            case "007": // Summary Monthly Salary  - For Regular 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_re_ce_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "101": // Mandatory Deduction  - For Regular 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_re_ce_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "102": // Optional Deduction Page 1 - For Regular 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_re_ce_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "106": // Optional Deduction Page 2 - For Regular 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_re_ce_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "103": // Loan Deduction Page 1 - For Regular 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_re_ce_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "107": // Loan Deduction Page 2 - For Regular 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_re_ce_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "104": // Attachment - For Monthly Salary
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_re_attach_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no;

                break;

            case "033": // Salary Differential - For Regular 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_diff_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

                //---- END OF REGULAR REPORTS

                //---- START OF CASUAL REPORTS

            case "008": // Summary Monthly Salary  - For Casual 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_ce_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "206": // Mandatory Deduction  -  For Casual 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_ce_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "207": // Optional Deduction Page 1 - For Casual 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_ce_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "208": // Optional Deduction Page 2 - For Casual 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_ce_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "209": // Loan Deduction Page 1 - For Casual 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_ce_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "210": // Loan Deduction Page 2 - For Casual 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_ce_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "211": // Attachment - For Monthly Salary - For Casual 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_ce_attach_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no;

                break;

            case "044": // Monetization Payroll - For Casual
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_oth1_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

                //---- END OF CASUAL REPORTS

                //---- START OF JOB-ORDER REPORTS

            case "009": // Summary Salary Monthly - For Job-Order 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_jo_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "010": // Summary Salary 1st Quincemna - For Job-Order 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_jo_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "011": // Summary Salary 2nd Quincemna - For Job-Order 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_jo_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "306": // Contributions/Deductions Page 1 - For Job-Order 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_jo_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "307": // Contributions/Deductions Page 1 - For Job-Order 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_jo_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "308": // Attachment - For Monthly Salary
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_re_attach_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no;

                break;

            case "061": // Overtime Payroll - For Job-Order 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_ovtm_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "062": // Honorarium Payroll - For Job-Order 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_oth1_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;


                //---- END OF JOB-ORDER REPORTS
                //---- START OF OTHER PAYROLL REPORTS

            case "024": // Communication Expense Allowance - Regular
            case "043": // Communication Expense Allowance - Casual
            case "063": // Communication Expense Allowance - Job-Order
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_oth1_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "026": // Mid Year Bonus  - Regular        
            case "045": // Mid Year Bonus  - Casual       
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_oth1_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "027": // Year-End And Cash Gift Bonus - Regular
            case "046": // Year-End And Cash Gift Bonus - Casual
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_oth1_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "028": // Clothing Allowance - Regular
            case "047": // Clothing Allowance - Casual
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_oth1_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "029": // Loyalty Bonus        - Regular
            case "048": // Loyalty Bonus        - Casual
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_oth1_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "030": // Anniversary Bonus    - Regular
            case "049": // Anniversary Bonus    - Casual
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_oth1_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "031": // Productivity Enhancement Incentive Bonus  - Regular
            case "050": // Productivity Enhancement Incentive Bonus  - Casual
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_oth1_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "023": // RATA 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_rata_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "108": // RATA - OBR Breakdown
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_obr_rata_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val() + ",par_employment_type," + ddl_empl_type.SelectedValue.ToString().Trim();

                break;

            case "021": // Subsistence, HA and LA      - Regular
            case "041": // Subsistence, HA and LA      - Casual
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_subs_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "022": // Overtime - Regular
            case "042": // Overtime - Casual
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_ovtm_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "032": // CNA INCENTIVE - Regular
            case "051": // CNA INCENTIVE - Casual
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_oth1_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "025": // Monetization Payroll - For Regular
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_oth1_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "901": // Other Payroll 1 - For Regular 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_othpay_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "902": // Other Payroll 2 - For Regular 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_othpay_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "903": // Other Payroll 3 - For Regular 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_othpay_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "904": // Other Payroll 4 - For Regular 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_othpay_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "905": // Other Payroll 5 - For Regular 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_othpay_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;

            case "109": // Communicatio Expense - OBR Breakdown
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_obr_commx_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val() + ",par_employment_type," + ddl_empl_type.SelectedValue.ToString().Trim();

                break;

            case "": // Direct Print to Printer
                parameters = "/View/cDirectToPrinter/cDirectToPrinter.aspx";
                break;

            case "111": // Attachment - FOR RATA PAYROLL
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_RATA_attach_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no;

                break;

            case "212": // PaySLip  - For Regular 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_payslip_re_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_month," + ddl_month.SelectedValue.ToString().Trim() + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + ddl_select_report.SelectedValue.ToString().Trim() + ",par_empl_id," + "";

                break;

            case "214": // PaySLip  - For Casual 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_salary_payslip_ce_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_month," + ddl_month.SelectedValue.ToString().Trim() + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + ddl_select_report.SelectedValue.ToString().Trim() + ",par_empl_id," + "";

                break;

            case "034": // Honorarium  - For Regular 
            case "035": // Honorarium  - For Casual 
                //printreport = hidden_report_filename.Text;
                sp = "sp_payrollregistry_oth1_rep";
                parameters = "par_payroll_year," + s.txtb_payroll_year + ",par_payroll_registry_nbr," + s.txtb_ctrl_no + ",par_payrolltemplate_code," + $('#ddl_reports option:selected').val()

                break;
        }


        location.href = "../" + controller + "/" + action + "?ReportName=" + ReportName
            + "&SaveName=" + SaveName
            + "&ReportType=" + ReportType
            + "&ReportPath=" + ReportPath
            + "&Sp=" + sp + "," + parameters

    }

    //***********************************//
    //***View-Document-on-Modal*****VJA***//
    //***********************************// 
    s.btn_view_docs = function () {
        s.allow_receive = false;
        s.allow_cafoa = false;
        cs.spinnerAdd("scndocctrlnbr", "fa-qrcode")
        $("#doc_fund_subcode").css({
            "border": "",
        });
        $("#doc_nbr").css({
            "border": "",
        });
        $("#remarks").css({
            "border": "",
        });
        ClearDocInfoFields2()
        removeRedBorder2()
        h.post("../cMainPage/transmittalLink").then(function (d) {
            $("#id_document_info").modal({ keyboard: false, backdrop: "static" })
            s.document_tracking_link_tbl = d.data.document_tracking_link_tbl
            document.getElementById("doc_ctrl_nbr").focus();
            cs.spinnerRemove("scndocctrlnbr", "fa-qrcode")
        })
       
       
    }

    
    s.select_fund_code = function(fundcode)
    {

    }

    //***********************************//
    //***View-Document-history*****MARVIN***//
    //***********************************// 
    s.btn_view_docs_history = function () {

        $("#id_document_history").modal({ keyboard: false, backdrop: "static" })
        document.getElementById("doc_ctrl_nbr_hist").focus();
    }

    //***********************************//
    //***Print-Document-on-Modal*****VJA***//
    //***********************************//
    s.btn_print_document = function (ds) {
        // V - Received Documents
        // L - Released Documents
        // T - Returned Documents

        var controller = "Reports"
        var action = "Index"
        var ReportName = "CrystalReport"
        var SaveName = "Crystal_Report"
        var ReportType = "inline"
        var ReportPath = "~/Reports/"
        var sp = ""
        var parameters = ""

        if (ds.doc_status == "V") {
            h.post("../cMainPage/ReportDocuments", {
                par_doc_status: ds.doc_status,
                par_year: ds.track_year,
                par_month: ds.track_month,

            }).then(function (d) {
                if (d.data.data1.length > 0) {
                    sp = "sp_edocument_trk_tbl_rcvd_list";
                    parameters = "p_department_code," + d.data.dept + ",p_year," + ds.track_year + ",p_month," + ds.track_month
                    ReportPath = ReportPath + "cryDocTracking/cryReceivedDocs.rpt"
                    location.href = "../" + controller + "/" + action + "?ReportName=" + ReportName
                        + "&SaveName=" + SaveName
                        + "&ReportType=" + ReportType
                        + "&ReportPath=" + ReportPath
                        + "&Sp=" + sp + "," + parameters
                } else {
                    swal("No Data Found !", "List of Received Document not found", { icon: "warning", })
                }

            })

        }
        else if (ds.doc_status == "L") {

            h.post("../cMainPage/ReportDocuments", {
                par_doc_status: ds.doc_status,
                par_year: ds.track_year,
                par_month: ds.track_month,

            }).then(function (d) {

                if (d.data.data2.length > 0) {
                    sp = "sp_edocument_trk_tbl_rlsd_list";
                    parameters = "p_department_code," + d.data.dept + ",p_year," + ds.track_year + ",p_month," + ds.track_month
                    ReportPath = ReportPath + "cryDocTracking/cryReleasedDocs.rpt"
                    location.href = "../" + controller + "/" + action + "?ReportName=" + ReportName
                        + "&SaveName=" + SaveName
                        + "&ReportType=" + ReportType
                        + "&ReportPath=" + ReportPath
                        + "&Sp=" + sp + "," + parameters
                } else {
                    swal("No Data Found !", "List of Released Document not found", { icon: "warning", })
                }

            })
        }
        else if (ds.doc_status == "T") {
            h.post("../cMainPage/ReportDocuments", {
                par_doc_status: ds.doc_status,
                par_year: ds.track_year,
                par_month: ds.track_month,

            }).then(function (d) {

                if (d.data.data3.length > 0) {
                    sp = "sp_edocument_trk_tbl_retd_list";
                    parameters = "p_department_code," + d.data.dept + ",p_year," + ds.track_year + ",p_month," + ds.track_month
                    ReportPath = ReportPath + "cryDocTracking/cryReturnedDocs.rpt"
                    location.href = "../" + controller + "/" + action + "?ReportName=" + ReportName
                        + "&SaveName=" + SaveName
                        + "&ReportType=" + ReportType
                        + "&ReportPath=" + ReportPath
                        + "&Sp=" + sp + "," + parameters
                } else {
                    swal("No Data Found !", "List of Returned Document not found", { icon: "warning", })
                }

            })
        }

        //if (ds.doc_status != "") {
        //    location.href = "../" + controller + "/" + action + "?ReportName=" + ReportName
        //        + "&SaveName=" + SaveName
        //        + "&ReportType=" + ReportType
        //        + "&ReportPath=" + ReportPath
        //        + "&Sp=" + sp + "," + parameters
        //}
    }

    //*********************************************//
    //***Prit-Document-History-on-Modal*****VJA***//
    //*******************************************//
    s.btn_print_dochistory = function () {

        if (s.doc_ctrl_nbr_print_history == "" || $('#doc_ctrl_nbr_print_history').val() == "") {
            swal("Document Control Number is required !", "", "warning")
        }
        else {

            h.post("../cMainPage/RetrieveDocHistory", {

                par_doc_ctrl_nbr: s.doc_ctrl_nbr_print_history
            }).then(function (d) {
                var doctype = d.data.doctype.docmnt_type;
                //alert(d.data.doctype)
                if (d.data.message = "success")
                {
                    var ReportName  = "CrystalReport";
                    var SaveName    = "Crystal_Report";
                    var ReportType  = "inline";
                    var sp          = "";
                    var parameters  = "";
                    var docmnt_type = doctype;
                    sp = "sp_edocument_trk_tbl_history";
                    parameters = "p_doc_ctrl_nbr," + s.doc_ctrl_nbr_print_history + ",p_docmnt_type," + docmnt_type;
                    ReportPath = "~/Reports/cryDocTracking/cryDocsHistory.rpt";
                    sp = "sp_edocument_trk_tbl_history," + parameters;


                    var iframe = document.getElementById('iframe_print_preview');
                    var iframe_page = $("#iframe_print_preview")[0];

                    iframe.style.visibility = "hidden";

                    s.embed_link = "../Reports/CrystalViewer.aspx?Params=" + ""
                        + "&ReportName=" + ReportName
                        + "&SaveName=" + SaveName
                        + "&ReportType=" + ReportType
                        + "&ReportPath=" + ReportPath
                        + "&id=" + sp;

                    if (!/*@cc_on!@*/0) {
                        iframe.onload = function () {
                            iframe.style.visibility = "visible";
                            $("#modal_generating_remittance").modal("hide")

                        };
                    }
                    else if (iframe_page.innerHTML()) {
                        // get and check the Title (and H tags if you want)
                        var ifTitle = iframe_page.contentDocument.title;
                        if (ifTitle.indexOf("404") >= 0) {
                            swal("You cannot Preview this Report", "There something wrong!", { icon: "warning" });
                            iframe.src = "";

                            s.loading_r = false;
                        }
                        else if (ifTitle != "") {
                            swal("You cannot Preview this Report", "There something wrong!", { icon: "warning" });
                            iframe.src = "";

                            s.loading_r = false;
                            $('#print_preview_modal').modal("hide");
                        }
                    }
                    else {
                        iframe.onreadystatechange = function () {
                            if (iframe.readyState == "complete") {
                                iframe.style.visibility = "visible";

                            }
                        };
                    }

                    s.loading_r = false;

                    iframe.src = s.embed_link;

                    $("#print_preview_modal").modal({ keyboard: false, backdrop: "static" });

                    //var controller = "Reports"
                    //var action = "Index"
                    //var ReportName = "CrystalReport"
                    //var SaveName = "Crystal_Report"
                    //var ReportType = "inline"

                    //var ReportPath = "~/Reports/"
                    //var sp = ""
                    //var parameters = ""

                    //sp = "sp_edocument_trk_tbl_history";
                    //parameters = "p_doc_ctrl_nbr," + s.doc_ctrl_nbr_print_history + ",p_docmnt_type," + doctype
                    //ReportPath = ReportPath + "cryDocTracking/cryDocsHistory.rpt"


                    //location.href = "../" + controller + "/" + action + "?ReportName=" + ReportName
                    //    + "&SaveName=" + SaveName
                    //    + "&ReportType=" + ReportType
                    //    + "&ReportPath=" + ReportPath
                    //    + "&Sp=" + sp + "," + parameters
                } else {
                    swal("No Data Found !", "", "warning")
                }

            })

        }

    }

    //***********************************************************//
    //***Field validation for remittance type before opening add modal
    //***********************************************************// 
    function ValidateFields() {
        var return_val = true;
        ValidationResultColor("ALL", false);

        if ($('#txtb_code').val() == "" && s.saveMode == "ADD") {
            ValidationResultColor("txtb_code", true);
            return_val = false;
        }

        if ($('#txtb_description').val() == "") {
            ValidationResultColor("txtb_description", true);
            return_val = false;
        }

        return return_val;
    }
    //***********************************************************//
    //***Field validation for remittance type before opening add modal
    //***********************************************************// 
    function ValidationResultColor(par_object_id, par_v_result) {
        if (par_v_result) {
            //Add class to the obect that need to focus as a required..
            $("#" + par_object_id).addClass("required");
            $("#lbl_" + par_object_id + "_req").text("Required Field");
        }
        else {
            //remove of refresh the object form being required

            $("#txtb_code").removeClass("required");
            $("#lbl_txtb_code_req").text("");

            $("#txtb_description").removeClass("required");
            $("#lbl_txtb_description_req").text("");
        }
    }
    //***********************************************************//
    //*** Highlight Table Row
    //***********************************************************// 
    function get_page(empl_id) {
        var nakit_an = false;
        var rowx = 0;
        $('#docType_datalist_grid tr').each(function () {
            $.each(this.cells, function (cells) {
                if (cells == 0) {
                    if ($(this).text() == empl_id) {
                        nakit_an = true;
                        return false;
                    }
                }
            });
            if (nakit_an) {
                $(this).addClass("selected");
                return false;
            }
            rowx++;
        });
        return nakit_an;
    }
    function clearentry() {
        s.txtb_code = "";
        s.txtb_description = "";

        $("#txtb_description").removeClass("required");
        $("#lbl_txtb_description_req").text("");
    }

    //************************************//
    //*** Add New Row To Table
    //************************************//
    s.addNewRow = function () {
        var table = $('#docType_datalist_grid').DataTable();

        // Sort by column 1 and then re-draw
        table
            .order([0, 'asc'])
            .draw();

        //var temp = 0;
        //var table = $('#docType_datalist_grid').DataTable();
        //table.page(temp).draw(false);

        if (ValidateFields()) { }
        if (s.SaveOpen == true) {
            swal("Save your work before doing other action!", { icon: "warning", });
        }
        else {

            s.saveMode = "ADD"
            clearentry();
            s.newRow = 1;
            var t = $('#docType_datalist_grid').DataTable();
            var counter = 1;

            t.row.add({
                "docmnt_type": "<input class='form-control text-center' maxlength='2'  placeholder ='Enter Code' id='txtb_code' ng-model='txtb_code' />",
                "docmnt_type_descr": "<input class='form-control' maxlength='50'  placeholder ='Enter Description' id='txtb_description' ng-model='txtb_description' />",
                "IsActive": '1'
            }).draw(false);

            $("#txtb_code").focus();
            s.SaveOpen = true;
        }
    }
    //************************************// 
    //*** Save New Record              
    //**********************************// 
    s.btn_save_click = function (row_id) {
        if (ValidateFields()) {
            if (s.saveMode == "ADD") {
                
                h.post("../cMainPage/CheckExist", {
                    docmnt_type: s.txtb_code
                }).then(function (d) {
                    if (d.data.message == "success") {
                        s.newRow = 0;
                        btn = document.getElementById('addFinal');
                        btn.innerHTML = '<i class = "fa fa-spinner fa-spin"></i>';
                        var data = {
                            docmnt_type: s.txtb_code
                            , docmnt_type_descr: s.txtb_description
                        }

                        h.post("../cMainPage/Save", { data: data }).then(function (d) {
                            if (d.data.message == "success") {
                                s.DocType_Data.push(data)
                                s.DocType_Table.fnClearTable();
                                s.DocType_Table.fnAddData(s.DocType_Data);
                                for (var x = 1; x <= $('#docType_datalist_grid').DataTable().page.info().pages; x++) {
                                    if (get_page(s.txtb_code) == false) {
                                        s.DocType_Table.fnPageChange(x);
                                    }
                                    else {
                                        break;
                                    }
                                }
                                swal("Your record has been saved!", { icon: "success", });
                                s.SaveOpen = false;
                            }
                            else {
                                swal(d.data.message, { icon: "warning", });
                            }
                        })
                    }
                    else {
                        swal("Data already exist!", { icon: "warning", });
                        for (var x = 1; x <= $('#docType_datalist_grid').DataTable().page.info().pages; x++) {
                            if (get_page(s.txtb_code) == false) {
                                s.DocType_Table.fnPageChange(x);
                            }
                            else {
                                break;
                            }
                        }
                    }
                });
            }
            else if (s.saveMode == "EDIT") {
                
                s.newRow = 0;
                btn = document.getElementById('addFinal');
                btn.innerHTML = '<i class = "fa fa-spinner fa-spin"></i>';

                var data = {
                    docmnt_type: s.txtb_code
                    , docmnt_type_descr: s.txtb_description
                }
                h.post("../cMainPage/SaveEdit", { data: data }).then(function (d) {
                    if (d.data.message == "success") {
                        s.DocType_Data.push(data);
                        s.DocType_Table.fnClearTable();
                        s.DocType_Table.fnAddData(s.DocType_Data);

                        for (var x = 1; x <= $('#docType_datalist_grid').DataTable().page.info().pages; x++) {
                            if (get_page(s.txtb_code) == false) {
                                s.DocType_Table.fnPageChange(x);
                            }
                            else {
                                break;
                            }
                        }
                        s.SaveOpen = false;
                       
                        swal("Your record successfully updated!", { icon: "success", });
                    }
                    else {
                        swal(d.data.message, { icon: "warning", });
                    }
                });
            }
        }
        else {

        }
    }
    //************************************// 
    //*** Edit Row         
    //**********************************// 
    s.btn_edit_action = function (row_id) {
        if (s.SaveOpen == true) {
            swal("Save your work before doing other action!", { icon: "warning", });
        }
        else {
            s.saveMode = "EDIT"
            s.SaveOpen = true;
            var temp_code = s.DocType_Data[row_id].docmnt_type;
            var temp_descr = s.DocType_Data[row_id].docmnt_type_descr;
            s.txtb_code = temp_code;
            s.txtb_description = temp_descr;
            s.DocType_Data = s.DocType_Data.delete(row_id);
            s.DocType_Table.fnClearTable();
            if (s.DocType_Data.length != 0) {
                s.DocType_Table.fnAddData(s.DocType_Data);
            }

            s.newRow = 1;
            var t = $('#docType_datalist_grid').DataTable();

            t.row.add({
                "docmnt_type": temp_code,
                "docmnt_type_descr": "<input class='form-control' maxlength='50'  placeholder ='Enter Description' id='txtb_description' ng-model='txtb_description' />",
                "IsActive": '1'
            }).draw(false);

            $("#txtb_description").focus();
        }

    }
    //************************************// 
    //*** Delete Row              
    //**********************************// 
    s.btn_cancel_row = function (row_index) {
        if (s.saveMode == "ADD") {
            s.newRow = 0;
            s.DocType_Data = s.DocType_Data.delete(row_index);
            s.DocType_Table.fnClearTable();
            if (s.DocType_Data.length != 0) {
                s.DocType_Table.fnAddData(s.DocType_Data);
            }
            s.SaveOpen = false;
        }
        else if (s.saveMode == "EDIT") {
            s.newRow = 0;
            h.post("../cMainPage/Initialize").then(function (d) {
                if (d.data.message == "success") {
                    s.DocType_Data = d.data.DocType
                    d.data.DocType.refreshTable('DocType_Table', '');
                    s.SaveOpen = false;
                }
                else {
                    swal(d.data.message, { icon: "warning", });
                }
            });
        }
    }
    //************************************// 
    //*** Delete Record              
    //**********************************// 
    s.btn_del_row = function (row_index) {
        swal({
            title: "Are you sure to delete this record?",
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,

        })
            .then(function (willDelete) {
                if (willDelete) {
                    h.post("../cMainPage/Delete", {
                        docmnt_type: s.DocType_Data[row_index].docmnt_type
                    }).then(function (d) {
                        if (d.data.message == "success") {

                            s.DocType_Data = s.DocType_Data.delete(row_index);
                            s.DocType_Table.fnClearTable();
                            if (s.DocType_Data.length != 0) {
                                s.DocType_Table.fnAddData(s.DocType_Data);
                            }
                            swal("Your record has been deleted!", { icon: "success", });
                        }
                        else {
                            swal("Data already deleted by other user/s!", { icon: "warning", });
                            s.datalistgrid = s.datalistgrid.delete(row_index);
                            s.DocType_Data = d.data.DocType
                            d.data.DocType.refreshTable('DocType_Table', '');
                        }
                    })
                }
            });
    }

    Array.prototype.delete = function (code) {
        return this.filter(function (d, k) {
            return k != code
        })
    }


    Array.prototype.delete2 = function (code) {
        console.log(code)
        return this.filter(function (d, k) {
            
            return d.doc_ctrl_nbr != code
        })
    }


    //-----------------UPDATE BY JADE -------------------------------------------------------------
    /* Formatting function for row details - modify as you need */
    function format(d) {

        // `d` is the original data object for the row
        return '<table class="no-border" style="padding:0px !important;min-height:10px !important" id="table_show_details"> ' +
            '<tr>' +
            '<td style="width:30% !important;padding:0px 0px 0px 10px">Document Status:</td>' +
            '<td style="padding:0px">' + d.document_status_descr + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td  style="width:30% !important;padding:0px 0px 0px 10px">Document Remarks </td>' +
            '<td style="padding:0px">' + d.doc_remarks + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="width:30% !important;padding:0px 0px 0px 10px">Payroll Template :</td>' +
            '<td style="padding:0px">' + d.payrolltemplate_descr + '</td>' +
            '</tr>' +
             '<tr>' +
            '<td style="width:30% !important;padding:0px 0px 0px 10px">Payroll Year :</td>' +
            '<td style="padding:0px">' + d.payroll_year + '</td>' +
            '</tr>' +
             '<tr>' +
            '<td style="width:30% !important;padding:0px 0px 0px 10px">Payroll Month :</td>' +
            '<td style="padding:0px">' + GETMONTH(d.payroll_month) + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="width:30% !important;padding:0px 0px 0px 10px">OBR Ctrl Nbr :</td>' +
            '<td style="padding:0px">' + d.doc_pbo_nbr + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="width:30% !important;padding:0px 0px 0px 10px">Fund Code :</td>' +
            '<td style="padding:0px">' + d.doc_fund_subcode + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td  style="width:30% !important;padding:0px 0px 0px 10px">Voucher Ctrl Nbr :</td>' +
            '<td style="padding:0px">' + d.doc_voucher_nbr + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td  style="width:30% !important;padding:0px 0px 0px 10px">Total Net Pay:</td>' +
            '<td style="padding:0px"> ' + currency(d.net_pay) + ' </td>' +
            '</tr>' +
            '<tr>' +
            '<td  style="width:30% !important;padding:0px 0px 0px 10px">Gross Pay :</td>' +
            '<td style="padding:0px">' + currency(d.gross_pay) + '</td>' +
            '</table>';
    }

    $('#torecieve tbody').on('click', 'span.details-control', function () {
        var tr = $(this).closest('tr');
        var row = $('#torecieve').DataTable().row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }

    });

    $('#torelease tbody').on('click', 'span.details-control', function () {
        var tr = $(this).closest('tr');
        var row = $('#torelease').DataTable().row(tr);
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });

    //$('#torelease tbody').on('click', 'span.details-control', function () {
    //    var tr = $(this).closest('tr');
    //    var row = $('#torelease').DataTable().row(tr);
    //    if (row.child.isShown()) {
    //        // This row is already open - close it
    //        row.child.hide();
    //        tr.removeClass('shown');
    //    }
    //    else {
    //        // Open this row
    //        row.child(format(row.data())).show();
    //        tr.addClass('shown');
    //    }
    //});

    //s.btn_show_details = function (table_id, row_index) {
    //    // Add event listener for opening and closing details
    //    $('#' + table_id + ' tbody').on('click', 'span.details-control', function () {
    //        var tr = $(this).closest('tr');
    //        var row = $('#' + table_id + ' ').DataTable().row(tr);

    //        if (row.child.isShown()) {
    //            // This row is already open - close it
    //            row.child.hide();
    //            tr.removeClass('shown');
    //        }
    //        else {
    //            // Open this row
    //            row.child(format(row.data())).show();
    //            tr.addClass('shown');

    //        }

    //    });
    //}


    s.btn_search_document = function () {
        
        h.post("../cMainPage/RetriveDocumentSearch",
            {
                p_search_type: $('#ddl_docs_type option:selected').val() ,
                p_search_text: s.txtb_search_doc_descr
            }).then(function (d) {
              
                if (d.data.message == "success")
                {
                    s.search_docs_Data = d.data.search_docs_data;
                    s.search_docs_Data.refreshTable('search_docs_Table', '');

                    $("#search_docs_modal").modal({ keyboard: false, backdrop: "static" })
                }
                else
                {
                    swal(d.data.message, { icon: "warning" })
                }
            })

    }


    function format_search(d) {
        // `d` is the original data object for the row
        return '<table class="no-border" style="padding:0px !important;min-height:10px !important" > ' +
            '<tr>' +
            '<td style="width:30% !important;padding:0px 0px 0px 10px">Payroll Template </td>' +
            '<td style="padding:0px !important">:</td>' +
            '<td style="padding:0px">' + d.payrolltemplate_descr + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="width:30% !important;padding:0px 0px 0px 10px">OBR Ctrl Nbr </td>' +
            '<td style="padding:0px !important">:</td>' +
            '<td style="padding:0px">' + d.doc_pbo_nbr + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td  style="width:30% !important;padding:0px 0px 0px 10px">Voucher Ctrl Nbr</td>' +
            '<td style="padding:0px !important">:</td>' +
            '<td style="padding:0px">' + d.doc_voucher_nbr + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td  style="width:30% !important;padding:0px 0px 0px 10px">Total Net Pay</td>' +
            '<td style="padding:0px !important">:</td>' +
            '<td style="padding:0px">' + currency(d.net_pay) + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td  style="width:30% !important;padding:0px 0px 0px 10px">Gross Pay </td>' +
            '<td style="padding:0px !important">:</td>' +
            '<td style="padding:0px">' + currency(d.gross_pay) + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td  style="width:30% !important;padding:0px 0px 0px 10px">Document Date Time </td>' +
            '<td style="padding:0px !important">:</td>' +
            '<td style="padding:0px">' + moment(d.doc_dttm).format("YYYY-MM-DD hh:mm:ss"); + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td  style="width:30% !important;padding:0px 0px 0px 10px">Document Remarks </td>' +
            '<td style="padding:0px !important">:</td>' +
            '<td style="padding:0px">' + d.doc_remarks + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td  style="width:30% !important;padding:0px 0px 0px 10px">Document Type </td>' +
            '<td style="padding:0px !important">:</td>' +
            '<td style="padding:0px">' + d.docmnt_type_descr + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td  style="width:30% !important;padding:0px 0px 0px 10px">Route To  </td>' +
            '<td style="padding:0px !important">:</td>' +
            '<td style="padding:0px">' + d.routed_2_descr + '</td>' +
            '</tr>' +
            '</table>';
    }
    
        // Add event listener for opening and closing details
    $('#search_docs_table tbody').on('click', 'span.details-control', function () {
            var tr  = $(this).closest('tr');
            var row = $('#search_docs_table').DataTable().row(tr);

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
                row.child(format_search(row.data())).show();
                tr.addClass('shown');
            }

        });
    
    //s.btn_show_details_search = function (table_id, row_index) {
    //    // Add event listener for opening and closing details
    //    $('#' + table_id + ' tbody').on('click', 'span.details-control', function () {
    //        var tr = $(this).closest('tr');
    //        var row = $('#' + table_id + ' ').DataTable().row(tr);

    //        if (row.child.isShown()) {
    //            // This row is already open - close it
    //            row.child.hide();
    //            tr.removeClass('shown');
    //        }
    //        else {
    //            // Open this row
    //            row.child(format_search(row.data())).show();
    //            tr.addClass('shown');
    //        }

    //    });
    //}


    s.ddl_employment_type_select = function () {
        h.post("../cMainPage/RetrieveTemplate_Search",
        {
            par_employment_type: s.ddl_employment_type
        }).then(function (d) {

            s.payrolltemplate_list = d.data.data;

        })
    }

    s.btn_search_docs = function ()
    {
        $("#collapseOne1").removeClass("collapse")
        $('#id_modal_search_docs').modal({ keyboard: false, backdrop: "static" })


    }


    //***********************************//
    //***Print-Button-on-Grid*****VJA***//
    //***********************************// 
    s.btn_ca_link_action = function (lst, table_data) {

        if (s[table_data][lst].with_data_link == "Y") {
            h.post("../cMainPage/RetrieveCALink", { p_doc_ctrl_nbr: s[table_data][lst].doc_ctrl_nbr }).then(function (d) {
                
                if (d.data.message == "success") {
                    
                    s.CA_Link_Data = d.data.sp_document_tracking_tbl_CA_link_list;
                    s.CA_Link_Data.refreshTable('CA_Link_Table', '');
                    
                    $("#ca_link_modal").modal({ keyboard: false, backdrop: "static" })
                }
                else {
                    swal(d.data.message, { icon: "warning" })
                }
            })
        } else {
            swal("No Data Link from Cash Advance", { icon: "warning" })
        }
        
    }


    s.btn_print_history_grid = function (lst, table_data)
    {
        var controller  = "Reports";
        var action      = "Index";
        var ReportName  = "CrystalReport";
        var SaveName    = "Crystal_Report";
        var ReportType  = "inline";
        var sp          = "";
        var parameters  = "";
        var docmnt_type = s[table_data][lst].docmnt_type_source.toString().split('-')[0];
        sp          = "sp_edocument_trk_tbl_history";
        parameters  = "p_doc_ctrl_nbr," + s[table_data][lst].doc_ctrl_nbr + ",p_docmnt_type," + docmnt_type;
        ReportPath  = "~/Reports/cryDocTracking/cryDocsHistory.rpt";
        sp          = "sp_edocument_trk_tbl_history," + parameters;

        
        var iframe = document.getElementById('iframe_print_preview');
        var iframe_page = $("#iframe_print_preview")[0];

        iframe.style.visibility = "hidden";

        s.embed_link = "../Reports/CrystalViewer.aspx?Params=" + ""
            + "&ReportName=" + ReportName
            + "&SaveName=" + SaveName
            + "&ReportType=" + ReportType
            + "&ReportPath=" + ReportPath
            + "&id=" + sp;

        if (!/*@cc_on!@*/0)
        { 
            iframe.onload = function () {
                iframe.style.visibility = "visible";
                $("#modal_generating_remittance").modal("hide")

            };
        }
        else if (iframe_page.innerHTML()) {
            // get and check the Title (and H tags if you want)
            var ifTitle = iframe_page.contentDocument.title;
            if (ifTitle.indexOf("404") >= 0) {
                swal("You cannot Preview this Report", "There something wrong!", { icon: "warning" });
                iframe.src = "";

                s.loading_r = false;
            }
            else if (ifTitle != "") {
                swal("You cannot Preview this Report", "There something wrong!", { icon: "warning" });
                iframe.src = "";

                s.loading_r = false;
                $('#print_preview_modal').modal("hide");
            }
        }
        else {
            iframe.onreadystatechange = function () {
                if (iframe.readyState == "complete") {
                    iframe.style.visibility = "visible";

                }
            };
        }

        s.loading_r = false;

        iframe.src = s.embed_link;

        $("#print_preview_modal").modal({ keyboard: false, backdrop: "static" });

        //h.post("../cMainPage/RetrieveDocHistory", {

        //    par_doc_ctrl_nbr:s[table_data][lst].doc_ctrl_nbr
        //}).then(function (d) {

        //    if (d.data.message == "success")
        //    {
        //        var controller = "Reports"
        //        var action = "Index"
        //        var ReportName = "CrystalReport"
        //        var SaveName = "Crystal_Report"
        //        var ReportType = "inline"

        //        var ReportPath = "~/Reports/"
        //        var sp = ""
        //        var parameters = ""
               
        //        var docmnt_type = s[table_data][lst].docmnt_type_source.toString().split('-')[0]
               
        //        sp = "sp_edocument_trk_tbl_history";
        //        parameters = "p_doc_ctrl_nbr," + s[table_data][lst].doc_ctrl_nbr + ",p_docmnt_type," + docmnt_type
        //        ReportPath = ReportPath + "cryDocTracking/cryDocsHistory.rpt"


        //        location.href = "../" + controller + "/" + action + "?ReportName=" + ReportName
        //            + "&SaveName=" + SaveName
        //            + "&ReportType=" + ReportType
        //            + "&ReportPath=" + ReportPath
        //            + "&Sp=" + sp + "," + parameters
        //    } else {
        //        swal("No Data Found !", "", "warning")
        //    }

        //})

    }

    function loading(action) {
        $("#common_loading_modal").modal(action)
    }

    function trymeFunc() {
        alert("wejqrdjqlkjq");
    }

    function todate(d)
    {
        let unix_timestamp = 1549312452
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        //var date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp
        //var hours = date.getHours();
        // Minutes part from the timestamp
        //var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        //var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        //var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

      
        
        var date = new Date(d * 1000);
        return date;
        
    }
    s.receiveDTR = function ()
    {
        cs.spinnerAdd("receivedtr", "fa-barcode")
        $("#btn_transmittal_btn").addClass("hidden")
        $("#transmittal_date").val("")
        s.transmittal_date = ""
        $("#transmittal_dept_name").val("")
        s.transmittal_dept_name = ""
        s.transmittal_requested_by = ""
        $("#transmittal_requested_by").val("")
        s.transmittal_tbl.fnClearTable();
        s.document_transmittal_tbl = []

         h.post("../cMainPage/transmittalLink").then(function (d) {
             s.document_transmittal_tbl = d.data.sp_dtr_transmittal_hdr_tbl_list_ATS
               $("#itcd_doc_info").modal("show")
              /*document.getElementById("it_control_nbr").focus();*/
               cs.spinnerRemove("receivedtr", "fa-barcode")
             
        })

      
    }

    s.scan_transmittal_ctrl_nbr = function (transmittal_nbr) {

        var dtl_transmittal = []
       
        if (transmittal_nbr.length == 10)
        {
          

            
            var transmittal_data = s.document_transmittal_tbl.filter(function (d) {
                return d.transmittal_nbr == transmittal_nbr
            })
            
            if (transmittal_data.length > 0) {
                dtl_transmittal = transmittal_data

                $("#lbl_transmittal").addClass("hidden")

                $("#transmittal_date").val(moment(dtl_transmittal[0].transmittal_date).format("YYYY-MM-DD"))
                s.transmittal_date = moment(dtl_transmittal[0].transmittal_date).format("YYYY-MM-DD")
                $("#transmittal_dept_name").val(dtl_transmittal[0].department_name1)
                s.transmittal_dept_name = dtl_transmittal[0].department_name1
                s.transmittal_requested_by = dtl_transmittal[0].employee_name
                $("#transmittal_requested_by").val(dtl_transmittal[0].employee_name)


                h.post("../cMainPage/Retrieve_TransmittalDetails",
                    {
                        par_transmittal_nbr: dtl_transmittal[0].transmittal_nbr
                    }).then(function (d) {
                        if (d.data.message == "Success") {
                            $("#btn_transmittal_btn").removeClass("hidden")
                            if (d.data.sp_dtr_transmittal_dtl_tbl_list_ATS.length > 0) {

                                s.transmittal_tbl.fnClearTable();
                                s.transmittal_tbl.fnAddData(d.data.sp_dtr_transmittal_dtl_tbl_list_ATS);

                            }
                            else {
                                s.transmittal_tbl.fnClearTable();
                            }

                        } else {
                            swal("No Data Found")
                            $("#btn_transmittal_btn").addClass("hidden")
                        }

                    })

            }

            else {
                $("#transmittal_date").val("")
                s.transmittal_date = ""
                $("#transmittal_dept_name").val("")
                s.transmittal_dept_name = ""
                s.transmittal_requested_by = ""
                $("#transmittal_requested_by").val("")
                s.transmittal_tbl.fnClearTable();
                dtl_transmittal = []
                transmittal_data = []
                $("#lbl_transmittal").removeClass("hidden")
                s.innertext1 = "Transmittal control number not found!"
                $("#btn_transmittal_btn").addClass("hidden")
            }


            

           

        }
    }

    s.btn_received_transmittal = function () {


        h.post("../cMainPage/UpdateTransmittalStatus",
            {
                par_transmittal_nbr: $("#transmittal_ctrl_nbr").val()
            }).then(function (d) {
                if (d.data.message == "success") {
                    swal("Successfully Received!", { icon: "success", });

                    s.document_transmittal_tbl = s.document_transmittal_tbl.remove($("#transmittal_ctrl_nbr").val(), "transmittal_nbr");
                    $("#transmittal_ctrl_nbr").val("")
                    s.transmittal_ctrl_nbr = ""
					$("#transmittal_date").val("")
                    s.transmittal_date = ""
                    $("#transmittal_dept_name").val("")
                    s.transmittal_dept_name = ""
                    s.transmittal_requested_by = ""
                    $("#transmittal_requested_by").val("")
                    s.transmittal_tbl.fnClearTable();
                    dtl_transmittal = []
                    transmittal_data = []

                } else
                {
                    swal("Unable to received this document!")

                }

            })
    }
    function filterItems(arr, query) {

        return arr.filter(function (el) {
            return el.transmittal_nbr
        })
    }

    s.elEmpty2 = function(type, data) {
        var val = $(type + data).val();
        if (val.trim() == null || val.trim() == "" || val.trim() == undefined) {
            return true
        }
        else {
            return false
        }

    }
    s.required = function (n) {
        $("#" + n).removeClass("f-Border")
        $("#" + n).css({
            "border-color": "red",
            "border-width": "1px",
            "border-style": "solid"
        })
        $("." + n).removeClass("hidden")

    }
    s.notrequired = function(n) {
        $("#" + n).css({
            "border": "none"
        })
        $("#" + n).addClass("f-Border")
        $("." + n).addClass("hidden")
    }
    s.whichIsEmpty = function (id) {
       
        var retval = 0;
        var i_key = Object.keys(s[id])
        var i_val = Object.values(s[id])
        for (var x = 0; x < i_key.length; x++) {

            if (s.elEmpty(i_val[x])) {
                s.required(i_key[x])
                retval = retval + 1
            }
            else {
                s.notrequired(i_key[x]);
            }
        }
        return retval == 0 ? true : false;
    }
    s.falseIfempty = function(id) {

        if (s.elEmpty2("#", id)) {
            s.required(id)
            return false
        }
        else {

            s.notrequired(id);
            return true
        }

    }
    
    var lessThan10LeadingZero = function(data) {
        if(data < 10){
            return "0" + data.toString();
        }
        else{
            return data.toString();
        }
    }

    s.validDate = function () {
       
        var d8 = new Date();
        var dd = lessThan10LeadingZero(d8.getDate())
        var mm = lessThan10LeadingZero((d8.getMonth() + 1))
        var yy = d8.getFullYear()
        var date = yy + '-' + mm + '-' + dd
       
        return date
    }
    s.validDateWTime = function () {

        var d8 = new Date();
        var dd = lessThan10LeadingZero(d8.getDate())
        var mm = lessThan10LeadingZero((d8.getMonth() + 1))
        var yy = d8.getFullYear()
        var hr = d8.getHours()
        var min = d8.getMinutes()
        var sec = d8.getSeconds()
        var h = s.ampmtime(hr)
        var date = yy + '-' + mm + '-' + dd + ' ' + h.hour + ':' + min + ':' + sec + ' ' + h.meridiem

        return date
    }
    s.ampmtime = function (hr) {

        var st = 12

        var retval = {
            hour: "",
            meridiem:""
        }
        if (hr < 12) {

            for (var x = 0; x <= 12; x++) {
                if (x == hr) {
                    retval.hour = lessThan10LeadingZero(x)
                    retval.meridiem = "AM"
                    break;
                }
            }
        }
        if(hr >= 12)
        {
            var i = 0
            for (var x = st; x <= 24; x++)
            {
                if(x == hr)
                {
                    retval.hour = lessThan10LeadingZero(i)
                    retval.meridiem = "PM"
                    break;
                }
                i++;
            }
        }

        return retval
    }


    //***********************************************************//
    //***VJA - 2020-10-29 - Button for Open Modal - CAFOA
    //***********************************************************// 
    s.CAFOA_click = function (D)
    {
        $('#btn_cafoa').attr('disabled',true)
        $('#cafoa_icn').attr('disabled', true)
        $('#cafoa_icn').removeClass('fa-newspaper-o');
        $('#cafoa_icn').addClass('fa-spinner fa-spin');
        
        s.payroll_registry_descr = "";
        s.payroll_registry_nbr   = "";
        s.payroll_year           = "";

        s.payroll_registry_descr = s.data_vl.payroll_registry_descr
        s.payroll_registry_nbr   = s.data_vl.doc_ctrl_nbr
        s.payroll_year           = s.data_vl.payroll_year
        h.post("../cMainPage/Retrieve_CAFOA",
            {
                par_payroll_year          : s.data_vl.payroll_year
                , par_payroll_registry_nbr: s.data_vl.doc_ctrl_nbr
                , par_payrolltemplate_code: s.data_vl.payrolltemplate_code

            }).then(function (d)
            {
                if (d.data.message == "Success") {
                    s.Cafoa_list = d.data.data.refreshTable('Cafoa_table', '');
                    $("#cafoa_modal").modal({ keyboard: false, backdrop: "static" })
                    $('#btn_cafoa').removeAttr('disabled')
                    $('#cafoa_icn').removeClass('fa-spinner fa-spin');
                    $('#cafoa_icn').addClass('fa-newspaper-o');
                } else
                {
                    swal("No Data Found")
                    $('#btn_cafoa').removeAttr('disabled')
                    $('#cafoa_icn').removeClass('fa-spinner fa-spin');
                    $('#cafoa_icn').addClass('fa-newspaper-o');
                }
                
            })
    }
    //***********************************************************//
    //***VJA - 2020-10-29 - Initialized List - CAFOA
    //***********************************************************// 
    var Init_CAFOA_List = function (par_data) {
        s.Cafoa_list = par_data;
        s.Cafoa_table = $('#cafoa_datalist_grid').dataTable(
            {
                data: s.Cafoa_list,
                sDom: 'rt<"bottom"p>',
                pageLength: 10,
                columns: [
                    {
                        "mData": null,
                        "mRender": function (data, type, full, row) {
                            return "<span class='details-control' style='float:left;' >"
                        }
                    },
                    {
                        "title": "FUNCTION",
                        "mData": "function_code",
                        "mRender": function (data, type, full, row) {
                            return " <span class='text-center btn-block' >" + data + " </span>"
                        }
                    },

                    {
                        "title": "ALLOTMENT",
                        "mData": "allotment_code",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-right btn-block' >" + data + "</span>"
                        }
                    },
                    {
                        "title": "ACCOUNT CODE",
                        "mData": "account_code",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-center btn-block' >" + data + "</span>"
                        }
                    },
                    {
                        "title": "AMOUNT",
                        "mData": "account_amt",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-right btn-block' >" + data + "</span>"
                        }
                    },
                    {
                        "title": "ACTIONS",
                        "mData": null,
                        "bSortable": false,
                        "mRender": function (data, type, full, row) {

                            return '<center><div class="btn-group">' +
                                '<button type="button" class="btn btn-success btn-xs" ng-click="btn_edit_row_cafoa(' + row["row"] + ')" data-toggle="tooltip" data-placement="top" title="Edit">  <i class="fa fa-edit"></i></button >' +
                                '<button type="button" class="btn btn-danger btn-xs"  ng-click="btn_delete_row_cafoa(' + row["row"] + ')"  data-toggle="tooltip" data-placement="top" title="Delete"> <i class="fa fa-trash"></i></button>' +
                                '</div></center>';

                        }
                    }

                ],
                "createdRow": function (row, data, index) {
                    $(row).addClass("dt-row");
                    $compile(row)($scope);  //add this to compile the DOM
                },

            });

        $("div.toolbar").html('<b>Custom tool bar! Text/images etc.</b>');
    }

    //***********************************************************//
    //***VJA - 2020-10-29 - Add Data - CAFOA
    //***********************************************************// 
    s.btn_add_cafoa = function ()
    {
        s.txtb_allotment_code       = "";
        s.ddl_function_code         = "";
        s.txtb_account_code         = "";
        s.txtb_account_short_title  = "";
        s.txtb_account_amount       = "";
        s.txtb_seq_no               = "";
        
        h.post("../cMainPage/GetLastRow", {
            par_payroll_year            : s.payroll_year,
            par_payroll_registry_nbr    : s.payroll_registry_nbr
        }).then(function (d)
        {   
            s.txtb_seq_no           = d.data.last_row
            s.Add_edit_mode_CAFOA   = "ADD";
            s.CAFOA_Hdr_descr       = "Add New Record"
            $("#cafoa_modal_add_edit").modal({ keyboard: false, backdrop: "static" })
        })
    }
    //***********************************************************//
    //***VJA - 2020-10-29 - Edit/Update Data - CAFOA
    //***********************************************************//
    s.btn_edit_row_cafoa = function (row_id)
    {
        $('#btn_add_edit_save').attr('ngx-data', row_id);

        s.txtb_allotment_code       = "";
        s.ddl_function_code         = "";
        s.txtb_account_code         = "";
        s.txtb_account_short_title  = "";
        s.txtb_account_amount       = "";
        s.txtb_seq_no               = "";

        s.txtb_allotment_code      = s.Cafoa_list[row_id].allotment_code
        s.ddl_function_code        = s.Cafoa_list[row_id].function_code
        s.txtb_account_code        = s.Cafoa_list[row_id].account_code
        s.txtb_account_short_title = s.Cafoa_list[row_id].account_short_title
        s.txtb_account_amount      = s.Cafoa_list[row_id].account_amt
        s.txtb_seq_no              = s.Cafoa_list[row_id].seq_nbr

        s.Add_edit_mode_CAFOA = "EDIT";
        s.CAFOA_Hdr_descr     = "Edit Existing Record"
        $("#cafoa_modal_add_edit").modal({ keyboard: false, backdrop: "static" })
    }
    //***********************************************************//
    //***VJA - 2020-10-29 - Edit/Update Data - CAFOA
    //***********************************************************//
    s.btn_add_edit_save = function ()
    {

        var data =
        {

            payroll_year            : s.payroll_year
            , payroll_registry_nbr  : s.payroll_registry_nbr
            , seq_nbr               : s.txtb_seq_no
            , function_code: s.ddl_function_code
            , allotment_code: s.txtb_allotment_code
            , account_code: s.txtb_account_code
            , account_short_title: s.txtb_account_short_title
            , account_amt: $('#txtb_account_amount').val().replace(',', '').replace(',', '').replace(',', '')

        };
        console.log(data)
        if (s.validation_cafoa())
        {
            if (s.Add_edit_mode_CAFOA == "ADD")
            {
                $('#i_save_cafoa').removeClass('fa-save');
                $('#i_save_cafoa').addClass('fa-spinner fa-spin');
                h.post("../cMainPage/SaveFromDatabase", { data: data }).then(function (d) {
                    if (d.data.message == "success")
                    {
                        data.payroll_year			= s.payroll_year    
                        data.payroll_registry_nbr	= s.payroll_registry_nbr  
                        data.seq_nbr				= s.txtb_seq_no   
                        data.function_code			= s.ddl_function_code
                        data.allotment_code			= s.txtb_allotment_code     
                        data.account_code			= s.txtb_account_code       
                        data.account_short_title	= s.txtb_account_short_title       
                        data.account_amt			= s.txtb_account_amount
                        data.function_name          = $('#ddl_function_code option:selected').text()
                    
                        s.Cafoa_list.push(data)
                        s.Cafoa_table.fnClearTable();
                        s.Cafoa_table.fnAddData(s.Cafoa_list);
                        for (var x = 1; x <= $('#cafoa_datalist_grid').DataTable().page.info().pages; x++) {
                            if (get_page(s.seq_nbr) == false) {
                                s.Cafoa_table.fnPageChange(x);
                            }
                            else {
                                break;
                            }
                        }

                        $('#cafoa_modal_add_edit').modal("hide");
                        swal("Your record has been saved!", d.data.message_oth, { icon: "success" });
                    } else {
                        swal(d.data.message, d.data.message_oth, { icon: "error", });
                    }

                    $('#i_save_cafoa').addClass('fa-save');
                    $('#i_save_cafoa').removeClass('fa-spinner fa-spin');
                });
            }
            else if (s.Add_edit_mode_CAFOA == "EDIT")
            {
                $('#i_save_cafoa').removeClass('fa-save');
                $('#i_save_cafoa').addClass('fa-spinner fa-spin');

                h.post("../cMainPage/UpdateFromDatabase", { data: data }).then(function (d) {
                    if (d.data.message == "success") {

                        var index_of_row = $('#btn_add_edit_save').attr('ngx-data');

                        s.Cafoa_list[index_of_row].payroll_year			    = s.payroll_year    
                        s.Cafoa_list[index_of_row].payroll_registry_nbr	    = s.payroll_registry_nbr  
                        s.Cafoa_list[index_of_row].seq_nbr				    = s.txtb_seq_no   
                        s.Cafoa_list[index_of_row].function_code			= s.ddl_function_code
                        s.Cafoa_list[index_of_row].allotment_code			= s.txtb_allotment_code     
                        s.Cafoa_list[index_of_row].account_code			    = s.txtb_account_code       
                        s.Cafoa_list[index_of_row].account_short_title	    = s.txtb_account_short_title       
                        s.Cafoa_list[index_of_row].account_amt			    = s.txtb_account_amount
                        s.Cafoa_list[index_of_row].function_name            = $('#ddl_function_code option:selected').text()
                    
                        s.Cafoa_table.fnClearTable();
                        s.Cafoa_table.fnAddData(s.Cafoa_list);

                        for (var x = 1; x <= $('#cafoa_datalist_grid').DataTable().page.info().pages; x++) {
                            if (get_page(s.txtb_seq_no) == false) {
                                s.Cafoa_table.fnPageChange(x);
                            }
                            else {
                                break;
                            }
                        }

                        $('#cafoa_modal_add_edit').modal("hide");
                        swal("Your record has been saved!", d.data.message_oth, { icon: "success", });

                    }
                    else {
                        swal(d.data.message, d.data.message_oth, { icon: "error", });
                    }

                    $('#i_save_cafoa').addClass('fa-save');
                    $('#i_save_cafoa').removeClass('fa-spinner fa-spin');
                });
            }
        }
    }
    //***********************************************************//
    //*** VJA - 2020-10-29 -  Delete - CAFOA
    //***********************************************************// 
    s.btn_delete_row_cafoa = function (id_ss) {

        swal({
            title: "Are you sure to delete this record?",
            text: "Once deleted, you will not be able to recover this record !",
            icon: "warning",
            buttons: true,
            dangerMode: true,

        })
            .then(function (willDelete) {
                if (willDelete) {
                    h.post("../cMainPage/DeleteFromDatabase",
                        {
                            par_payroll_year            : s.Cafoa_list[id_ss].payroll_year
                            , par_payroll_registry_nbr  : s.Cafoa_list[id_ss].payroll_registry_nbr
                            , par_seq_nbr               : s.Cafoa_list[id_ss].seq_nbr
                        }).then(function (d) {

                            if (d.data.message == "success") {

                                s.Cafoa_list = s.Cafoa_list.remove(s.Cafoa_list[id_ss].seq_nbr, "seq_nbr");
                                if (s.Cafoa_list.length != 0) {
                                    s.Cafoa_table.fnClearTable();
                                    s.Cafoa_table.fnAddData(s.Cafoa_list);
                                } else {
                                    s.Cafoa_table.fnClearTable();
                                }
                                swal("Your record has been deleted!","Current record successfully deleted! ", { icon: "success", });
                            }
                            else {
                                swal(d.data.message, "Data not deleted", "error");
                            }

                        })
                }
            });
    }
    //***********************************************************//
    //*** VJA - 2020-10-29 -  Delete - CAFOA
    //***********************************************************// 
    $('#cafoa_datalist_grid tbody').on('click', 'span.details-control', function () {
        var tr = $(this).closest('tr');
        var row = $('#cafoa_datalist_grid').DataTable().row(tr);
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format_cafoa(row.data())).show();
            tr.addClass('shown');
        }
    });
    //-----------------UPDATE BY JADE -------------------------------------------------------------
    /* Formatting function for row details - modify as you need */
    function format_cafoa(d) {

        // `d` is the original data object for the row
        return '<table class="no-border" style="padding:0px !important;min-height:10px !important" id="table_show_details"> ' +
            '<tr>' +
            '<td style="width:20% !important;padding:0px 0px 0px 10px">Sequence Number:</td>' +
            '<td style="padding:0px">' + d.seq_nbr + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="width:20% !important;padding:0px 0px 0px 10px">Account Short Title:</td>' +
            '<td style="padding:0px">' + d.account_short_title + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="width:20% !important;padding:0px 0px 0px 10px">Function name:</td>' +
            '<td style="padding:0px">' + d.function_name + '</td>' +
            '</tr>' +
            '</table>';
    }
    //***********************************//
    //***VJA - 2020-04-08 - Remove Function****//
    //***********************************// 
    Array.prototype.remove = function (code, prop) {
        return this.filter(function (d) {
            return d[prop] != code
        })
    }

    s.validation_cafoa = function ()
    {
        cs.notrequired3("ddl_function_code")
        cs.notrequired3("txtb_allotment_code")
        cs.notrequired3("txtb_account_code")
        cs.notrequired3("txtb_account_amount")
        cs.notrequired3("txtb_account_short_title")
        var return_val = true;

        if (s.ddl_function_code == "") {
            cs.required3("ddl_function_code", "Required Field")
            return_val = false;
        } 
        if (s.txtb_allotment_code == "") {
            cs.required3("txtb_allotment_code", "Required Field")
            return_val = false;
        }
        if (s.txtb_account_code == "") {
            cs.required3("txtb_account_code", "Required Field")
            return_val = false;
        } 
        if (s.txtb_account_amount == "") {
            cs.required3("txtb_account_amount", "Required Field")
            return_val = false;
        } else if (checkisvalidnumber($('#txtb_account_amount').val()) == false)
        {
            cs.required3("txtb_account_amount", "Invalid Numeric")
            return_val = false;
        }
        if (s.txtb_account_short_title == "") {
            cs.required3("txtb_account_short_title", "Required Field")
            return_val = false;
        } 
        return return_val;
    }
    //************************************************//
    //***VJA - 2020-04-08 - Validation for Nunber****//
    //**********************************************//
    function checkisvalidnumber(i) {
        var regex_spchar = /[^a-zA-Z0-9\s]\,\./;
        var regex_upper = /[A-Z]/;
        var regex_lower = /[a-z]/;
        var istrue = false;

        if (regex_upper.test(i) == true ||
            regex_lower.test(i) == true ||
            regex_spchar.test(i) == true) {
            istrue = false
        } else {
            istrue = true
        }
        return istrue
    }
    //************************************************//
    //***VJA - 2020-04-08 - Report options **********//
    //**********************************************//
    s.btn_print_cafoa = function ()
    {
        s.ddl_reports_cafoa = "3"
        $("#modal_print_option_cafoa").modal({ keyboard: false, backdrop: "static" })
    }
    //************************************************//
    //***VJA - 2020-04-08 - Validation for Nunber****//
    //**********************************************//
    s.btn_print_click_cafoa = function ()
    {
        var controller  = "Reports";
        var action      = "Index";
        var ReportName  = "CrystalReport";
        var SaveName    = "Crystal_Report";
        var ReportType  = "inline";
        var ReportPath  = "~/Reports/";
        var sp          = "";
        var parameters  = "";

        
      


        

        //h.post("../cMainPage/PreviousValuesonPage_cMainPage", {

        //    par_doc_ctrl_nbr: s.doc_ctrl_nbr
        //    , par_ddl_doc_status: s.ddl_doc_status
        //    , par_track_year: s.track_year
        //    , par_track_month: s.track_month
        //    , par_ddl_reports: s.ddl_reports
        //}).then(function (d) { })

        if (s.ddl_reports_cafoa == "1")
        {
            parameters = "par_payroll_year," + s.payroll_year + ",par_payroll_registry_nbr," + s.payroll_registry_nbr + ",par_payrolltemplate_code," + s.data_vl.payrolltemplate_code;
            ReportPath = ReportPath + "cryOtherPayroll/cryOBR/cryOBR.rpt";
            sp = "sp_payrollregistry_obr_rep," + parameters;

            var iframe = document.getElementById('iframe_print_preview');
            var iframe_page = $("#iframe_print_preview")[0];

            iframe.style.visibility = "hidden";

            s.embed_link = "../Reports/CrystalViewer.aspx?Params=" + ""
                + "&ReportName=" + ReportName
                + "&SaveName=" + SaveName
                + "&ReportType=" + ReportType
                + "&ReportPath=" + ReportPath
                + "&id=" + sp;

            if (!/*@cc_on!@*/0) {
                iframe.onload = function () {
                    iframe.style.visibility = "visible";
                    $("#modal_generating_remittance").modal("hide")

                };
            }
            else if (iframe_page.innerHTML()) {
                // get and check the Title (and H tags if you want)
                var ifTitle = iframe_page.contentDocument.title;
                if (ifTitle.indexOf("404") >= 0) {
                    swal("You cannot Preview this Report", "There something wrong!", { icon: "warning" });
                    iframe.src = "";

                    s.loading_r = false;
                }
                else if (ifTitle != "") {
                    swal("You cannot Preview this Report", "There something wrong!", { icon: "warning" });
                    iframe.src = "";

                    s.loading_r = false;
                    $('#print_preview_modal').modal("hide");
                }
            }
            else {
                iframe.onreadystatechange = function () {
                    if (iframe.readyState == "complete") {
                        iframe.style.visibility = "visible";

                    }
                };
            }

            s.loading_r = false;

            iframe.src = s.embed_link;

            $("#print_preview_modal").modal({ keyboard: false, backdrop: "static" });
        }
        else if (s.ddl_reports_cafoa == "2")
        {
            parameters = "par_payroll_year," + s.payroll_year + ",par_payroll_registry_nbr," + s.payroll_registry_nbr + ",par_payrolltemplate_code," + s.data_vl.payrolltemplate_code
            ReportPath = ReportPath + "cryOtherPayroll/cryOBR/cryOBR_CAFOA.rpt"
            sp = "sp_payrollregistry_cafao_rep_new," + parameters;

            var iframe = document.getElementById('iframe_print_preview');
            var iframe_page = $("#iframe_print_preview")[0];

            iframe.style.visibility = "hidden";

            s.embed_link = "../Reports/CrystalViewer.aspx?Params=" + ""
                + "&ReportName=" + ReportName
                + "&SaveName=" + SaveName
                + "&ReportType=" + ReportType
                + "&ReportPath=" + ReportPath
                + "&id=" + sp;

            if (!/*@cc_on!@*/0) {
                iframe.onload = function () {
                    iframe.style.visibility = "visible";
                    $("#modal_generating_remittance").modal("hide")

                };
            }
            else if (iframe_page.innerHTML()) {
                // get and check the Title (and H tags if you want)
                var ifTitle = iframe_page.contentDocument.title;
                if (ifTitle.indexOf("404") >= 0) {
                    swal("You cannot Preview this Report", "There something wrong!", { icon: "warning" });
                    iframe.src = "";

                    s.loading_r = false;
                }
                else if (ifTitle != "") {
                    swal("You cannot Preview this Report", "There something wrong!", { icon: "warning" });
                    iframe.src = "";

                    s.loading_r = false;
                    $('#print_preview_modal').modal("hide");
                }
            }
            else {
                iframe.onreadystatechange = function () {
                    if (iframe.readyState == "complete") {
                        iframe.style.visibility = "visible";

                    }
                };
            }

            s.loading_r = false;

            iframe.src = s.embed_link;

            $("#print_preview_modal").modal({ keyboard: false, backdrop: "static" });
           
        }
        else if (s.ddl_reports_cafoa == "3")
        {
            h.post("../cMainPage/RetrieveReports", {
                par_payroll_year                : s.payroll_year
                , par_payroll_registry_nbr      : s.payroll_registry_nbr
                , par_payrolltemplate_code      : s.data_vl.payrolltemplate_code

            }).then(function (d) {
                if (d.data.message = "success")
                {
                   
                    parameters = "par_payroll_year," + s.payroll_year + ",par_payroll_registry_nbr," + s.payroll_registry_nbr + ",par_payrolltemplate_code," + s.data_vl.payrolltemplate_code;
                    ReportPath = "~/Reports/cryOtherPayroll/cryOBR/cryCAFAO.rpt";
                    sp = "sp_payrollregistry_cafao_rep_new," + parameters;


                    var iframe = document.getElementById('iframe_print_preview');
                    var iframe_page = $("#iframe_print_preview")[0];

                    iframe.style.visibility = "hidden";

                    s.embed_link = "../Reports/CrystalViewer.aspx?Params=" + ""
                        + "&ReportName=" + ReportName
                        + "&SaveName=" + SaveName
                        + "&ReportType=" + ReportType
                        + "&ReportPath=" + ReportPath
                        + "&id=" + sp;

                    if (!/*@cc_on!@*/0) {
                        iframe.onload = function () {
                            iframe.style.visibility = "visible";
                            $("#modal_generating_remittance").modal("hide")

                        };
                    }
                    else if (iframe_page.innerHTML()) {
                        // get and check the Title (and H tags if you want)
                        var ifTitle = iframe_page.contentDocument.title;
                        if (ifTitle.indexOf("404") >= 0) {
                            swal("You cannot Preview this Report", "There something wrong!", { icon: "warning" });
                            iframe.src = "";

                            s.loading_r = false;
                        }
                        else if (ifTitle != "") {
                            swal("You cannot Preview this Report", "There something wrong!", { icon: "warning" });
                            iframe.src = "";

                            s.loading_r = false;
                            $('#print_preview_modal').modal("hide");
                        }
                    }
                    else {
                        iframe.onreadystatechange = function () {
                            if (iframe.readyState == "complete") {
                                iframe.style.visibility = "visible";

                            }
                        };
                    }

                    s.loading_r = false;

                    iframe.src = s.embed_link;

                    $("#print_preview_modal").modal({ keyboard: false, backdrop: "static" });

                } else {
                    swal("No Data Found !", "", "warning")
                }
            })
        }

        
    }

    //**********************************************************//
    //***VJA - 2020-04-08 - Button CAFOA Visible/True False****//
    //********************************************************//
    function ButtonCafoa()
    {
        s.allow_cafoa = false
        if (s.department_cafoa == "03" || // PHRMDO
            s.department_cafoa == "06" || // PBO
            s.department_cafoa == "07" || // PACCO
            s.department_cafoa == "16")   // PEO
        {
            s.allow_cafoa = true
        }
    }

    s.search_in_transmittal = function (value, table)
    {
        //try {
        //    $("#" + table).DataTable().search(value).draw();
        //}
        //catch (err) {
        //    alert(err.message)
        //}
    }

    //**********************************************************//
    //***VJA - 2020-12-15 - Fetch Data Again*******************//
    //********************************************************//
    function FetchDataAgain()
    {
        h.post("../cMainPage/FETCH_DATA", { doc_ctrl_nbr: s.doc_ctrl_nbr }).then(function (d)
        {
            if (d.data.message == "success")
            {
                var dtl = [];
                var t   = "";

                if (d.data.ToReceive != null) //Ang data naa sa to be received
                {
                   
                    t                   = "V";
                    s.list_type         = "V";
                    s.route_sequence    = d.data.ToReceive.route_seq;
                    s.rel_rec_ret       = "Receive";
                    var docctrlnbr      = d.data.ToReceive.doc_ctrl_nbr;
                    dtl                 = d.data.ToReceive;
                    Required_Fields(dtl);
                    s.di.remarks = dtl.doc_remarks;
                    s.data_vl = dtl;
                    s.action_status = "RV";
                    s.Data_Mode(dtl, s.l_len, s.t_len, "V");
                    loading("hide");
                    if (s.doc_ctrl_nbr.substring(0, 2) == "LV")
                    {
                        s.lv_detail = d.data.leave_details;
                        $("#lv-modal").modal({ keyboard: false, backdrop: "static" });
                    }
                    //h.post("../cMainPage/ReturnReleaseRouting", { docctrlnbr: docctrlnbr, par_action: t })
                    //    .then(function (d)
                    //    {
                    //        s.temp_date_serv    = d.data.dt_tm;
                    //        s.change_date       = false;
                    //        s.doc_nbr_list      = d.data.nbr_list;
                    //        var paytrk_auth     = d.data.paytrk_auth;
                    //        paytrk_authority(paytrk_auth);
                    //        s.action_status             = "RV";
                    //        s.di.payroll_registry_descr = dtl.payroll_registry_descr;
                    //        $("#dttm").val(d.data.dt_tm);
                    //        s.data_vl                   = dtl;
                    //        Required_Fields(dtl);
                    //        $("#barcode_notfound").addClass("hidden");
                    //        s.allow_receive             = true;
                    //        s.Data_Mode(dtl, s.l_len, s.t_len, "V");
                    //        loading("hide");
                    //        s.di.remarks = dtl.doc_remarks;
                    //        $("#remarks").val(dtl.doc_remarks);

                    //    }
                    //    );

                }
                else if (d.data.ToRelease != null) //Ang data naa sa to be received
                {
                    dtl                 = d.data.ToRelease;
                    s.route_sequence    = dtl.route_seq;
                    s.list_type         = "L";
                    s.rel_rec_ret       = "Release";
                    s.allow_release     = true;
                    s.allow_return      = false;
                    var orig_route      = dtl.department_code;
                    var docctrlnbr      = dtl.doc_ctrl_nbr;
                    h.post("../cMainPage/ReturnReleaseRouting", { docctrlnbr: docctrlnbr, par_action: t })
                        .then(function (d)
                        {
                            s.temp_date_serv    = d.data.dt_tm;
                            s.change_date       = false;
                            var paytrk_auth     = d.data.paytrk_auth;
                            paytrk_authority(paytrk_auth);
                            s.doc_nbr_list              = d.data.nbr_list;
                            s.t_len                     = d.data.return_route.releaseReturnDropDown("T", "");
                            s.l_len                     = d.data.release_route.releaseReturnDropDown("L", dtl.vlt_dept_code);
                            s.action_status             = "RT";
                            s.di.payroll_registry_descr = dtl.payroll_registry_descr;
                            $("#dttm").val(d.data.dt_tm);
                            s.data_vl = dtl;
                            Required_Fields(dtl);
                            $("#barcode_notfound").addClass("hidden");
                            s.Data_Mode(dtl, s.l_len, s.t_len, "L");
                            loading("hide");
                            s.di.remarks = dtl.doc_remarks;
                            $("#remarks").val(dtl.doc_remarks);

                            if (s.doc_ctrl_nbr.substring(0, 2) == "LV") {
                                s.lv_detail = d.data.leave_details;
                                $("#lv-modal").modal({ keyboard: false, backdrop: "static" });
                            }

                        });
                     }
                else
                {
                    loading("hide");
                }
                //s.ToRecieve_Data = d.data.ToReceive.refreshTable('ToRecieve_Table', '');
                //s.ToRelease_Data = d.data.ToRelease.refreshTable('ToRelease_Table', '');
                //var dtl = []
                //var rec = s.ToRecieve_Data.filter(function (d) {
                //    return d.doc_ctrl_nbr == s.doc_ctrl_nbr
                //})
                //var rel = s.ToRelease_Data.filter(function (d) {
                //    return d.doc_ctrl_nbr == s.doc_ctrl_nbr
                //})
                //if (rec.length > 0) {
                //    dtl = rec
                //}
                //else if (rel.length > 0) {
                //    dtl = rel
                //}
                //else if (rec.length <= 0 && rel.length <= 0) {
                //    docctrlnbrNotFound();
                //    loading("hide");
                //    return;
                //}
                //var t = dtl[0].document_status
                //if (t == "V")
                //{
                    //s.list_type = "V"
                    //s.route_sequence = dtl[0].route_seq;

                    //s.rel_rec_ret = "Receive"

                    //var orig_route = dtl[0].route_ctrl_nbr
                    //var docctrlnbr = dtl[0].doc_ctrl_nbr
                    //h.post("../cMainPage/ReturnReleaseRouting", {docctrlnbr: docctrlnbr,par_action:t }).then(function (d) {
                    //    s.temp_date_serv = d.data.dt_tm;
                    //    s.change_date = false;
                    //    s.doc_nbr_list = d.data.nbr_list
                    //    var paytrk_auth = d.data.paytrk_auth
                    //    paytrk_authority(paytrk_auth)
                    //    s.action_status = "RV"
                    //    s.di.payroll_registry_descr = dtl[0].payroll_registry_descr

                    //    $("#dttm").val(d.data.dt_tm);
                    //    s.data_vl = dtl
                    //    Required_Fields(dtl[0])
                    //    $("#barcode_notfound").addClass("hidden")
                    //    s.allow_receive = true
                    //    s.Data_Mode(dtl[0], s.l_len, s.t_len, "V")
                    //    loading("hide")
                    //    s.di.remarks = dtl[0].doc_remarks
                    //    $("#remarks").val(dtl[0].doc_remarks)
                    //})
                //}
                //else if (t == "L" || t == "T")
                //{
                //    s.route_sequence = dtl[0].route_seq;
                //    s.list_type = "L"
                //    s.rel_rec_ret = "Release"
                //    s.allow_release = true;
                //    s.allow_return = false;
                //    var orig_route = dtl[0].department_code
                //    var docctrlnbr = dtl[0].doc_ctrl_nbr
                //    h.post("../cMainPage/ReturnReleaseRouting", { docctrlnbr: docctrlnbr, par_action: t  }).then(function (d) {
                //        s.temp_date_serv = d.data.dt_tm;
                //        s.change_date = false;
                //        var paytrk_auth = d.data.paytrk_auth
                //        s.doc_nbr_list = d.data.nbr_list
                //        paytrk_authority(paytrk_auth)
                //        s.t_len = d.data.return_route.releaseReturnDropDown("T","")
                //       // s.l_len = d.data.release_route.releaseReturnDropDown("L", dtl[0].rlsd_retd_2_route_ctrl_nbr.toString())
                //        s.l_len = d.data.release_route.releaseReturnDropDown("L", dtl[0].vlt_dept_code)
                //        //s.t_len = s.to_return_route.length
                //        //s.l_len = s.to_release_route.length
                //        //s.di.dd_ToRelease_route = dtl[0].rlsd_retd_2_route_ctrl_nbr.toString();
                //        s.action_status = "RT"
                //        s.di.payroll_registry_descr = dtl[0].payroll_registry_descr

                //        $("#dttm").val(d.data.dt_tm);
                //        s.data_vl = dtl
                //        //s.di.dd_ToReturn_route = ""
                //        Required_Fields(dtl[0])
                //        $("#barcode_notfound").addClass("hidden")

                //        s.Data_Mode(dtl[0], s.l_len, s.t_len, "L")

                //        loading("hide")
                //        s.di.remarks = dtl[0].doc_remarks
                //        $("#remarks").val(dtl[0].doc_remarks)


                //    })
                //}
                //else {
                //    loading("hide")
                //}

            }
            else {
                alert(d.data.message)
            }

        })

    }

    //***********************************************************//
    //***VJA - 2020-10-29 - Initialized List - CAFOA
    //***********************************************************// 
    var Init_Transmittal_dtl_List = function (par_data) {
        s.document_transmittal_dtl_tbl = par_data;
        s.transmittal_tbl = $('#transmittal_tbl').dataTable(
            {
                data: s.document_transmittal_dtl_tbl,
                sDom: 'rt<"bottom"p>',
                "order": [[1, "asc"]],
                pageLength: 10,
                columns: [
                    {
                        "mData": "empl_id",
                        "mRender": function (data, type, full, row) {
                            return " <span class='text-center btn-block' >" + data + " </span>"
                        }
                    },

                    {
                        "mData": "employee_name",
                        "mRender": function (data, type, full, row) {
                            return " <span class='text-left btn-block' >" + data + " </span>"
                        }
                    },
                    

                ],
                "createdRow": function (row, data, index) {
                    $(row).addClass("dt-row");
                    $compile(row)($scope);  //add this to compile the DOM
                },

            });

        $("div.toolbar").html('<b>Custom tool bar! Text/images etc.</b>');
    }
})