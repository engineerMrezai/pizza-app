import { useEffect, useRef, useState } from 'react';
import { useOrders } from '../context/OrderContext';
import './Header.css';

export default function Header() {
  const { cashInRegister, orders } = useOrders();
  const [ticking, setTicking] = useState(false);
  const prevCash = useRef(cashInRegister);

  useEffect(() => {
    if (cashInRegister !== prevCash.current) {
      prevCash.current = cashInRegister;
      setTicking(true);
      const t = setTimeout(() => setTicking(false), 550);
      return () => clearTimeout(t);
    }
  }, [cashInRegister]);

  const openCount = orders.filter(o => o.status === 'ordered').length;

  return (
    <header className="header">
      <div className="header__flame" aria-hidden="true" />
      <div className="header__inner">
        <div className="header__brand">
          <span className="header__mark">🔥</span>
          <div>
            <h1 className="header__title">Forno Rosso</h1>
            <p className="header__tagline">wood-fired counter &amp; order rail</p>
          </div>
        </div>

        <div className="header__stats">
          <div className="register">
            <span className="register__label">Register</span>
            <span className={`register__value ${ticking ? 'register__value--tick' : ''}`}>
              ${cashInRegister.toFixed(2)}
            </span>
          </div>
          {openCount > 0 && (
            <div className="header__badge">
              <span className="header__badge-dot" />
              {openCount} open
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
