export const delFrom = (array, value) => {
    return array.filter((element) => {
        return element !== value;
    });
}

export const delOneFrom = (array, value) => {
    let done = false;
    return array.filter((element) => {
        if (!done && element === value) {
            done = true;
            return false;
        } else {
            return true;
        }
    });
}

export const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export const sample = (array, howMany = 1) => {
    let selected = [];
    let remaining = [...array]; // Make a copy
    for (let i = 0; i < howMany; i++) {
        let pick = remaining[Math.floor(Math.random() * remaining.length)];
        selected.push(pick);
        delFrom(remaining, pick);
    }
    return selected;
}

export function shuffle(array) {
    let copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

export const teamDistribution = {
    // Fascist and liberal player distribution.
    // < 5 indexes exist for debug purposes only.
    1:  [0, 1],
    2:  [1, 1],
    3:  [2, 1],
    4:  [3, 1],
    5:  [3, 2],
    6:  [4, 2],
    7:  [4, 3],
    8:  [5, 3],
    9:  [5, 4],
    10: [6, 4]
}

export const policyDistribution = [
    true, true, true, true, true, true, // 6 liberal policies
    false, false, false, false, false, // 11 fascist policies
    false, false, false, false, false, 
    false
]