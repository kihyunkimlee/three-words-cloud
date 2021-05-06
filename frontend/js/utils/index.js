export function date2Str(d){
    const yyyy = d.getFullYear();
    const MM = makeTwoDigitNum(d.getMonth() + 1);
    const dd = makeTwoDigitNum(d.getDate());
    const hh = makeTwoDigitNum(d.getHours());
    const mm = makeTwoDigitNum(d.getMinutes());
    const ss = makeTwoDigitNum(d.getSeconds());

    return yyyy + '/' + MM + '/' + dd + ' ' + hh + ':' + mm + ':' + ss;
};

export function makeTwoDigitNum(num){
    return ('0' + num).slice(-2);
};

export function abbreviateStr(str, maxLength){
    if (maxLength >= str.length){
        return str;
    } else{
        if (maxLength % 2 == 0){
            const size = (maxLength-4) / 2;

            return str.substr(0, size+1) + '...' + str.substr(-size);
        } else {
            const size = (maxLength-3) / 2;

            return str.substr(0, size) + '...' + str.substr(-size);
        }
    }
};

export function num2FileUnits(num){
    const units = ['B', 'KB', 'MB', 'GB'];

    let index = 0;
    while(index < 4 && num >= 1000){
        index += 1;
        num /= 1000;
    }

    return Math.round(num) + units[index];
};