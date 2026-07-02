import { useState } from 'react';
import type { Pizza } from '../types';
import './MenuItemCard.css';

const CATEGORY_ICON: Record<string, string> = {
  pizza: '🍕',
  burger: '🍔',
  hotdog: '🌭',
  other: '🍽️',
};

type Props = {
  item: Pizza;
  onOrder: (name: string) => void;
};

export default function MenuItemCard({ item, onOrder }: Props) {
  const [justOrdered, setJustOrdered] = useState(false);

  const handleClick = () => {
    onOrder(item.name);
    setJustOrdered(true);
    setTimeout(() => setJustOrdered(false), 700);
  };

  return (
    <article className="menu-card">
      <div className="menu-card__icon">{CATEGORY_ICON[item.category ?? 'other']}</div>
      <div className="menu-card__body">
        <h3 className="menu-card__name">{item.name}</h3>
        <span className="menu-card__price">${item.price.toFixed(2)}</span>
      </div>
      <button
        className={`menu-card__cta ${justOrdered ? 'menu-card__cta--pop' : ''}`}
        onClick={handleClick}
      >
        {justOrdered ? 'Sent ✓' : 'Send to kitchen'}
      </button>
    </article>
  );
}
