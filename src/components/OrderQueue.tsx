import { useMemo } from 'react';
import { useOrders } from '../context/OrderContext';
import OrderTicket from './OrderTicket';
import './OrderQueue.css';

export default function OrderQueue() {
  const { orders, completeOrder } = useOrders();

  const sorted = useMemo(
    () => [...orders].sort((a, b) => Number(a.status === 'completed') - Number(b.status === 'completed') || b.createdAt - a.createdAt),
    [orders]
  );

  return (
    <aside className="queue">
      <div className="queue__head">
        <h2>Order rail</h2>
        <span className="queue__count">{orders.length}</span>
      </div>

      {sorted.length === 0 ? (
        <div className="queue__empty">
          <p>No tickets pinned yet.</p>
          <p className="queue__empty-sub">Send an order from the menu to start the rail.</p>
        </div>
      ) : (
        <ul className="queue__list">
          {sorted.map(order => (
            <OrderTicket key={order.id} order={order} onComplete={completeOrder} />
          ))}
        </ul>
      )}
    </aside>
  );
}
