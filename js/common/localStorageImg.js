/*Canvas transfer img to Base64 string 
Author:Jason
*/


// deps = []; //deps  
// 
define(['useful'],function(useful){
    var createStorage=function(imgPath,ele){
        this.src=imgPath;//var src="xxx.jpg";
        this.ele=ele;
    }

    createStorage.prototype={
        set:function(key,imgType,iframe){
            var img=document.createElement('img');
            //img.setAttribute('crossOrigin','annonymous');
            //当图片加载完成时触发回调函数
            img.src=this.src;
            var self=this;
            img.addEventListener('load',function(){
                var imgcanvas=document.createElement("canvas");
                var imgContext=imgcanvas.getContext("2d");
                imgcanvas.style.width="50px";//CANVAS大小
                imgcanvas.style.height="50px";
                //确保canvas元素的大小和图片尺寸一致
                //渲染图片到canvas中 定位以及宽高
                // context.drawImage(img,x,y,width,height);
                imgContext.drawImage(this,0,0,300,110);
                //用data url形式取出
                var imgAsDataURL=imgcanvas.toDataURL("image/"+imgType);

                //保存到本地存储中
                try{
                    //localStorage.setItem(key,imgAsDataURL);//存到localstorage~！
                    var tmpObj={key:key,imgURL:imgAsDataURL};
                    self.addScript2Iframe(iframe,tmpObj);
                }catch(e){
                    console.log("Storage failed:"+e);
                }
            },false);
            
        },

        get:function(key){//从本地缓存取图片并渲染
            var srcStr=localStorage.getItem(key);
            var imgObj=document.createElement('img');
            imgObj.src=srcStr;
            imgObj.style.width="50px"; //这个会截断图片
            imgObj.style.height="60px";
            imgObj.style.marginLeft="20px";
            //document.body.appendChild(imgObj);
            this.ele.appendChild(imgObj);
        },

                //在Iframe载入js脚本之前，iframe的DOMready之后
        //才addScript2Iframe
        createIframe:function(iframeId){
            var iframe=document.createElement('iframe'),
                parent=document.getElementById(iframeId);//left iframe
                //设置src的时候开始？ 还是appendChild的时候？
                //我测试了执行到iframe.src ，但不执行appendChild的时候
                //和两个都执行了的时候
                //还有先执行appendChild再执行src
            //iframe.src=' '; //iframe.src='index.html'; 
            parent.appendChild(iframe);
            console.log(iframe.contentDocument);
            //添加DOMReady事件给iframe。
            //不需要，要添加也是添加load事件！ 
            iframe.style.display='none';
           //this.set(key,imgType)
            return iframe;
            //addScript2Iframe(iframe);
        },

        addScript2Iframe:function(iframe,obj){
            var iframeWindow=iframe.contentWindow,
                iframeDocument=iframe.contentDocument,
                key=obj.key,
                imgURL=obj.imgURL,
                ss='xx',
                //code="localStorage.setItem("+key+","+imgURL+");";
                code="localStorage.setItem('"+key.toString()+"','"+imgURL.toString()+"');";
            //iframeDocument.body.innerHTML+='';
            //console.log(code);
            loadScriptString(iframeDocument,code);
        }
    }           

    return{
        createStorage:createStorage
    }
});