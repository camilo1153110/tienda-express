import { useState, useRef } from 'react';

function VentasCounter() {
  const [ventas, setVentas] = useState(0);
  const [cajaAbierta, setCajaAbierta] = useState(true);


  const renderCount = useRef(0);
  renderCount.current += 1;
  console.log(`[VentasCounter] Render #${renderCount.current} — ventas: ${ventas}, cajaAbierta: ${cajaAbierta}`);

  const registrarVenta = () => {
    setVentas(ventas + 1);
  };

  const registrarCombo = () => {
    setVentas(ventas + 1);
    setVentas(ventas + 1);
    setVentas(ventas + 1);
  };

  const anularUltima = () => {
    setVentas(Math.max(0, ventas - 1));
  };

  
  const cerrarCaja = () => {
    console.log('--- Ejecutando cerrarCaja() [setVentas(0) + setCajaAbierta(false)] ---');
    setVentas(0);
    setCajaAbierta(false);
  };

  const reabrirCaja = () => {
    setVentas(0);
    setCajaAbierta(true);
  };

  return (
    <div className="card-body">
      <h5 className="card-title">Control de Caja y Ventas</h5>
      <p className="fs-4">
        Ventas del día: <strong>{ventas}</strong>
      </p>
      <div className="mb-3">
        <span className={`badge ${cajaAbierta ? 'bg-success' : 'bg-secondary'}`}>
          {cajaAbierta ? 'Caja abierta' : 'Caja cerrada'}
        </span>
      </div>

     

      <div className="d-flex gap-2 flex-wrap">
        <button className="btn btn-primary" onClick={registrarVenta} disabled={!cajaAbierta}>
          +1 venta
        </button>
        <button className="btn btn-info text-white" onClick={registrarCombo} disabled={!cajaAbierta}>
          Combo (+3) 
        </button>
        <button className="btn btn-warning" onClick={anularUltima} disabled={!cajaAbierta}>
          Anular última
        </button>
        <button className="btn btn-danger" onClick={cerrarCaja} disabled={!cajaAbierta}>
          Cerrar caja
        </button>
        {!cajaAbierta && (
          <button className="btn btn-success" onClick={reabrirCaja}>
            Reabrir caja
          </button>
        )}
      </div>
    </div>
  );
}

export default VentasCounter;
