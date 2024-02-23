import { useCart } from "@/context/CartContext";
import styles from "@/styles/Cart.module.css";

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
          <img src={item.image} alt={item.title} />
          <div>
            <h3>{item.title}</h3>
            <p>${item.price.toFixed(2)}</p>
          </div>
          <button onClick={() => removeFromCart(index)}>Remove</button>
        </div>
      ))}
      <button className={styles.checkoutButton}>Proceed to Checkout</button>
    </div>
  );
}
