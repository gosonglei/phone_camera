var result1 = '',result2 = '',result3 = '',result4 = '' ,result5 = '',result6 = '' ;
document.getElementById( 'img').addEventListener('change', function () {
    document.getElementById('overlay').style.display = 'flex';
    var reader = new FileReader();
    reader.onload = function (e) {
        //调用图片压缩方法：compress();
        var compressImg = compress( this.result,fileSize);
    };
    reader.readAsDataURL(this.files[0]);
    result1 = this.files[0].size + ' Bytes';
    var fileSize = Math.round(this.files[0].size/1024/1024) ;//以M为单位
    //this.files[0] 该信息包含：图片的大小，以byte计算 获取size的方法如下：this.files[0].size;
}, false);
/*
 1、设置压缩后的最大宽度 or 高度；
 2、设置压缩比例，根据图片的不同size大小，设置不同的压缩比。
*/
var compress = function (res,fileSize) {//res代表上传的图片，fileSize大小图片的大小
    var img = new Image(),
            maxW = 1000; //设置最大宽度
    img.onload = function () {
        var cvs = document.createElement( 'canvas'),
                ctx = cvs.getContext( '2d');
        result2 = img.width;
        result3 = img.height;
        if(img.width > maxW) {
            img.height *= maxW / img.width;
            img.width = maxW;
        }
        cvs.width = img.width;
        cvs.height = img.height;
        result4 = cvs.width;
        result5 = cvs.height;
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var compressRate = getCompressRate(1,fileSize);
        var dataUrl = cvs.toDataURL( 'image/jpeg', compressRate);
        document.getElementById('imgInfo').setAttribute('src',dataUrl);
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('showResult').innerHTML = "<p>压缩前图片大小为:"+result1+"<br/><p>压缩前图片宽度为:"+result2+"<br/><p>压缩前图片高度为:"+result3+"<br/><p>压缩后图片宽度为:"+result4+"<br/><p>压缩后图片高度为:"+result5+"</p><p class='small'>压缩后的图片,点完成后，可通过nodejs或者后台获取！</p><button id='photo_btn' onclick='upimage()'>完成</button>" ;
    };
    img.src = res;
};
function getCompressRate(allowMaxSize,fileSize){ //计算压缩比率，size单位为MB
    var compressRate = 1;
    if(fileSize/allowMaxSize > 4){
        compressRate = 0.5;
    } else if(fileSize/allowMaxSize >3){
        compressRate = 0.6;
    } else if(fileSize/allowMaxSize >2){
        compressRate = 0.7;
    } else if(fileSize > allowMaxSize){
        compressRate = 0.8;
    } else{
        compressRate = 0.9;
    }
    result6 = compressRate;
    return compressRate;
}
function $(id){
    if(typeof id === 'string' && id.constructor === String){
        return document.getElementById(id);
    }else{
        return;
    }
}