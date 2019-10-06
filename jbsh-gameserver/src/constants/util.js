export const delFrom = (array, value) => {
    return array.filter((element) => {
        return element !== value;
    });
}

export const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}