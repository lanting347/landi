var lastScrollTop = $(document).scrollTop();
var firstTabContent = $(".tab-content").eq(0).outerHeight() + 90 -32,
    secondTabContent = firstTabContent + $(".tab-content").eq(1).outerHeight() -32,
	thirdTabContent = secondTabContent + $(".tab-content").eq(2).outerHeight() -32,
	fourthTabContent = thirdTabContent + $(".tab-content").eq(3).outerHeight() -32,
	fifthTabContent = fourthTabContent + $(".tab-content").eq(4).outerHeight() -32;
var arrayTabContent = [90,firstTabContent+32,secondTabContent+32,thirdTabContent+32,fourthTabContent+32];
    
$(function(){
	$(window).scroll(function(){
			var nowScrollTop = $(document).scrollTop();
			//console.log(nowScrollTop);
			if(nowScrollTop<90){   //滚动小于90
				$(".icon-group .list-icon-link").css("display","none");
				$(".tab-content").children(".tab-content-title").children("span").css("visibility","visible");
			}
			if(nowScrollTop<firstTabContent && nowScrollTop>90){changeTabContent(0);}
			else if(nowScrollTop>firstTabContent&&nowScrollTop<secondTabContent){changeTabContent(1);}
			else if(nowScrollTop>secondTabContent&&nowScrollTop<thirdTabContent){changeTabContent(2);}
			else if(nowScrollTop>thirdTabContent&&nowScrollTop<fourthTabContent){changeTabContent(3);}
			else if(nowScrollTop>fourthTabContent&&nowScrollTop<fifthTabContent){changeTabContent(4);}

			// if(nowScrollTop < 200){
			// 	$(".navbar-ld").addClass("topNormal");
			// }
			// else{  				
			// 	if(nowScrollTop>lastScrollTop){
			// 		$(".navbar-ld").removeClass("topNormal").addClass("topNone");
			// 	}
			// 	else{
			// 		$(".navbar-ld").addClass("topNormal").removeClass("topNone");
			// 	}
			// 	lastScrollTop = nowScrollTop;
			// }
		}
	);
    // 点击回到顶部底部事件
    $(".bar-top").click(function(){
    	$(window).scrollTop(0);
    })
    $(".bar-bottom").click(function(){
    	$(window).scrollTop($(document).height()-$(window).height());
    });

	// 点击珠串定位事件
	$(".list-icon-link").click(function(element){
		//console.log($(element.toElement).index()/2);
		$(document).scrollTop(arrayTabContent[$(element.toElement).index()/2]);
		changeTabContent($(element.toElement).index()/2);
	}).hover(function(){
		$(this).next(".list-icon-text").fadeIn(100);
	},function(){
		$(this).next(".list-icon-text").fadeOut(100);
	});

    // 服务表格滑过事件
	$("tbody tr").hover(function(){
		if($(this).hasClass("col-add-add")||$(this).hasClass("col-lunch-choose")) return;
		$(this).children("td").toggleClass("td-hover");
		$(this).children(".rowOne").toggleClass("td-hover");
	},function(){
		if($(this).hasClass("col-add-add")||$(this).hasClass("col-lunch-choose"))	return;
		$(this).children("td").toggleClass("td-hover");
		$(this).children(".rowOne").toggleClass("td-hover");
	});

	// 选择饭店按钮
	$(".thick-title span").click(function(){
		$(".thick-div").css("display","none");
		$(".thick-box").css("display","none");
	});

	// 点击具体饭店
	$(".restaurant a").click(function(){

		if($(this).hasClass("a-active")){
			$(this).toggleClass("a-active");
		}
		else{
			if($(".restaurant .a-active").length >= 3){
				$(".warning").addClass("warning-animation");
				setTimeout(function(){$(".warning").removeClass("warning-animation");},1000);
				return;
			}
			$(this).toggleClass("a-active");
		}		
	});


	// 判断为空
    $("#guest_name,#guest_roomNumber,#guest_contractID,#guest_tel").focus(function(){
    	$(this).removeClass("border-red");
    });

	// 输入房间号
	$(".item-room input").keyup(function(){
		if($(this).val().length >= 4){
			// 请求户型
			//$.ajax({
				// url:'/LD',
				// type:'post',
				// success:function(data){
				// 	console.log(data);
				    // 修改户型
					$(".item-room .fl").eq(1).text("大户型");
					// 修改基本费用值
					$(".col-LE td").eq(2).text("12");
					$(".col-LE td").eq(3).text("12");
					$(".col-LE td").eq(4).text("12");
					$(".col-LE td").eq(5).text("12");
					$(".col-LE td").eq(6).text("12");
					$(".col-LE td").eq(7).text("12");
					$(".col-LE td").eq(8).children("input").removeAttr("checked");
					$(".col-LE td").eq(8).children("input").prop("checked",true);

					$(".col-wash td").eq(1).text("12");
					$(".col-wash td").eq(2).text("12");
					$(".col-wash td").eq(3).text("12");
				// }
			//});
		};
	});
});

