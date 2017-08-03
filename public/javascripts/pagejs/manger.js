$(".chzn-select").chosen();
function showmodel(title,info){
      $('#title').text(title);
      $('#info').text(info);
      $('#remind1').modal('show');
}

// 修改密码
$("#chapasswd").click(function(){
	var pd1 = $("#chapd1").val();
	var pd2 = $("#chapd2").val();
	if( ! $("#chapd1").val() || ! $("#chapd2").val()){
       showmodel("输入错误","请将信息填写完整");
	}else if($("#chapd1").val() != $("#chapd2").val()){
       showmodel("输入错误","两次填写的密码不一致");
	}else{
	  	$.post('changepd',{
		newpd: md5($("#chapd1").val().toString() +  "mimajiamizifu")
	},function(data,status){
       if(data.status == "success"){
        showmodel("系统通知","修改密码成功");
       }else{
        showmodel("系统通知","修改密码失败");
       }
	}).error(function(){
		showmodel("系统错误，修改密码失败");
	})	
	}

})

$("#Personalinfo").click(function(){
    $('#chpersoninfo').modal('show');
})



$("#allnoall").click(function(){
	  var checkboxs = document.getElementsByName('chatuser');
		for (var i = 0; i < checkboxs.length; i++) {
	  var e = checkboxs[i];
	  e.checked = !e.checked;
	}
})

$('#date1').datetimepicker({
    format: 'yyyy-mm-dd hh:mm:ss'
})
$('#date2').datetimepicker({
    format: 'yyyy-mm-dd hh:mm:ss'
})


//搜索聊天记录
//
$("#search").click(function(){
   if(!$("#date1").val() || !$("#date2").val() || !$("#searchcontent").val()){
     showmodel("信息提示","请将信息填写完整");
   }else if($("#date1").val()>$("#date2").val()){
     showmodel("信息提示","起始日期应该比结束日期小");
   }else{
  	$.post('search',{
    user:  $("#finduser").val(),
    date1: $("#date1").val(),
    date2: $("#date2").val(),
		content: $("#searchcontent").val()
	},function(data,status){
       if(data.status.length == 0){
         showmodel("信息提示","没有找到记录");
         
       }else{
         make(data.status);
       }
	}).error(function(){
		console.log("EREROR");
	})	
 }
})
function make(data,nums=5){

layui.use(['laypage', 'layer'], function(){
  var laypage = layui.laypage
  ,layer = layui.layer;
  
  
  //模拟渲染
  var render = function(data, curr){
    var arr = []
    ,thisData = data.concat().splice(curr*nums-nums, nums);
    layui.each(thisData, function(index, item){
      arr.push("<tr class='active'>");
      arr.push("<td class='active'>" + item.name + "</td>");
      arr.push("<td class='active'>" + item.message + "</td>");
      arr.push("<td class='active'>" + item.date + "</td>");
      arr.push("</tr>")
    });
    return arr.join('');
  };
  
  //调用分页
  laypage({
     cont: 'listpage'
    ,pages: Math.ceil(data.length/nums) //得到总页数
    ,jump: function(obj){
    document.getElementById('chatmessage').innerHTML = render(data, obj.curr);
    }
  });
  
 });
}


//页面加载时默认显示的聊天记录
(function(){
    $.post('search',{
    content: ""
  },function(data,status){
         make(data.status);
  }).error(function(){
    console.log("EREROR");
  })  
})();


//获取用户列表

(function(){
  var listu="";
 $.getJSON('./userlist',function(userlist){
  userlist.status.map(function(user){
  listu += "<option value = " +  user + ">"+ user +"</option>";
  })
  $("#finduser").append(listu)
 })
})()