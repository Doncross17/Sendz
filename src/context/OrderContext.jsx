import { createContext, useContext, useReducer, useMemo, useCallback } from 'react'

const OrderContext = createContext(null)

const initialState = {
    orders: [],
}

const ORDER_STATUSES = ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered']

function getRandomStatus() {
    const idx = Math.floor(Math.random() * 3) + 1
    return ORDER_STATUSES[idx]
}

function orderReducer(state, action) {
    switch (action.type) {
        case 'PLACE_ORDER': {
            const order = {
                id: `ORD-${Date.now().toString(36).toUpperCase()}`,
                items: action.payload.items,
                subtotal: action.payload.subtotal,
                shipping: action.payload.shipping,
                total: action.payload.total,
                shippingInfo: action.payload.shippingInfo,
                status: 'Confirmed',
                date: new Date().toISOString(),
                estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            }
            return { ...state, orders: [order, ...state.orders] }
        }
        case 'SIMULATE_PROGRESS': {
            return {
                ...state,
                orders: state.orders.map(o => {
                    if (o.id === action.payload) {
                        const currentIdx = ORDER_STATUSES.indexOf(o.status)
                        if (currentIdx < ORDER_STATUSES.length - 1) {
                            return { ...o, status: ORDER_STATUSES[currentIdx + 1] }
                        }
                    }
                    return o
                }),
            }
        }
        default:
            return state
    }
}

export { ORDER_STATUSES }

export function OrderProvider({ children }) {
    const [state, dispatch] = useReducer(orderReducer, initialState)

    const placeOrder = useCallback((orderData) => {
        dispatch({ type: 'PLACE_ORDER', payload: orderData })
    }, [])

    const simulateProgress = useCallback((orderId) => {
        dispatch({ type: 'SIMULATE_PROGRESS', payload: orderId })
    }, [])

    const value = useMemo(() => ({
        orders: state.orders,
        placeOrder,
        simulateProgress,
    }), [state.orders, placeOrder, simulateProgress])

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrders() {
    const context = useContext(OrderContext)
    if (!context) throw new Error('useOrders must be used within OrderProvider')
    return context
}
