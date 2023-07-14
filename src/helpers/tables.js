export const getValueObject = (id, auxObject) => {
    let tempValue = { ...auxObject }
    let propsObject = id.split('.')

    for (let index = 0; index < propsObject.length; index++) {
        tempValue = tempValue[propsObject[index]]
        if (tempValue === null) {
            return ""
        }
    }
    return tempValue
}

function descendingComparator(a, b, orderBy) {
    if (getValueObject(orderBy, b) < getValueObject(orderBy, a)) {//usamos getValueObject para poder obtener los valores de propiedades de un objeto que son un objeto
        return -1;
    }
    if (getValueObject(orderBy, b) > getValueObject(orderBy, a)) {
        return 1;
    }
    // if (b[orderBy] < a[orderBy]) {
    //     return -1;
    // }
    // if (b[orderBy] > a[orderBy]) {
    //     return 1;
    // }
    return 0;
}

export function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}