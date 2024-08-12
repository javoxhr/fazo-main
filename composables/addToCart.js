import { useStore } from "~/store/store";

export const addToCart = (product)=> {
    const store = useStore()
    const item = toRaw(store?.cart).find(el => el.id == product.id)
    if(!item) {
        store.cart.push(product)
    } else {
        let index = store.cart.indexOf(item)
        if(store.cart[index].quantitiy < 10) {
            store.cart[index].quantitiy++
        }
        store.cart.splice(index, 1)
    }
    console.log(item)
    localStorage.setItem("cart", JSON.stringify(store.cart))
}