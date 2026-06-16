import { create } from "zustand";

export const useStore = create((set, get) => ({
  cart: [],
  wishlist: [],
  cartOpen: false,
  searchOpen: false,
  promoCode: "",
  promoApplied: false,
  promoDiscount: 0,
  promoDiscountType: "percent", // "percent" or "value"
  promoError: "",
  toastProduct: null,
  toastOpen: false,
  toastTimeout: null,
  accountTab: "profile", // profile, wishlist, orders
  user: {
    name: "Elena Rostova",
    email: "elena.r@vogue.fr",
    phone: "+91 98765 43210",
    address: "12, Ground Floor, Lodhi Colony Market, Lodhi Estate",
    city: "New Delhi",
    state: "Delhi",
    zipCode: "110003",
    country: "India",
  },
  orders: [
    {
      id: "LUM-9843",
      date: "2026-05-12",
      total: 3299.0,
      status: "Delivered",
      items: [
        {
          id: "radiance-elixir-oil",
          name: "Radiance Elixir Oil",
          price: 3299.0,
          quantity: 1,
          size: "30ml",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9vv_Ge5iJK6pBZNUJZgVcbTco-jGsUEPzvqeeyiWKId8-JhyJQhB_LVzuaJSWfjvkJYkOfmsU-MR0a83E2ljL_t6hb5TqlK5DNKapzqVP_0cbiiWp-IS7jnvfQU8Lr6dpZeSIXZHLd1xxVCToB2ADbIs_cesPzYlofXznWV9tvDTJtBAde7irv2RWbZfUuNM_Zt-rO20ksebWF4l4DGXJp5_cDw0-1z5qff-6nSHwgt_zW5EoKXCl9YMQ6XM5fbnOGWJMHZFul2N9",
        },
      ],
    },
  ],

  // UI Actions
  setCartOpen: (isOpen) => set({ cartOpen: isOpen }),
  setSearchOpen: (isOpen) => set({ searchOpen: isOpen }),
  setAccountTab: (tab) => set({ accountTab: tab }),

  // User Actions
  updateUserProfile: (profile) =>
    set((state) => ({ user: { ...state.user, ...profile } })),

  // Cart Actions
  addToCart: (product, size = "30ml") => {
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === product.id && item.size === size
      );

      let newCart;
      if (existingItemIndex > -1) {
        newCart = [...state.cart];
        newCart[existingItemIndex].quantity += 1;
      } else {
        newCart = [
          ...state.cart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            size: size,
            quantity: 1,
            image: product.image,
            subtitle: product.subtitle || "",
          },
        ];
      }

      return { cart: newCart, toastProduct: product, toastOpen: true };
    });

    if (get().toastTimeout) {
      clearTimeout(get().toastTimeout);
    }
    const timeout = setTimeout(() => {
      set({ toastOpen: false });
    }, 3500);
    set({ toastTimeout: timeout });
  },

  removeFromCart: (productId, size) => {
    set((state) => ({
      cart: state.cart.filter((item) => !(item.id === productId && item.size === size)),
    }));
  },

  updateQuantity: (productId, size, change) => {
    set((state) => {
      const newCart = state.cart
        .map((item) => {
          if (item.id === productId && item.size === size) {
            const newQty = item.quantity + change;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      return { cart: newCart };
    });
  },

  // Wishlist Actions
  toggleWishlist: (product) => {
    set((state) => {
      const exists = state.wishlist.some((item) => item.id === product.id);
      let newWishlist;
      if (exists) {
        newWishlist = state.wishlist.filter((item) => item.id !== product.id);
      } else {
        newWishlist = [...state.wishlist, product];
      }
      return { wishlist: newWishlist };
    });
  },

  // Promo Code Actions
  applyPromoCode: (code) => {
    const formattedCode = code.trim().toUpperCase();
    if (formattedCode === "LUMIERE15") {
      set({
        promoCode: "LUMIERE15",
        promoApplied: true,
        promoDiscount: 0.15, // 15% discount
        promoDiscountType: "percent",
        promoError: "",
      });
      return true;
    } else if (formattedCode === "PRESTIGE30") {
      set({
        promoCode: "PRESTIGE30",
        promoApplied: true,
        promoDiscount: 0.30, // 30% discount
        promoDiscountType: "percent",
        promoError: "",
      });
      return true;
    } else if (formattedCode === "FLAT100") {
      set({
        promoCode: "FLAT100",
        promoApplied: true,
        promoDiscount: 100, // ₹100 flat discount
        promoDiscountType: "value",
        promoError: "",
      });
      return true;
    } else if (formattedCode === "FESTIVE250") {
      set({
        promoCode: "FESTIVE250",
        promoApplied: true,
        promoDiscount: 250, // ₹250 flat discount
        promoDiscountType: "value",
        promoError: "",
      });
      return true;
    } else {
      set({
        promoError: "Invalid promo code. Try 'FLAT100', 'FESTIVE250' or 'LUMIERE15'",
      });
      return false;
    }
  },

  clearPromoCode: () =>
    set({
      promoCode: "",
      promoApplied: false,
      promoDiscount: 0,
      promoDiscountType: "percent",
      promoError: "",
    }),

  // Order Actions
  createOrder: (shippingInfo, paymentInfo) => {
    const { cart, promoDiscount, promoDiscountType } = get();
    if (cart.length === 0) return null;

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.06;
    const discountAmount = promoDiscountType === "value" 
      ? Math.min(subtotal, promoDiscount) 
      : subtotal * promoDiscount;
    const total = Math.max(0, subtotal + tax - discountAmount);

    const newOrder = {
      id: "LUM-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().split("T")[0],
      total: parseFloat(total.toFixed(2)),
      status: "Processing",
      items: [...cart],
      shippingInfo,
    };

    set((state) => ({
      orders: [newOrder, ...state.orders],
      cart: [], // Clear cart
      promoCode: "",
      promoApplied: false,
      promoDiscount: 0,
      promoDiscountType: "percent",
      cartOpen: false,
    }));

    return newOrder;
  },
}));
