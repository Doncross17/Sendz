import { createContext, useContext, useReducer, useMemo } from 'react'

const CartContext = createContext(null)

const initialState = {
    items: [],
}

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existing = state.items.find(i => i.id === action.payload.id)
            if (existing) {
                return {
                    ...state,
                    items: state.items.map(i =>
                        i.id === action.payload.id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    ),
                }
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }],
            }
        }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(i => i.id !== action.payload),
            }
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items
                    .map(i =>
                        i.id === action.payload.id
                            ? { ...i, quantity: Math.max(0, action.payload.quantity) }
                            : i
                    )
                    .filter(i => i.quantity > 0),
            }
        case 'CLEAR_CART':
            return { ...state, items: [] }
        default:
            return state
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    const value = useMemo(() => {
        const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
        const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

        return {
            items: state.items,
            totalItems,
            subtotal,
            addItem: (product) => dispatch({ type: 'ADD_ITEM', payload: product }),
            removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
            updateQuantity: (id, quantity) =>
                dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }),
            clearCart: () => dispatch({ type: 'CLEAR_CART' }),
        }
    }, [state.items])

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within CartProvider')
    return context
}
