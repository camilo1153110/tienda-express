import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container py-5">
      <header className="pb-3 mb-4 border-bottom">
        <h1 className="display-5 fw-bold"> TiendaExpress</h1>
        <p className="lead text-muted">
           Gestión de estados
        </p>
      </header>

      <div className="p-4 mb-4 bg-light rounded-3 border">
        <div className="container-fluid py-2">
          <h2 className="h4 fw-bold">Entorno y Modelo de Datos Configurado</h2>
          <p className="col-md-10 fs-6 text-secondary">
            Estructura base del proyecto 
          </p>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item bg-transparent">
               <strong>Tipos definidos:</strong> <code>Categoria</code>, <code>Proveedor</code>, <code>Producto</code>, <code>ItemCarrito</code> en <code>src/types/tienda.ts</code>.
            </li>
            <li className="list-group-item bg-transparent">
               <strong>API simulada:</strong> Catálogo con latencia de 900ms e inmutabilidad en <code>src/api/tiendaApi.ts</code>.
            </li>
            <li className="list-group-item bg-transparent">
             <strong>Modo estricto:</strong> <code>&lt;StrictMode&gt;</code> activo en <code>src/main.tsx</code>.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
