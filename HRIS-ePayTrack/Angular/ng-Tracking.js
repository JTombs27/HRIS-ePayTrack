ng_ePayTrack_App.controller("cTrackingCtrlr", function (commonScript, $scope, $http, $filter, $compile) {
    var s   = $scope;
    var h   = $http;
    var cs  = commonScript;
    s.ToRecieve_Data = [];

 

    var Init_ToRecieve = function (par_data)
    {

        s.ToRecieve_Data = par_data;

        s.ToRecieve_Table = $('#torecieve').dataTable(
            {
                data: s.ToRecieve_Data,
                sDom: 'rt<"bottom"p>',
                bAutoWidth: false,
                pageLength: 10,
                columns: [
                    {
                        "title": "",
                        "mData": null,
                        "mRender": function (data, type, full, row) {
                            return "<span class='details-control' style='float:left;' ng-click='btn_show_details(" + '"torecieve"' + ")' >"
                        }
                    },
                    {
                        "title": "DOC. CTRL. NBR",
                        "mData": "doc_ctrl_nbr",
                        "mRender": function (data, type, full, row) {
                            return " <span class='text-center' style='padding-right:20%;padding-left:15%'>" + data + " </span>"
                        }
                    },

                    {
                        "title": "DESCRIPTION",
                        "mData": "doc_remarks",
                        "mRender": function (data, type, full, row) {
                            return "<span class='text-left btn-block'>" + data + "</span>"
                        }
                    },

                    {
                        "title": "ACTIONS",
                        "mData": null,
                        "bSortable": false,
                        "mRender": function (data, type, full, row) {

                            return '<center><div class="btn-group">' +
                                '<button type="button" class="btn btn-danger btn-sm action" ng-click="btn_ca_link_action(' + row["row"] + ',' + '\'ToRecieve_Data\'' + ')"   data-toggle="tooltip" data-placement="top" title="With CA Document"> <i class="fa fa-link"></i> </button>' +
                                '<button type="button" class="btn btn-warning btn-sm action" ng-click="btn_print_history_grid(' + row["row"] + ',' + '\'ToRecieve_Data\'' + ')"  data-toggle="tooltip" data-placement="top" title="Document History"> <i class="fa fa-history"></i> </button>' +
                                '</div></center>';
                        }
                    }

                ],
                "createdRow": function (row, data, index) {
                    $(row).addClass("dt-row");
                    $compile(row)($scope);  //add this to compile the DOM
                }
            });

        $("div.toolbar").html('<b>Custom tool bar! Text/images etc.</b>');
    };

    s.btn_showReceive_modal = function () {
        $("#modal_receive").modal({ keyboard: false, backdrop: "static" });
        $("#btn_rcvd").css("display", "none");
        $('#modal_receive').on('shown.bs.modal', function () {
            $('#doc_ctrl_nbr').trigger('focus');
        });
    };
    s.scan_doc_ctrl_nbr = function (action, scan_val) {
        var scanned_length  = scan_val.trim().length;
        var par_doc_type    = "";
        s.payroll_registry_descr = "";
        $('#barcode_notfound').addClass("hidden");
        $("#btn_rcvd").css("display", "none");
        if (scanned_length < 6)
        {
            return;
        }

        if (scanned_length == 6)
        {
            par_doc_type = "PAYROLL";
        }
        else if (scan_val.substring(0, 2) == "LV") {
            par_doc_type = "LV";
        }
        else if (scan_val.substring(0, 2) == "V-") {
            par_doc_type = "VOUCHER";
        }
        else
        {
            par_doc_type = "PAYROLL";
        }

        h.post("../Tracking/ScanDocument", {
            par_doc_ctrl_nbr: scan_val,
            par_scan_action : action,
            par_doc_type    : par_doc_type
        }).then(function (d) {
            if (d.data.scan_details) {
                s.payroll_registry_descr = d.data.scan_details.document_type;
                $("#btn_rcvd").css("display", "block");
                //console.log(d.data.scan_details);
                //console.log(d.data.scan_details.document_type);

            }
            else
            {
                $('#barcode_notfound').removeClass("hidden");
            }
        });

    };

    s.RetreivedTobeReceive = function () {
        h.post("../Tracking/RetrieveTobeReceived").then(function (d)
        {
            if (d.data.tobeReceive.length > 0)
            {
                s.ToRecieve_Table.fnClearTable();
                s.ToRecieve_Table.fnAddData(d.data.tobeReceive);
            }
        });
    };

    function init() {

        Init_ToRecieve([]);
        s.RetreivedTobeReceive();
    }
    init();



 
});