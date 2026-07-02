import { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import type { Category } from '../types';
import './AddItemForm.css';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'pizza', label: 'Pizza' },
  { value: 'burger', label: 'Burger' },
  { value: 'hotdog', label: 'Hot dog' },
  { value: 'other', label: 'Other' },
];

export default function AddItemForm() {
  const { addMenuItem } = useOrders();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<Category>('pizza');
  const [error, setError] = useState('');

  const reset = () => {
    setName('');
    setPrice('');
    setCategory('pizza');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    const numericPrice = Number(price);

    if (!trimmed) {
      setError('Give the item a name.');
      return;
    }
    if (!price || Number.isNaN(numericPrice) || numericPrice <= 0) {
      setError('Price must be a number greater than 0.');
      return;
    }

    addMenuItem({ name: trimmed, price: numericPrice, category });
    reset();
    setOpen(false);
  };

  if (!open) {
    return (
      <button className="add-item__toggle" onClick={() => setOpen(true)}>
        + Add menu item
      </button>
    );
  }

  return (
    <form className="add-item" onSubmit={handleSubmit}>
      <div className="add-item__fields">
        <input
          className="add-item__input"
          placeholder="Item name"
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
        />
        <input
          className="add-item__input add-item__input--price"
          placeholder="Price"
          inputMode="decimal"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <select
          className="add-item__select"
          value={category}
          onChange={e => setCategory(e.target.value as Category)}
        >
          {CATEGORIES.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {error && <p className="add-item__error">{error}</p>}

      <div className="add-item__actions">
        <button type="submit" className="add-item__submit">Add to menu</button>
        <button
          type="button"
          className="add-item__cancel"
          onClick={() => { reset(); setOpen(false); }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