// 显示选择饭店窗口
var showChooseRestaurant = function(){
	$(".thick-div").css("display","block");
	$(".thick-box").css("display","block");
}

//选择饭店
var chooseRestaurant = function(){
	var restaurantCount = Number($(".restaurant .a-active").length);
	$(".thick-div").css("display","none");
	$(".thick-box").css("display","none");
	if(restaurantCount == 0) return;

	// 清空餐券
	$(".col-lunch-choose").remove();
	$(".col-lunch").remove();

	$(".col-break").before("<tr class='col-lunch-choose'><td class='title' rowspan='"+ (restaurantCount + 1) +"'>餐券</td>"+
        "<td onclick='showChooseRestaurant();'>重新选择饭店</td><td colspan='8'></td></tr>");
	// 逐条添加饭店
	$(".restaurant .a-active").each(function(){
		$(".col-break").before("<tr class='col-lunch'><td>"+ $(this).text() +"</td>"+
				"<td><input type='text' value='1000'/></td>"+
	            "<td><input type='text' value='1'/></td><td><input type='text' value='1000'/></td>"+
	            "<td><input type='text' value='1'/></td><td><input type='text' value='1'/></td>"+
	            "<td><input type='text' value='无'/></td><td><input type='checkbox'></td><td></td></tr>");
	});

    // 其他费用列数增加
    var nowRowSpan = Number($(".col-park td:nth-child(1)").attr("rowspan"));
	$(".col-park td:nth-child(1)").attr("rowspan",nowRowSpan + restaurantCount);
}

// 增加其他费用项目
var addServiceTr = function(){
	var nowRow = Number($(".col-park td:nth-child(1)").attr("rowspan"));
	$(".col-park td:nth-child(1)").attr("rowspan", nowRow + 1);
	if($(".col-add").length==0){
		$(".col-daily").after("<tr class='col-add'><td colspan='2'><input type='text' value='费用项目'/></td>"+
				"<td><input type='text' value='1000'/></td>"+
	            "<td><input type='text' value='1'/></td><td><input type='text' value='1000'/></td>"+
	            "<td><input type='text' value='1'/></td><td><input type='text' value='1'/></td>"+
	            "<td><input type='text' value='无'/></td><td><input type='checkbox'></td>"+
	            "<td class='operation' onclick='deleteServiceAdd(this)'>删除</td></tr>");
	}
	else{
		$(".col-add:last").after("<tr class='col-add'><td colspan='2'><input type='text' value='费用项目'/></td>"+
				"<td><input type='text' value='1000'/></td>"+
	            "<td><input type='text' value='1'/></td><td><input type='text' value='1000'/></td>"+
	            "<td><input type='text' value='1'/></td><td><input type='text' value='1'/></td>"+
	            "<td><input type='text' value='无'/></td><td><input type='checkbox'></td>"+
	            "<td class='operation' onclick='deleteServiceAdd(this)'>删除</td></tr>");
	}
}

// 删除添加的项目
var deleteServiceAdd = function(element){
	$(element).parent().remove();
}

