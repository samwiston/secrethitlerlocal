export const delFrom = (array, value) => {
    return array.filter((element) => {
        return element !== value;
    });
}