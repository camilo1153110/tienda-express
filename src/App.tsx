import Card from './components/Card';
import VentasCounter from './components/VentasCounter';

function App() {
  return (
    <div className="container-fluid p-4">
      <nav className="navbar navbar-dark bg-dark px-3 mb-4 rounded">
        <span className="navbar-brand mb-0 h1">TiendaExpress — Terminal de Punto de Venta</span>
      </nav>

      <div className="row">
        <div className="col-md-5">
          <Card>
            <VentasCounter />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
