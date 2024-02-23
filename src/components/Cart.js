import { useCart } from "@/context/CartContext";
import styles from "@/styles/Cart.module.css";
import Image from "next/image";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <div className={styles.emptyCart}>Your cart is empty.</div>;
  }

  return (
    <div className={styles.cart}>
      <h2>Your Cart</h2>
      {cart.map((item, index) => (
        <div key={index} className={styles.cartItem}>
          <Image src={item.imageUrl} alt={item.name} height={100} width={100} />
          <div>
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
          </div>
          <button onClick={() => removeFromCart(index)}>Remove</button>
        </div>
      ))}
      <button className={styles.checkoutButton}>Proceed to Checkout</button>
    </div>
  );
}
