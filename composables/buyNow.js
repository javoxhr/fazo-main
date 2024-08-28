import { useStore } from "~/store/store";

export const buyNow = (product)=> {
    const store = useStore()
    const item = toRaw(store?.cart).find(el => el.id == product.id)
    if(!item) {
        store.cart.push(product)
    }
    console.log(item)
    localStorage.setItem("cart", JSON.stringify(store.cart))
}