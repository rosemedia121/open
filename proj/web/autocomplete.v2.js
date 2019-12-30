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
    function f(word){
        return dict.find(word.toEngKey());
    }
    /* 클릭 이벤트 */
    document.querySelector('#out01').addEventListener("click",e=>{
        if ( e.target.className === 'word') {
            alert(e.target.dataset.dir)
        }
    });
    
    var dict= {
        words:{
        "구글":1,"react":0,"reddit":0,"겨울왕국":1,"게임":1,"갤럭시":1
        },
        find:function (word){
            let result = []
            for(var key in this.words){
                if (RegExp('^'+word).test(key.toEngKey())){
                    result.push({name: key,view:this.words[key]});
                }
            }
            return result.sort((a,b)=>b.view-a.view).filter((e,i)=>i<5);
        }
    };
    fetch('https://rosemedia121.github.io/proj/web/resource/mydict.json').then(res=>res.json()).then(jsn=>{dict.words=jsn.words.sort((a,b)=>b.view-a.view)})
    var speller = {};
    speller.train = function (text) {
      var m;
      if ((m = /[a-z:]+/g.exec(text.toLowerCase()))) {
        speller.nWords[m[0]] = speller.nWords.hasOwnProperty(m[0]) ? speller.nWords[m[0]] + 1 : 1;
      }
    };
    speller.correct = function (word) {
      if (speller.nWords.hasOwnProperty(word)) return word;
      var candidates = {}, list = speller.edits(word);
      list.forEach(function (edit) {
        if (speller.nWords.hasOwnProperty(edit)) candidates[speller.nWords[edit]] = edit;
      });
      if (speller.countKeys(candidates) > 0) return candidates[speller.max(candidates)];
      list.forEach(function (edit) {
        speller.edits(edit).forEach(function (w) {
          if (speller.nWords.hasOwnProperty(w)) candidates[speller.nWords[w]] = w;
        });
      });
      return speller.countKeys(candidates) > 0 ? candidates[speller.max(candidates)] : word;
    };
    speller.nWords = {};
    speller.countKeys = function (object) {
      var attr, count = 0;
      for (attr in object)
        if (object.hasOwnProperty(attr))
          count++;
      return count;
    };
    speller.max = function (candidates) {
      var candidate, arr = [];
      for (candidate in candidates)
        if (candidates.hasOwnProperty(candidate))
          arr.push(candidate);
      return Math.max.apply(null, arr);
    };
    speller.letters = "abcdefghijklmnopqrstuvwxyz:".split("");
    speller.edits = function (word) {
      var i, results = [];
      for (i=0; i < word.length; i++)/* Subject */
        results.push(word.slice(0, i) + word.slice(i+1));
      for (i=0; i < word.length-1; i++)/* Swap */
        results.push(word.slice(0, i) + word.slice(i+1, i+2) + word.slice(i, i+1) + word.slice(i+2));
      for (i=0; i < word.length; i++)/* Add */
        speller.letters.forEach(function (l) {
          results.push(word.slice(0, i) + l + word.slice(i+1));
        });
      for (i=0; i <= word.length; i++)/* modify */
        speller.letters.forEach(function (l) {
          results.push(word.slice(0, i) + l + word.slice(i));
        });
      return results;
    };
}())
