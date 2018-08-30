$(function () {

  //MathJax初始化相关
  MathJax.Hub.Config({
    showProcessingMessages: false, //关闭js加载过程信息
    messageStyle: "none", //不显示信息
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {inlineMath: [["$","$"],["\\(","\\)"],["\[","\]"]]},
    "HTML-CSS": {
      availableFonts: ["STIX", "TeX"],
      showMathMenu: false,  //屏蔽右键菜单
      linebreaks: {automatic: true} //自动换行
    },
  });
  

  //页面公式渲染完毕绑定公式的点击事件
  MathJax.Hub.Queue(function () {
    clickFormula();
  });

  //公式的点击事件
  function clickFormula() {
    $('.MathJax').off("click"); //移除点击事件,防止多次绑定
    $('.MathJax').on('click', function () {
      //展示弹层
      $('.black-overlay').show();
      $('.alert-content').show();

      //获取对应参数，显示渲染后的公式与公式代码本身不是一个元素。
      //例：id: MathJax-Element-1-Frame class:MAthJax,渲染后的公式内容  
      //id: MathJax-Element-1, 公式代码本身
      var formulaCodeItemId = $(this).attr('id').substring(0, $(this).attr('id').length - 6); //公式代码元素的id
      var formulaCode = $('#' + formulaCodeItemId).html(); //公式对应的代码
      var formulaCodeNum = formulaCodeItemId.substring(16, formulaCodeItemId.length); //公式在jax数组中的序号

      //赋予文本框，且渲染到预览区域
      $('#text').val(formulaCode);
      $('#text-show').html('$' + formulaCode + '$');
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("text-show")]); //预览区加载渲染公式

      //实施修改更新函数
      inputEditFormula(formulaCodeNum);
    })
  }

  //点击取消按钮
  $('.cancel-button').click(function(){
    $('.black-overlay').hide();
    $('.alert-content').hide();
  });


  /**
   * 监听textarea变化，从而实时更新预览
   * @param {*} formulaCodeNum 公式在jax数组中的序号
   */
  function inputEditFormula(formulaCodeNum) {
    $('#text').bind('input propertychange', function () {
      if ($('#text').val().trim()) {  //textarea有值
        $('#text-show').html('$' + $('#text').val().trim() + '$');
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("text-show")]);
      } else {      //textarea无值
        $('#text-show').html('');
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("text-show")]);
      }
    });
    
    //点击确定按钮
    $('.confirm-button').off("click");
    $('.confirm-button').click(function () {
      //获取对应jax对象
      var mathJax = MathJax.Hub.getAllJax()[formulaCodeNum-1];
      //页面对应内容修改，且重新绑定函数
      mathJax.Text($('#text').val().trim(), function(){
        clickFormula();
      });
      $('.black-overlay').hide();
      $('.alert-content').hide();
    });
  }

  
  //点击页面公式类别图标，弹出此类公式的全部可选项。
  $('.operate-area img').click(function(event) {
    layer.open({
      title: "请选择公式",
      type: 1,
      area: '700px',
      content: $("#" + $(this).attr('id') + "-area" ),
    });
  })

  //点击具体公式对应的图片
  $('.formula-area img').click(function() {
    var code = $(this).attr('code');
    layer.closeAll();
    //插入到鼠标指针原来位置
    insertAtCursor(document.getElementById('text'), code)
    //渲染预览区域
    $('#text-show').html('$' + $('#text').val().trim() + '$');
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("text-show")]);
  })


  /**
   * 在textarea光标处插入内容
   * @param {*文本框对象} myField 
   * @param {*要插入的值} myValue 
   */
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