import { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Failed to parse cart", e);
            localStorage.removeItem('cart');
            return [];
        }
    });

    const toast = useToast();

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product, quantityToAdd = 1) => {
        let toastMessage = '';
        let toastType = 'success';

        setItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            const newQuantity = existing ? existing.quantity + quantityToAdd : quantityToAdd;

            // Validate max quantity (use product stock if available, otherwise default to 100)
            const maxQty = product.stock || 100;
            if (newQuantity > maxQty) {
                toastMessage = `Maximum ${maxQty} items available`;
                toastType = 'warning';

                // Add to max available instead of rejecting
                const finalQuantity = Math.min(newQuantity, maxQty);
                if (existing) {
                    return prev.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: finalQuantity }
                            : item
                    );
                }
                return [...prev, { ...product, quantity: finalQuantity }];
            }

            // Success message
            if (existing) {
                toastMessage = `Updated ${product.name} quantity`;
            } else {
                toastMessage = `${product.name} added to cart!`;
            }

            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: newQuantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity: quantityToAdd }];
        });

        // Show toast after state update
        if (toast && toastMessage) {
            setTimeout(() => {
                toast.addToast(toastMessage, toastType, 2000);
            }, 0);
        }
    };

    const removeFromCart = (id) => {
        const item = items.find(item => item.id === id);
        setItems(prev => prev.filter(item => item.id !== id));

        if (toast && item) {
            toast.addToast(`${item.name} removed from cart`, 'info', 2000);
        }
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;

        let toastMessage = '';

        setItems(prev => prev.map(item => {
            if (item.id === id) {
                // Validate max quantity
                const maxQty = item.stock || 100;
                const finalQuantity = Math.min(quantity, maxQty);

                if (finalQuantity < quantity && toast) {
                    toastMessage = `Maximum ${maxQty} items available`;
                }

                return { ...item, quantity: finalQuantity };
            }
            return item;
        }));

        if (toast && toastMessage) {
            setTimeout(() => {
                toast.addToast(toastMessage, 'warning', 2000);
            }, 0);
        }
    };

    const clearCart = () => {
        setItems([]);
        if (toast) {
            toast.addToast('Cart cleared', 'info', 2000);
        }
    };

    const total = items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, count }}>
            {children}
        </CartContext.Provider>
    );
}
