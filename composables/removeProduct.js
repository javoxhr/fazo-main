import { useStore } from "~/store/store";

export const removeProduct = (product)=> {
    const store = useStore()
    const item = toRaw(store.cart).find(el => el.id == product.id)
    if(item) {
        const index = store.cart.indexOf(item)
        if(index != -1) {
            store.cart.splice(index, 1)
            store.cart = [...store.cart]
            localStorage.setItem("cart", JSON.stringify(store.cart))
        }
    }
}