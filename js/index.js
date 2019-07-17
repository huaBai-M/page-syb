$(function(){
	
	/*获取数据*/
	$.ajax({
	    type:"get",
	    url:"http://dt.wayboo.net.cn/websitecontroller/officewebsite.action",
	    async:false,
	    dataType: "jsonp",
	    success:function(str){
	        data=str
	        MinCarousel()
	    }
	});
	/***/
	/*数据滚动**/
	var MinCarousel=function(){
        $("#bottomRight_lun>ul").html(" ");
	    var str=data.jsonp.supplier;
	    var Ulist='';
	    for (var i in str) {
	        Ulist+="<li><p>"+data.jsonp.purchaser[i]+"</p></li>"
	    }
	    $("#bottomRight_lun>ul").html(Ulist)
	}
	$(function(){
	    $('#bottomRight_lun').myScroll({
	        speed:70, //数值越大，速度越慢
	        rowHeight:40 //li的高度
	    });
		// $('.absoluete').myScroll({
	 //        speed:80, //数值越大，速度越慢
	 //        rowHeight:58 //li的高度
	 //    });
	    // console.log('ssss')
})
   

   // 回到顶部
    $(window).scroll(function () {
        var scrollTop =$(document).scrollTop();
        // console.log(scrollTop)
        if(scrollTop >= 500 ){
            $('.goTo').css('display','block');
            $('.add-search').css('display','block');
        }else {
            $('.goTo').css('display','none');
            $('.add-search').css('display','none');
        }
    })
    //1：jQuery.fn是jQuery的原型对象也可以写成 $.fn
    //2：添加myScrollTo方法到jQuery原型($.fn) 
    $.fn.myScrollTo = function(speed) {
        var targetOffset = $(this).offset().top;
        console.log(targetOffset);//去除默认样式后是 0 
        //$(this).offset()：获得位移对象（此时其实啥也没做）
        //$(this).offset().top：获得位移高度
        $('html,body').stop().animate({scrollTop: targetOffset}, speed);
        return this;
    }; 
    
    // 使用自定义的方法
    $(".goTo").click(function(){
        $("body").myScrollTo(1000);//调用，并传入速度
        return false;//阻止默认事件
    }); 
    //点击显示隐藏区域
   
    $('.add-company').click(function() {
    	$('.hidden-content-style').hide();
    	$(this).css({
    		'backgroundColor': '#fff'
    	});
    	var aDisplay = $('.hidden-content').css('display');
    	// console.log(aDisplay);
    	if(aDisplay=="none"){
    		$('.hidden-content').css('display','block');
    		$(this).find('i').attr("class", "iconfont icon-xiala1");
    		$(this).css({
    		'backgroundColor': '#fff'
    		});
    	}else{
    		$('.hidden-content').css('display','none');
    		$(this).find('i').attr("class", "iconfont icon-xiala");
    		$(this).css({
    		'backgroundColor': '#fff'
    		});
    	}
    });
    //选择区域
    $('.hidden-content span').click(function() {
 		var label = $(this).html();
    	/* Act on the event */
    	$('.add-company .label').html(label);
    });

    //点击显示隐藏公司类型
   
    $('.add-com').click(function() {

    	$('.hidden-content').hide();
    	var aDisplay = $('.hidden-content-style').css('display');
    	// console.log(aDisplay);
    	if(aDisplay=="none"){
    		$('.hidden-content-style').css('display','block');
    		$(this).find('i').attr("class", "iconfont icon-xiala1");
    		$(this).css({
    		'backgroundColor': '#fff'
    		});
    	}else{
    		$('.hidden-content-style').css('display','none');
    		$(this).find('i').attr("class", "iconfont icon-xiala");
    		$(this).css({
    		'backgroundColor': '#fff'
    		});
    	}
    });
    //公司类型
    $('.hidden-content-style p').click(function() {
 		var label = $(this).html();
    	/* Act on the event */
    	$('.add-com .label').html(label);
    });

    //搜索-产品 -企业 -切换
    $('.search-p-l .tab span').click(function() {
    	/* Act on the event */
    	$('.search-p-l .tab span').removeClass('blue');
    	$(this).addClass('blue');
    });

    // 价格排序
    var flag = false;
    $('.price').click(function() {
    	/* Act on the event */
    	console.log(flag);
    	if(flag){//降序
	    	$(this).find('.icon-xiala').css('color','#0972f4');
	    	$(this).find('.icon-xiala1').css('color','#666');
	    	flag = false;	
    	}else {//升序
    		$(this).find('.icon-xiala1').css('color','#0972f4');
    		$(this).find('.icon-xiala').css('color','#666');
	    	flag = true;
    	}
    });


    // 全网询价--js
    // 点击发布-弹出弹窗
    $('.btn-fa').click(function() {
    	/* Act on the event */
    	// 校验必填项
    	var proName = $('input[class^=pro-name]'); //产品名称
    	var proNum = $('input[class^=pro-num]'); //产品数量
    	var proDan = $('input[class^=pro-dan]'); //单位
    	var reg=/^([\u4e00-\u9fa5]){2,7}$/; //只能是中文，长度为2-7位
        // var regN = /^[0-9]*$/;
    	var conName = $('.concat-name').val();
    	var phone = $('.concat-phone').val();
    	var flag = false;
        var flag1 = false;  
		for(i=0;i <$('.pro-msg li').length;i++){  
	     if(proName[i].value==''||proNum[i].value==''||proDan[i].value==''){
	       flag = true;
	       break ;
	     }
		}
		if(flag){
		  alert("请输入完整的产品信息") ;
		}else if(conName==''||phone==''){
			alert('请输入完整联系人信息');
    	}else if(!reg.test(conName)){
    		alert('请输入正确格式的姓名');
    	}else {
    		$('.pop').show();
    	}	
    	
    });
    // 产品数量失去焦点校验
    $('.concat-phone').blur(function() {
        var phone = $('.concat-phone').val();; //产品数量
        var regN = /^1[34578]\d{9}$/;
        if(!regN.test(phone)){
           alert('请输入正确的手机号');
        }
        /* Act on the event */
    });
    // 点击弹窗中的确定-关闭弹窗
    $('.confirm').click(function() {
    	/* Act on the event */
    	$('.pop').hide();
    });
    // 点击添加产品加一行
    var liObj = `<li class="clearFix">
							<div class="label-item">
								<label><span class="star">*</span>产品名称</label>
								<input type="text" placeholder="例如：包子" class="pro-name" name="proName">
							</div>
							<div class="label-item">
								<label><span class="star">*</span>采购数量</label>
								<input type="number" placeholder="请填写" class="pro-num" name="proNum">
							</div>
							<div class="label-item">
								<label>品牌</label>
								<input type="text" placeholder="品牌">
							</div>
							<div class="label-item">
								<label><span class="star">*</span>单位</label>
								<input type="text" placeholder="例如：台 件" class="pro-dan" name="proDan">
							</div>
							<div class="label-item">
								<label>备注</label>
								<input type="text" placeholder="如：型号、性能、用途等">
							</div>
						</li>` 
    $('.add-pro').click(function() {
    	$('ul.pro-msg').append(liObj);
    });


    $('a').attr({
        target: '_blank'
    });
    $('.banner .one .one-li:eq(0)').find('i').addClass('icon-wujin');
    $('.banner .one .one-li:eq(1)').find('i').addClass('icon-jiaju');
    $('.banner .one .one-li:eq(2)').find('i').addClass('icon-gangcaizhonglei');
    $('.banner .one .one-li:eq(3)').find('i').addClass('icon-yiqileixing');
    $('.banner .one .one-li:eq(4)').find('i').addClass('icon-gangcaishichang');
    $('.banner .one .one-li:eq(5)').find('i').addClass('icon-zhaoming');
    $('.banner .one .one-li:eq(6)').find('i').addClass('icon-qiche');
    $('.banner .one .one-li:eq(7)').find('i').addClass('icon-nonglinmuyu');
    $('.banner .one .one-li:eq(8)').find('i').addClass('icon-baozhuang');
    $('.banner .one .one-li:eq(9)').find('i').addClass('icon-shangwu');
    $('.banner .one .one-li:eq(10)').find('i').addClass('icon-xiuxian');
    $('.banner .one .one-li:eq(11)').find('i').addClass('icon-gengduo1');

    $('.middleFen .p').click(function() {
        /* Act on the event */
        $('.middleFen .p').removeClass('activeP');
        $(this).addClass('activeP');
    });
})