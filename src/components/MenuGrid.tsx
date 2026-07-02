import { useOrders } from '../context/OrderContext';
import MenuItemCard from './MenuItemCard';
import './MenuGrid.css';

export default function MenuGrid() {
  const { menu, placeOrder } = useOrders();

  return (
    <section className="menu-grid-section">
      <div className="menu-grid-section__head">
        <h2>Menu</h2>
        <p>Tap an item to fire an order straight to the queue.</p>
      </div>
      <div className="menu-grid">
        {menu.map(item => (
          <MenuItemCard key={item.id} item={item} onOrder={placeOrder} />
        ))}
      </div>
    </section>
  );
}
