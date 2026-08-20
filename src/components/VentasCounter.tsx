function VentasCounter() {
  let ventas = 0; 

  const registrarVenta = () => {
    ventas = ventas + 1;
    console.log(`[Variable local] ventas incrementó a: ${ventas}`);
  };

  return (
    <div className="card-body">
      <h5 className="card-title">Control de Caja y Ventas</h5>
      <p className="fs-4">
        Ventas del día: <strong>{ventas}</strong>
      </p>
      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={registrarVenta}>
          +1 venta
        </button>
      </div>
    </div>
  );
}

export default VentasCounter;
