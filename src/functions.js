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

export const fetchPrice = async (currency, product) => {
    const BASE_URL = `https://free.currconv.com/api/v7/convert?q=${product.price_currency}_${currency}&compact=ultra&apiKey=8ebfadcff757e397a4ba`
    const symbol = getSymbolFromCurrency(currency);
    const res = await fetch(BASE_URL)
    const pdata = await res.json()
    let e = pdata[product.price_currency+'_'+currency]*product.price
    const data = {
        symbol: symbol,
        price: e.toFixed(2),
    }
    return data;
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