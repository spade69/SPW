define(['jquery','localStorageImg','useful'],function(jquery,localStorageImg,useful){
    return function(ele){
        // createSideBar(ele)
        //创建几个选项tap并用bootstrap附上样式
        //注意插入到Main.html，但是直接写/images/headPhoto.png是不对的,要使用相对路径
        var $personal=$('<div><img src="./images/headPhoto.png" class="img-circle"></div>');
        var $tap=$('<a id="git" href="#" class="list-group-item active"><span class="glyphicon glyphicon-tag"></span>GitHub</a>');
        var $tap1=$('<a id="mail" href="javascript:void(0)" class="list-group-item active"><span class="glyphicon glyphicon-tag"></span>Mail</a>');
        var $tap2=$('<a id="weibo" href="#" class="list-group-item active"><span class="glyphicon glyphicon-tag"></span>Weibo</a>');
        ele.append($personal);
        ele.append($tap);
        ele.append($tap1);
        ele.append($tap2);
        ele.find("img").css({
            "width":"150px",
            "height":"150px",
            "left":"50px",
            "position":"relative"
        });
        //<div id="person_img">
        ele.find("img").on("click",function(){
            console.log($(this));
            $(this).animate({
                 "margin-left":"20px",
                 //left:"toggle"
            },300);
        });

        //transfer to DOM object
        $('#git')[0].title="My GitHub";
        $('#weibo')[0].title="Sina WeiBo";
        $("#mail")[0].title="jlin991@gmail.com"
        $('#git').on('click',function(){
            //直接修改a的属性即可,注意这是一个jq对象，说明了
            //jq中也支持这些原生的属性
            this.href="https://github.com/spade69";
            this.target="_blank";
        });
        $('#weibo').on('click',function(){
            this.href="http://weibo.com/spade69";
            this.target="_blank";
        })
        $("#mail").on('click',function(){
            this.target="_blank";
            this.href="Gmail:jlin991@gmail.com";
        })

        //dragstart default response?
        ele.on('dragstart',function(){
            return false;
        });
        //Don't just set and get 

        var iframe; //global
                            //var urlBase="http://119.29.165.186/balight/file/photos/weibo.png";
        var storage=new localStorageImg.createStorage('./images/weibo.png',$('#weibo')[0]);
        var gitStorage=new localStorageImg.createStorage('./images/github.png',$('#git')[0]);
        var mailStorage=new localStorageImg.createStorage('./images/gmail.png',$('#mail')[0]);
         // getItem 提前设置好监听函数，监听一切stroage事件
        addEvent(window,'storage',function(e){
            console.log('storage finished'+e.domain+e.key);
            //get method here
            if(e.key==='weiboImg'){
                    storage.get('weiboImg');
            }else if(e.key==='gitImg'){
            gitStorage.get('gitImg');
            }else if(e.key==='mailImg'){
                    mailStorage.get('mailImg');
            }
        });

        //Test Case
        //myDOMReady(document,function(){
            iframe=storage.createIframe('left');// left id 先创建好iframe
            if(localStorage.length===0){
                //after created iframe, then we load the script
                storage.set('weiboImg','png',iframe);  //再设置Script到iframe中
                gitStorage.set('gitImg','png',iframe); 
                mailStorage.set('mailImg','png',iframe);
                console.log('running running loaded!');
            }
        //});

            if(localStorage.length>0){
                storage.get('weiboImg');
                gitStorage.get('gitImg');
                mailStorage.get('mailImg');
            }
    }
});