(function(){
    /* 자동완성 */
    document.querySelector('#in01').addEventListener('keyup',e=>{
       const out = document.querySelector('#out01');
       const rslt = f(e.target.value);
       let outtxt = ''
       if (e.target.value){
       rslt.forEach(row=>{
           outtxt+=`<p class="word" data-dir="${row.name}">${row.name}</p>`
       });
       }
       out.innerHTML = outtxt
    });

    /* '/'를 누를때 자동으로 검색창에 포커싱 */
    document.addEventListener("keyup",e=>{
        if(e.key==='/'){
            document.querySelector('#in01').focus();
        }
    });
    
    /* 클릭 이벤트 */
    document.querySelector('#out01').addEventListener("click",e=>{
        if ( e.target.className === 'word') {
            alert(e.target.dataset.dir)
        }
    });
    
    /* 한글단어를 영어인덱스로 변환 */
    function toEngIndex(str){
        let one = ["r","R","rt","s","sw","sg","e","E","f","fr","fa","fq","ft","fx","fv","fg","a","q","Q","qt","t","T","d","w","W","c","z","x","v","g","k","o","i","O","j","p","u","P","h","hk","ho","hl","y","n","nj","np","nl","b","m","ml","l"],
            fst_map = "rRseEfaqQtTdwWczxvg",
            snd_map = ["k","o","i","O","j","p","u","P","h","hk","ho","hl","y","n","nj","np","nl","B","m","ml","l"],
            lst_map = [" ","r","R","rt","s","sw","sg","e","f","fr","fa","fq","ft","fx","fv","fg","a","q","qt","t","T","d","w","c","z","x","v","g"],
        fst, snd, lst; 
        var cnt = str.length, chars = [], cCode; 
        for (var i = 0; i < cnt; i++) { 
           cCode = str.charCodeAt(i); 
           //if (cCode == 32) { continue; } // 공백문자
           if (cCode >= 0x3131 && cCode <= 0x319E) {// 자모음 하나만 쓰일 경우
                chars.push(one[(cCode - 0x3131)]); 
           } else if (cCode < 0xAC00 || cCode > 0xD7A3) {// 한글이 아닌 경우
                chars.push(str.charAt(i)); 
                continue; 
           } 
           cCode = str.charCodeAt(i) - 0xAC00; 
           lst = cCode % 28; // 종성 
           snd = ((cCode - lst) / 28 ) % 21; // 중성 
           fst = (((cCode - lst) / 28 ) - snd ) / 21; // 초성 

           chars.push(fst_map[fst], snd_map[snd]); 
           if (lst_map[lst] !== " ") { 
              chars.push(lst_map[lst]); 
           } 
        }
        return chars.join(''); 
    }

    var dict= {words:[]};
    fetch('https://rosemedia121.github.io/proj/web/resource/mydict.json').then(res=>res.json()).then(jsn=>{dict.words=jsn.words.sort((a,b)=>b.view-a.view)})

    function f(key){
        return dict.words.filter(e=>RegExp('^'+toEngIndex(key)).test(toEngIndex(e.name))).filter((e,i)=>i<5)
    }
}())
