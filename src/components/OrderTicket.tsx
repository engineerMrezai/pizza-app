import { useMemo } from 'react';
import type { Order } from '../types';
import './OrderTicket.css';

type Props = {
  order: Order;
  onComplete: (id: number) => void;
};

export default function OrderTicket({ order, onComplete }: Props) {
  const tilt = useMemo(() => (Math.random() * 3 - 1.5).toFixed(2), [order.id]);
  const time = useMemo(
    () => new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    [order.createdAt]
  );

  return (
    <li
      className={`ticket ${order.status === 'completed' ? 'ticket--done' : ''}`}
      style={{ '--tilt': `${tilt}deg` } as React.CSSProperties}
    >
      <span className="ticket__pin" aria-hidden="true" />
      <div className="ticket__row">
        <span className="ticket__id">#{String(order.id).padStart(3, '0')}</span>
        <span className="ticket__time">{time}</span>
      </div>
      <p className="ticket__name">{order.pizza.name}</p>
      <span className="ticket__price">${order.pizza.price.toFixed(2)}</span>

      {order.status === 'ordered' ? (
        <button className="ticket__complete" onClick={() => onComplete(order.id)}>
          Mark ready
        </button>
      ) : (
        <span className="ticket__stamp">Done</span>
      )}
    </li>
  );
}
