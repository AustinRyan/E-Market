import React from "react";
import Link from "next/link";
import styles from "@/styles/Navbar.module.css";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.length;

  return (
    <nav className={styles.nav}>
      <Link href="/" passHref legacyBehavior>
        <a className={styles.logo}>
          <Image
            src="/logo.webp"
            alt="E-Market Logo"
            className={styles.logoImage}
            width={50}
            height={50}
          />
        </a>
      </Link>
      <div className={styles.navLinks}>
        <Link href="/" passHref legacyBehavior>
          <a className={styles.navLinkItem}>Home</a>
        </Link>
        <Link href="/products" passHref legacyBehavior>
          <a className={styles.navLinkItem}>Products</a>
        </Link>
        <Link href="/cart" passHref legacyBehavior>
          <a className={styles.cartIcon}>Cart({itemCount})</a>
        </Link>
      </div>
    </nav>
  );
}
