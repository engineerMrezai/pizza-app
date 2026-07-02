import { OrderProvider } from './context/OrderContext';
import Header from './components/Header';
import MenuGrid from './components/MenuGrid';
import OrderQueue from './components/OrderQueue';
import AddItemForm from './components/AddItemForm';
import './App.css';

function App() {
  return (
    <OrderProvider>
      <Header />
      <main className="layout">
        <div className="layout__menu">
          <MenuGrid />
          <AddItemForm />
        </div>
        <OrderQueue />
      </main>
      <footer className="footer">
        <p>Forno Rosso — every order pinned, every ticket honored.</p>
      </footer>
    </OrderProvider>
  );
}

export default App;