// 改变珠串样式
var changeTabContent = function(index){
	$(".tab-content").eq(index).children(".tab-content-title").children("span").css("visibility","hidden");
    $(".tab-content").eq(index).prevAll(".tab-content").children(".tab-content-title").children("span").css("visibility","hidden");
    $(".tab-content").eq(index).nextAll(".tab-content").children(".tab-content-title").children("span").css("visibility","visible");

	$(".icon-group .list-icon-link").eq(index).css("display","block").css("display","block").css("background","#ff4d4d");
	$(".icon-group .list-icon-link").eq(index).prevAll("a").css("display","block").css("background","#ccc");
	$(".icon-group .list-icon-link").eq(index).nextAll("a").css("display","none");
}

// 添加租客
var addGuest = function(){
	// 获取租客信息
	var name = $(".tab-content-guest .item-name input").eq(0).val(),
	    checkin = Number($(".tab-content-guest .item-name input[type='checkbox']").is(":checked")),
	    roomID = $(".tab-content-guest .item-room input").eq(0).val(),
	    type = $(".tab-content-guest .item-room input").eq(1).val(),
	    contractID = $(".tab-content-guest .item-tel input").eq(0).val(),
	    tel = $(".tab-content-guest .item-tel input").eq(1).val();

	// 判断必填项不能为空
	if(name == "" || roomID == "" || contractID == "" || tel == ""){
		if(name == ""){
			//console.log("租客姓名为空！");
			$("#guest_name").addClass("border-red");
		}
		if(roomID == ""){
			//console.log("房间号为空！");
			$("#guest_roomNumber").addClass("border-red");
		}
		if(contractID == ""){
			//console.log("合同编号为空！");
			$("#guest_contractID").addClass("border-red");
		}
		if(tel == ""){
			//console.log("联系电话为空！");
			$("#guest_tel").addClass("border-red");
		}
		$(window).scrollTop(0);
		return;
	}

	var company = $(".tab-content-guest .item-company input").eq(0).val(),
		position = $(".tab-content-guest .item-company input").eq(1).val(),
	    guestNumber = $(".tab-content-guest .item-guestnumber input").eq(0).val(),
		timeIn = $(".tab-content-guest .item-time input").eq(0).val(),
		timeOut = $(".tab-content-guest .item-time input").eq(1).val(),
		rent = $(".tab-content-guest .item-car input").eq(0).val(),
		carport = $(".tab-content-guest .item-car input").eq(1).val(),
		remark = $(".tab-content-guest .item-remark input").eq(0).val();

	let guestData = '"guest":{"STR_Name":"'+ name +'","BOOL_Checkin":'+ checkin +',"STR_RommID":"'+ roomID +'","STR_Type":"'+ type +'",'
		    +'"STR_ContractID":"'+ contractID +'","STR_Tel":"'+ tel +'","STR_Company":"'+ company +'",'
		    +'"STR_Position":"'+ position +'","INT_GuestNumber":'+ guestNumber +','
		    +'"STR_TimeIn":"'+ timeIn +'","STR_TimeOut":"'+ timeOut +'","INT_Rent":'+ rent +',"STR_Carport":"'+ carport +'",'
		    +'"STR_Remark":"'+ remark +'"},';



	// 获取业主信息
	var Name = $(".tab-content-owner .item-name input").eq(0).val(),
		Rent = $(".tab-content-owner .item-rent input").eq(0).val(),
		Service = $(".tab-content-owner .item-rent input").eq(1).val(),
		Return = $(".tab-content-owner .item-other input").eq(0).val(),
		Other = $(".tab-content-owner .item-other input").eq(1).val();

	let hostData = '"host":{"STR_Name":"'+ Name +'","INT_Rent":'+ Rent +',"INT_Service":'+ Service +','
		    +'"INT_Return:":'+ Return +',"STR_Other":"'+ Other +'"},';


	// 获取中介信息
	var agentCompany = $(".tab-content-agency .item-company input").eq(0).val(),
		agentFirst = $(".tab-content-agency .item-first input").eq(0).val(),
		agentSecond = $(".tab-content-agency .item-second input").eq(0).val(),
		agentThird = $(".tab-content-agency .item-third input").eq(0).val(),
		agentFourth = $(".tab-content-agency .item-fourth input").eq(0).val(),
		LEFirst = $(".tab-content-agency .item-first input").eq(1).val(),
		LESecond = $(".tab-content-agency .item-second input").eq(1).val(),
		LEThird = $(".tab-content-agency .item-third input").eq(1).val(),
		LEFourth = $(".tab-content-agency .item-fourth input").eq(1).val();

	let internData = '"intern":{"STR_Company":"'+ agentCompany +'","DOU_AgentFirst":'+ agentFirst +',"DOU_AgentSecond":'+ agentSecond +','
		    +'"DOU_AgentThird":'+ agentThird +',"DOU_AgentFourth":'+ agentFourth +',"DOU_LEFirst":'+ LEFirst +','
		    +'"DOU_LESecond":'+ LESecond +',"DOU_LEThird":'+ LEThird +',"DOU_LEFourth":'+ LEFourth +'},';


	// 获取房款收付信息
	var RentNumber = $(".tab-content-housepay .item-rent .item-date input").eq(0).val(),
		RentCycle = $(".tab-content-housepay .item-rent .item-cycle input").eq(0).val(),
		RentWay = $(".tab-content-housepay .item-rent .item-cycle input").eq(1).val(),
		ReturnNumber = $(".tab-content-housepay .item-return .item-date input").eq(0).val(),
		ReturnCycle = $(".tab-content-housepay .item-return .item-cycle input").eq(0).val(),
		BillNumber = $(".tab-content-housepay .item-bill .item-date input").eq(0).val(),
		BillCycle = $(".tab-content-housepay .item-bill .item-cycle input").eq(0).val(),
		BillTime = $(".tab-content-housepay .item-bill .item-cycle input").eq(1).val();

	let rentData = '"balance":{"STR_RentNumber":"'+ RentNumber +'","STR_RentCycle":"'+ RentCycle +'","STR_RentWay":"'+ RentWay +'",'
            +'"STR_ReturnNumber":"'+ ReturnNumber +'","STR_ReturnCycle":"'+ ReturnCycle +'",'
		    +'"STR_BillNumber":"'+ BillNumber +'","STR_BillCycle":"'+ BillCycle +'","STR_BillTime":"'+ BillTime +'"},';	

	// 获取服务信息
	// 网费
	var serviceIntInput = $(".tab-content-service .col-Int input"),
		IntLECharge = serviceIntInput.eq(0).val(),
		IntLECount = serviceIntInput.eq(1).val(),
		IntSPCCharge = serviceIntInput.eq(2).val(),
		IntSPCCount = serviceIntInput.eq(3).val(),
		IntCycle = serviceIntInput.eq(4).val(),
		IntNote = serviceIntInput.eq(5).val(),
		IntGive = Number($(".tab-content-service .col-Int input[type='checkbox']").is(":checked"));

	let IntData = '"DOU_IntLECharge":'+ IntLECharge +',"INT_IntLECount":'+ IntLECount +','
		    +'"DOU_IntSPCCharge":'+ IntSPCCharge +',"INT_IntSPCCount":'+ IntSPCCount+','
		    +'"STR_IntCycle":"'+ IntCycle +'","STR_IntNote":"'+ IntNote +'","BOOL_IntGive":'+ IntGive +',';

    // 能源费
    var serviceResourceInput = $(".tab-content-service .col-resource input"),
	    resourceSelfpay = Number(serviceResourceInput.eq(0).is(":checked")),
		resourceLECharge = serviceResourceInput.eq(1).val(),
		resourceLECount = serviceResourceInput.eq(2).val(),
		resourceSPCCharge = serviceResourceInput.eq(3).val(),
		resourceSPCCount = serviceResourceInput.eq(4).val(),
		resourceCycle = serviceResourceInput.eq(5).val(),
		resourceNote = serviceResourceInput.eq(6).val(),
		resourceGive = Number(serviceResourceInput.eq(7).is(":checked"));

	let resourceData = '"BOOL_resourceSelfpay":'+ resourceSelfpay+','
			+'"DOU_resourceLECharge":'+ resourceLECharge +',"INT_resourceLECount":'+ resourceLECount +','
		    +'"DOU_resourceSPCCharge":'+ resourceSPCCharge +',"INT_resourceSPCCount":'+ resourceSPCCount+','
		    +'"STR_resourceCycle":"'+ resourceCycle +'","STR_resourceNote":"'+ resourceNote +'","BOOL_resourceGive":'+ resourceGive +',';

	// 早餐人数
	var serviceBFInput = $(".tab-content-service .col-breakfast input"),
		breakfastLECharge = serviceBFInput.eq(0).val(),
		breakfastLECount = serviceBFInput.eq(1).val(),
		breakfastSPCCharge = serviceBFInput.eq(2).val(),
		breakfastSPCCount = serviceBFInput.eq(3).val(),
		breakfastCycle = serviceBFInput.eq(4).val(),
		breakfastNote = serviceBFInput.eq(5).val(),
		breakfastGive = Number($(".tab-content-service .col-breakfast input[type='checkbox']").is(":checked"));

	let breakfastData = '"DOU_breakfastLECharge":'+ breakfastLECharge +',"INT_breakfastLECount":'+ breakfastLECount +','
		    +'"DOU_breakfastSPCCharge":'+ breakfastSPCCharge +',"INT_breakfastSPCCount":'+ breakfastSPCCount+','
		    +'"STR_breakfastCycle":"'+ breakfastCycle +'","STR_breakfastNote":"'+ breakfastNote +'","BOOL_breakfastGive":'+ breakfastGive +',';

	// 停车费
	var serviceParkInput = $(".tab-content-service .col-park input"),
		parkLECharge = serviceParkInput.eq(0).val(),
		parkLECount = serviceParkInput.eq(1).val(),
		parkSPCCharge = serviceParkInput.eq(2).val(),
		parkSPCCount = serviceParkInput.eq(3).val(),
		parkCycle = serviceParkInput.eq(4).val(),
		parkNote = serviceParkInput.eq(5).val(),
		parkGive = Number($(".tab-content-service .col-park input[type='checkbox']").is(":checked"));

	let parkData = '"DOU_parkLECharge":'+ parkLECharge +',"INT_parkLECount":'+ parkLECount +','
		    +'"DOU_parkSPCCharge":'+ parkSPCCharge +',"INT_parkSPCCount":'+ parkSPCCount+','
		    +'"STR_parkCycle":"'+ parkCycle +'","STR_parkNote":"'+ parkNote +'","BOOL_parkGive":'+ parkGive +',';

	// 电视费
	var serviceTVInput = $(".tab-content-service .col-tv input"),
		tvLECharge = serviceTVInput.eq(0).val(),
		tvLECount = serviceTVInput.eq(1).val(),
		tvSPCCharge = serviceTVInput.eq(2).val(),
		tvSPCCount = serviceTVInput.eq(3).val(),
		tvCycle = serviceTVInput.eq(4).val(),
		tvNote = serviceTVInput.eq(5).val(),
		tvGive = Number($(".tab-content-service .col-tv input[type='checkbox']").is(":checked"));

	let tvData = '"DOU_tvLECharge":'+ tvLECharge +',"INT_tvLECount":'+ tvLECount +','
		    +'"DOU_tvSPCCharge":'+ tvSPCCharge +',"INT_tvSPCCount":'+ tvSPCCount+','
		    +'"STR_tvCycle":"'+ tvCycle +'","STR_tvNote":"'+ tvNote +'","BOOL_tvGive":'+ tvGive +',';

	// 报刊杂志费
	var serviceNPInput = $(".tab-content-service .col-newspaper input"),
		newspaperLECharge = serviceNPInput.eq(0).val(),
		newspaperLECount = serviceNPInput.eq(1).val(),
		newspaperSPCCharge = serviceNPInput.eq(2).val(),
		newspaperSPCCount = serviceNPInput.eq(3).val(),
		newspaperCycle = serviceNPInput.eq(4).val(),
		newspaperNote = serviceNPInput.eq(5).val(),
		newspaperGive = Number($(".tab-content-service .col-newspaper input[type='checkbox']").is(":checked"));

	let newspaperData = '"DOU_newspaperLECharge":'+ newspaperLECharge +',"INT_newspaperLECount":'+ newspaperLECount +','
		    +'"DOU_newspaperSPCCharge":'+ newspaperSPCCharge +',"INT_newspaperSPCCount":'+ newspaperSPCCount+','
		    +'"STR_newspaperCycle":"'+ newspaperCycle +'","STR_newspaperNote":"'+ newspaperNote +'","BOOL_newspaperGive":'+ newspaperGive +',';

    // 洗衣费
	var clothLECharge = $(".tab-content-service .col-cloth input").eq(0).val(),
		clothLECount = $(".tab-content-service .col-cloth input").eq(1).val(),
		clothSPCCharge = $(".tab-content-service .col-cloth input").eq(2).val(),
		clothSPCCount = $(".tab-content-service .col-cloth input").eq(3).val(),
		clothCycle = $(".tab-content-service .col-cloth input").eq(4).val(),
		clothNote = $(".tab-content-service .col-cloth input").eq(5).val(),
		clothGive = Number($(".tab-content-service .col-cloth input[type='checkbox']").is(":checked"));

	let clothData = '"DOU_clothLECharge":'+ clothLECharge +',"cloth_clothLECount":'+ clothLECount +','
		    +'"DOU_clothSPCCharge":'+ clothSPCCharge +',"cloth_clothSPCCount":'+ clothSPCCount+','
		    +'"STR_clothCycle":"'+ clothCycle +'","STR_clothNote":"'+ clothNote +'","BOOL_clothGive":'+ clothGive +',';

	// 餐券
	var lunchData = "";
	for (var i = 1; i <= $(".tab-content-service .col-lunch").length; i++) {
		var R = $(".tab-content-service .col-lunch").eq(i-1).children("td").children("input");

		var perRestaurant = '"restaurantMap'+ i +'":'
		    +'{"STR_RName":"'+  $(".tab-content-service .col-lunch").eq(i-1).children("td").eq(0).text() +'",'
		    +'"DOU_LECharge":'+ R.eq(0).val() +',"INT_LECount":'+ R.eq(1).val() +','
		    +'"DOU_SPCCharge":' + R.eq(2).val() +',"INT_SPCCount":'+ R.eq(3).val() +','
		    +'"STR_Cycle":"'+ R.eq(4).val() +'","STR_Note":"'+ R.eq(5).val() +'",'
		    +'"BOOL_Give":'+ Number($(".tab-content-service .col-lunch:nth-child("+ i +") td input[type='checkbox']").is("checked")) +'},';
		lunchData += perRestaurant;
	}
	if(lunchData.length!=0) lunchData = lunchData.substring(0,lunchData.length-1);


	// 早餐费
	var breakLECharge = $(".tab-content-service .col-break input").eq(0).val(),
		breakLECount = $(".tab-content-service .col-break input").eq(1).val(),
		breakSPCCharge = $(".tab-content-service .col-break input").eq(2).val(),
		breakSPCCount = $(".tab-content-service .col-break input").eq(3).val(),
		breakCycle = $(".tab-content-service .col-break input").eq(4).val(),
		breakNote = $(".tab-content-service .col-break input").eq(5).val(),
		breakGive = Number($(".tab-content-service .col-break input[type='checkbox']").is(":checked"));

	// 购物卡
	var shoppingLECharge = $(".tab-content-service .col-shopping input").eq(0).val(),
		shoppingLECount = $(".tab-content-service .col-shopping input").eq(1).val(),
		shoppingSPCCharge = $(".tab-content-service .col-shopping input").eq(2).val(),
		shoppingSPCCount = $(".tab-content-service .col-shopping input").eq(3).val(),
		shoppingCycle = $(".tab-content-service .col-shopping input").eq(4).val(),
		shoppingNote = $(".tab-content-service .col-shopping input").eq(5).val(),
		shoppingGive = Number($(".tab-content-service .col-shopping input[type='checkbox']").is(":checked"));

	// 饮用水
	var waterLECharge = $(".tab-content-service .col-water input").eq(0).val(),
		waterLECount = $(".tab-content-service .col-water input").eq(1).val(),
		waterSPCCharge = $(".tab-content-service .col-water input").eq(2).val(),
		waterSPCCount = $(".tab-content-service .col-water input").eq(3).val(),
		waterCycle = $(".tab-content-service .col-water input").eq(4).val(),
		waterNote = $(".tab-content-service .col-water input").eq(5).val(),
		waterGive = Number($(".tab-content-service .col-water input[type='checkbox']").is(":checked"));

	// 日用品
	var dailyLECharge = $(".tab-content-service .col-daily input").eq(0).val(),
		dailyLECount = $(".tab-content-service .col-daily input").eq(1).val(),
		dailySPCCharge = $(".tab-content-service .col-daily input").eq(2).val(),
		dailySPCCount = $(".tab-content-service .col-daily input").eq(3).val(),
		dailyCycle = $(".tab-content-service .col-daily input").eq(4).val(),
		dailyNote = $(".tab-content-service .col-daily input").eq(5).val(),
		dailyGive = Number($(".tab-content-service .col-daily input[type='checkbox']").is(":checked"));


	// 新增加的项目
	let addData = "";
    if((".col-add").length!=0){
    	for(var i=1; i<=$(".col-add").length; i++){
    		var A = $(".col-add").eq(i-1).children("td").children("input");

    		var perAdd = '"OBJ_PERADD'+ i +'":{"STR_ADD_NAME":"'+ A.eq(0).val() +'",'
    		+'"DOU_LECharge":'+ A.eq(1).val() +',"INT_LECount":'+ A.eq(2).val() +','
		    +'"DOU_SPCCharge":' + A.eq(3).val() +',"INT_SPCCount":'+ A.eq(4).val() +','
		    +'"STR_Cycle":"'+ A.eq(5).val() +'","STR_Note":"'+ A.eq(6).val() +'",'
		    +'"BOOL_Give":'+ Number($(".tab-content-service .col-add:nth-child("+ i +") td input[type='checkbox']").is("checked")) +'},';
    	    
    	    addData += perAdd;
    	}
    }
    if(addData.length!=0) addData = addData.substring(0,addData.length-1);

	$.ajax({
		url:"/",
		type:"post",
		dataType:'json',
		contentType:'application/json',
		data:'{' + guestData + hostData + internData + rentData

		    +'"service":{' + IntData + resourceData + breakfastData + parkData + tvData + newspaperData + clothData 
		    //午餐
			+'"OBJ_lunchMap":{'+ lunchData +'},'

		    +'"DOU_breakLECharge":'+ breakLECharge +',"INT_breakLECount":'+ breakLECount +','
		    +'"DOU_breakSPCCharge":'+ breakSPCCharge +',"INT_breakSPCCount":'+ breakSPCCount+','
		    +'"STR_breakCycle":"'+ breakCycle +'","STR_breakNote":"'+ breakNote +'","BOOL_breakGive":'+ breakGive +','
		    // 购物卡
		    +'"DOU_shoppingLECharge":'+ shoppingLECharge +',"INT_shoppingLECount":'+ shoppingLECount +','
		    +'"DOU_shoppingSPCCharge":'+ shoppingSPCCharge +',"INT_shoppingSPCCount":'+ shoppingSPCCount+','
		    +'"STR_shoppingCycle":"'+ shoppingCycle +'","STR_shoppingNote":"'+ shoppingNote +'","BOOL_shoppingGive":'+ shoppingGive +','
		    // 饮用水
		    +'"DOU_waterLECharge":'+ waterLECharge +',"INT_waterLECount":'+ waterLECount +','
		    +'"DOU_waterSPCCharge":'+ waterSPCCharge +',"INT_waterSPCCount":'+ waterSPCCount+','
		    +'"STR_waterCycle":"'+ waterCycle +'","STR_waterNote":"'+ waterNote +'","BOOL_waterGive":'+ waterGive +','
		    //日用品
			+'"DOU_dailyLECharge":'+ dailyLECharge +',"INT_dailyLECount":'+ dailyLECount +','
		    +'"DOU_dailySPCCharge":'+ dailySPCCharge +',"INT_dailySPCCount":'+ dailySPCCount+','
		    +'"STR_dailyCycle":"'+ dailyCycle +'","STR_dailyNote":"'+ dailyNote +'","BOOL_dailyGive":'+ dailyGive +','
		    +'"OBJ_ADDLIST":{'+ addData +'}'
		    +'}'
		    
		    +'}',
        success:function(data){
        	console.log(data);
        }
	});
}
