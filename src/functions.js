import getSymbolFromCurrency from 'currency-symbol-map';

export const groupBy = (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}



export const getMainCategories = (categories) => {
    let main = [];
    categories.forEach(category => {
        if (category.main_category) {
            main.push(category)
        }
    })
    
    if (main.length < 3 && categories.length >= 3) {
        while(main.length < 3) {
            main.push(categories[categories.length-1])
        }
        return main.slice(0.3);
    }
    return main.slice(0.3);
}