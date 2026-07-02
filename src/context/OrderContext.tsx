import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Order, Pizza } from '../types';
import { initialMenu } from '../data/menu';

const STARTING_CASH = 100;

type OrderContextValue = {
  menu: Pizza[];
  orders: Order[];
  cashInRegister: number;
  addMenuItem: (item: Omit<Pizza, 'id'>) => Pizza;
  placeOrder: (pizzaName: string) => Order | null;
  completeOrder: (orderId: number) => Order | null;
  getPizzaDetails: (identifier: number | string) => Pizza | undefined;
};

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState<Pizza[]>(initialMenu);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cashInRegister, setCashInRegister] = useState(STARTING_CASH);
  const [nextMenuId, setNextMenuId] = useState(initialMenu.length + 1);
  const [nextOrderId, setNextOrderId] = useState(1);

  const addMenuItem = useCallback((item: Omit<Pizza, 'id'>) => {
    const newItem: Pizza = { id: nextMenuId, ...item };
    setMenu(prev => [...prev, newItem]);
    setNextMenuId(id => id + 1);
    return newItem;
  }, [nextMenuId]);

  const getPizzaDetails = useCallback((identifier: number | string) => {
    if (typeof identifier === 'number') {
      return menu.find(pizza => pizza.id === identifier);
    }
    return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase());
  }, [menu]);

  const placeOrder = useCallback((pizzaName: string) => {
    const pizza = menu.find(p => p.name === pizzaName);
    if (!pizza) return null;

    const order: Order = { id: nextOrderId, pizza, status: 'ordered', createdAt: Date.now() };
    setOrders(prev => [...prev, order]);
    setNextOrderId(id => id + 1);
    setCashInRegister(cash => cash + pizza.price);
    return order;
  }, [menu, nextOrderId]);

  const completeOrder = useCallback((orderId: number) => {
    let completed: Order | null = null;
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        completed = { ...order, status: 'completed' };
        return completed;
      }
      return order;
    }));
    return completed;
  }, []);

  const value = useMemo<OrderContextValue>(() => ({
    menu,
    orders,
    cashInRegister,
    addMenuItem,
    placeOrder,
    completeOrder,
    getPizzaDetails,
  }), [menu, orders, cashInRegister, addMenuItem, placeOrder, completeOrder, getPizzaDetails]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within an OrderProvider');
  return ctx;
}
