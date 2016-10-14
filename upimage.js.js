var upimage = function () {
    var dataUrl = $('#imgInfo').attr('src');
    console.log('dataUrl');
    console.log(dataUrl);
    var obj = JSON.stringify(dataUrl);
    $.ajax({
        type: "post",
        url: "/upimage",
        datatype: "json",
        data: {obj: obj},
        success:function(data){
            alert("提交成功！");
        }
    })
}