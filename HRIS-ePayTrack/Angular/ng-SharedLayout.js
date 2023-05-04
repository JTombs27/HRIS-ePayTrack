


ng_ePayTrack_App.filter('jsonDate', ['$filter', function ($filter) {
    return function (input, format) {
        return (input) ? $filter('date')(parseInt(input.substr(6)), format) : '';
    };
}]);


ng_ePayTrack_App.controller("SharedLayoutCtrlr", function ($scope, $http, $filter) {
    var s = $scope
    var h = $http
    s.hideThis = false
    s.controller = "Home"
    s.Action1 = "Index"
    s.Action2 = "About"
    s.Action3 = "Contact"
    var group = new Array()
   
    var init = function ()
    {
        h.post("../cMainPage/UserProfile").then(function (d)
        {
            s.employee_name = d.data.var_employee_name + " - " + d.data.dept.department_short_name;
        })
    }
   

    init();
    
    //function newEl(tag)
    //{
    //    return document.createElement(tag);
    //}
    //function createImageFromRGBdata(rgbData, width, height)
    //{
    //    var mCanvas = newEl('canvas');
    //    mCanvas.width = width;
    //    mCanvas.height = height;
	    
    //    var mContext = mCanvas.getContext('2d');
    //    var mImgData = mContext.createImageData(width, height);
	
    //    var srcIndex=0, dstIndex=0, curPixelNum=0;
	
    //    //for (curPixelNum=0; curPixelNum<width*height;  curPixelNum++)
    //    //{
    //    //    mImgData.data[dstIndex] = rgbData[srcIndex];		// r
    //    //    mImgData.data[dstIndex+1] = rgbData[srcIndex+1];	// g
    //    //    mImgData.data[dstIndex+2] = rgbData[srcIndex+2];	// b
    //    //    mImgData.data[dstIndex+3] = 255; // 255 = 0xFF - constant alpha, 100% opaque
    //    //    srcIndex += 3;
    //    //    dstIndex += 4;
    //    //}
    //    mContext.putImageData(mImgData, 0, 0);
    //    return mCanvas;
    //}


   

   
  

    ////**************************************//
    ////********collapse-expand-menu**********//
    ////**************************************// 
    //s.collapse = function (val, id, hasUrl)
    //{

    //    if (hasUrl == 1) return
    //    var menulink = 0
    //    var menulvl = findMenu(id)[0].menu_level
    //    if(menulvl == 1)
    //    {
    //        group = new Array()
    //        group.push(id)
    //    }
    //    else
    //    {
    //        var p = group.filter(function (d)
    //        {
    //            return d == id
    //        })
    //        if (p == null || p == "") group.push(id)
           
    //    }
    //    angular.forEach(s.MenuList, function (value) {
    //        var active = group.filter(function (d)
    //        {
    //            return d == value.id
    //        })
    //        if (value.id == id)
    //        {

    //            menulink = value.menu_id_link
    //            if (value.isOpen == 0)
    //            {
    //                value.isOpen = 1
    //                h.post("../Menu/expandedAdd", { id: id, menulevel: value.menu_level })

    //                // 2019-12-12 : Update for Menu Active the Selected LI
    //                $('ul#side-menu li.xx').removeClass('active')
    //                var parent_li = $('a#' + id).closest('li')
    //                parent_li.addClass('active')
    //                // 2019-12-12 : Update for Menu Active the Selected LI

    //            }
    //            else {
    //                value.isOpen = 0
    //                h.post("../Menu/expandedRemove", { id: id })
    //            }
    //        }
    //        else
    //        {
    //            if (active != value.id) value.isOpen = 0
    //        }
    //    })
    //}
    ////***********************Functions end*************************************************************//


    ////**************************************//
    ////**************find-menu***************//
    ////**************************************// 
    //var findMenu = function (id)
    //{
    //    return data = s.MenuList.filter(function (d)
    //    {
    //        return d.id == id
    //    })
    //}
    //***********************Functions end*************************************************************//



    //**************************************//
    //****************log-out***************//
    //**************************************// 
     s.logout = function ()
    {
        h.post("../Login/logout").then(function (d)
        {
            if(d.data.success == 1)
            {
                location.href = "../Login/Index"
            }
        })
     }


    //************************************//
    //***       Open Add Modal        ****//
    //************************************//
     s.btn_open_docType_modal = function () {

         $('#docType_modal').modal({ backdrop: 'static', keyboard: false });

     }
    //***********************Functions end*************************************************************//

    //***********************Functions end*************************************************************//


    //**************************************//
    //************location-redirect*********//
    //**************************************// 
    //s.setActive = function (lst)
    //{
        
    //    h.post("../Menu/UserAccessOnPage", { list: lst }).then(function (d) {
    //        console.log(lst)
    //        if(d.data == "success")
    //        {
    //            console.log("../" + lst.id)
    //            location.href = "../" + lst.url_name

    //        }
          
    //    })
    //}

    //s.CheckSession = function () {

    //    h.post("../Login/CheckSessionLogin").then(function (d) {
    //        if (d.data == "expire") {
    //            location.href = "../Login/Index"
    //        }
    //    })

    //}

    //***********************Functions end*************************************************************//

    
})