import { useCart } from "@/context/CartContext";
import styles from "@/styles/Cart.module.css";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";

export default function Cart() {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <div className={styles.emptyCart}>Your cart is empty.</div>;
  }
  async function handleCheckout() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart }),
    });

    const { sessionId } = await res.json();
    const stripe = await stripePromise; // This now waits for the promise to resolve
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) console.error(error);
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
      <button
        className={styles.checkoutButton}
        onClick={() => handleCheckout()}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
