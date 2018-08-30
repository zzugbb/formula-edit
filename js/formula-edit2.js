$(function () {

  MathJax.Hub.Config({
	  showProcessingMessages: false, //关闭js加载过程信息
    messageStyle: "none", //不显示信息
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {inlineMath: [["$","$"],["\\(","\\)"],["\[","\]"]]},
    "HTML-CSS": {
      availableFonts: ["STIX", "TeX"],
      showMathMenu: false  //屏蔽右键菜单
    },
  });
  
  //点击编辑按钮
  $(".edit-button").click(function(){
    $('.black_overlay').show();
    $('.alert_content').show();

    var textContent = $(this).parent().children('p').attr('text');
    var id = $(this).attr('idCode');

    //赋予文本框，且渲染到预览区域
    $('#text').val(textContent);
    $('#text-show').html(textContent);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("text-show")]);

    //实施修改更新函数
    InputMathJax(textContent, id);
  });


  //取消按钮
  $('.cancel-button').click(function(){
    $('.black_overlay').hide();
    $('.alert_content').hide();
  });


  function InputMathJax(code, id) {

    //监听textarea变化，从而实时更新预览
    $('#text').bind('input propertychange', function () {
      if ($('#text').val().trim()) {
        $('#text-show').html($('#text').val().trim());
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("text-show")]);
      } else {
        $('#text-show').html('');
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("text-show")]);
      }
    });
    
    //点击确定
    $('.confirm-button').off("click");
    $('.confirm-button').click(function () {
      $('#' + id).html($('#text').val().trim());
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById(id)]);
      $('#' + id).attr("text", $('#text').val().trim())
      $('.black_overlay').hide();
      $('.alert_content').hide();
    });
  }

  $('.operate-area img').click(function(event) {
    layer.open({
      title: "请选择公式",
      type: 1,
      area: '500px',
      content: $("#" + $(this).attr('id') + "-area" ),
    });
  })

  $('.formula-area img').click(function() {
    var code = "$" + $(this).attr('code') + "$";
    layer.closeAll();
    insertAtCursor(document.getElementById('text'), code)
    $('#text-show').html($('#text').val().trim());
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("text-show")]);
  })


  function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
      myField.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
      sel.select();
    } else if (myField.selectionStart || myField.selectionStart == '0') {  //MOZILLA/NETSCAPE support
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      // save scrollTop before insert 
      var restoreTop = myField.scrollTop;
      myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
      if (restoreTop > 0) {
        myField.scrollTop = restoreTop;
      }
      myField.focus();
      myField.selectionStart = startPos + myValue.length;
      myField.selectionEnd = startPos + myValue.length;
    } else {
      myField.value += myValue;
      myField.focus();
    }
  }

})