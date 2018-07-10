$(function(){
    const WIDTH = 400;
    const HEIGHT = 400;
    var canvas = document.querySelector('#canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    var pointArray = [
        {
            x: 100,
            y: 100
        },
        {
            x: 150,
            y: 180
        },
        {
            x: 180,
            y: 200
        },
        {
            x: 300,
            y: 100
        }
    ]

    drawBezier(ctx, pointArray);
})

//绘制曲线
function drawBezier(ctx,pointArray){
    var arr = getAllNode(pointArray);
    for(let i= 0, len = arr.length; i< len -1; i++){
        if(i ==0 ){
            ctx.moveTo(arr[i].x, arr[i].y);
        } else{
            ctx.lineTo(arr[i].x, arr[i].y);
        }
        
    }
    ctx.stroke();
}

//阶乘函数
function factor(n){
    if(n<=1){
        return 1;
    } else {
        return n * factor(n-1);
    }
}

//二项式系数
function Binomial(n,index){
    return factor(n)/(factor(index) * factor(n-index));
}

function getAllNode(pointArray){
    let arr = [];
    //divide越大，曲线越平滑
    const divide = 500;
    for(let t=0;t<=1; t+=1/divide){
        let obj ={
            x: 0,
            y: 0
        }
        //贝塞尔曲线公式
        for(let i =0,len=pointArray.length-1; i<= len; i++){
            obj.x += pointArray[i].x * Binomial(len,i) * Math.pow((1-t),(len-i)) * Math.pow(t, i);
            obj.y += pointArray[i].y * Binomial(len,i) * Math.pow((1-t),(len-i)) * Math.pow(t, i);
        }
        arr.push(obj);
    }
    return arr;
}
