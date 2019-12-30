if(!String.prototype.toEngKey){
    String.prototype.toEngKey = function(){
        let one = ["r",":r","rt","s","sw","sg","e",":e","f","fr","fa","fq","ft","fx","fv","fg","a","q",":q","qt","t",":t","d","w",":w","c","z","x","v","g","k","o","i",":o","j","p","u",":p","h","hk","ho","hl","y","n","nj","np","nl","b","m","ml","l"],
            fst_map = ["r",":r","s","e",":e","f","a","q",":q","t",":t","d","w",":w","c","z","x","v","g"],
            snd_map = ["k","o","i",":o","j","p","u",":p","h","hk","ho","hl","y","n","nj","np","nl","b","m","ml","l"],
            lst_map = [" ","r",":r","rt","s","sw","sg","e","f","fr","fa","fq","ft","fx","fv","fg","a","q","qt","t",":t","d","w","c","z","x","v","g"],
        fst, snd, lst; 
        var cnt = this.length, chars = [], cCode; 
        for (var i = 0; i < cnt; i++) { 
           cCode = this.charCodeAt(i); 
           //if (cCode == 32) { continue; } // 공백문자
           if (cCode >= 0x3131 && cCode <= 0x319E) {// 자모음 하나만 쓰일 경우
                chars.push(one[(cCode - 0x3131)]); 
           } else if (cCode < 0xAC00 || cCode > 0xD7A3) {// 한글이 아닌 경우
                chars.push(this.charAt(i)); 
                continue; 
           } 
           cCode = this.charCodeAt(i) - 0xAC00; 
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
}
if (!String.format) {
    String.format = function(formatstr, ...Strings) {
        var args = Array.prototype.slice.call(arguments, 1);
        return formatstr.replace(/{(\d+)}/g, function(match, number) { 
            return typeof args[number] != 'undefined'? args[number]: match;
        });
    };
}