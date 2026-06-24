import { createContext, useContext, useState } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setItems((prev) => {
      if (prev.length === 0) {
        return [{ ...item, quantity: 1 }];
      }

      const retailerId =
        prev[0].retailerId;

      if (
        retailerId !== item.retailerId
      ) {
        alert(
          "You can only order from one retailer at a time."
        );

        return prev;
      }

      const existing = prev.find(
        (p) => p.id === item.id
      );

      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? {
                ...p,
                quantity:
                  p.quantity + 1,
              }
            : p
        );
      }

      return [
        ...prev,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const removeFromCart = (
    id: string
  ) => {
    setItems((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        clearCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}