import React, { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const tareasAlmacenadas = localStorage.getItem("tareas");
    if (tareasAlmacenadas) {
      setTareas(JSON.parse(tareasAlmacenadas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  const handleAgregarTarea = (texto) => {
    if (!texto) return;
    const nuevaTarea = {
      texto,
      completado: false,
    };
    const nuevasTareas = [...tareas, nuevaTarea];
    setTareas(nuevasTareas);
  };

  const handleEliminarTarea = (indice) => {
    const nuevasTareas = tareas.filter((tarea, i) => i !== indice);
    setTareas(nuevasTareas);
  };

  const handleMarcarCompletada = (indice) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[indice].completado = !nuevasTareas[indice].completado;
    setTareas(nuevasTareas);
  };

  return (
    <div className="container">
      <h1>Lista de tareas</h1>
      <ul className="lista-tareas">
        {tareas.map((tarea, indice) => (
          <li key={indice} className={tarea.completado ? "tachado" : ""}>
            <input
              type="checkbox"
              checked={tarea.texto}
              onChange={() => handleMarcarCompletada(indice)}
            />
            {tarea.texto}
            <button onClick={() => handleEliminarTarea(indice)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div className="nueva-tarea">
        <input
          type="text"
          placeholder="Agregar nueva tarea"
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleAgregarTarea(event.target.value);
              event.target.value = "";
            }
          }}
        />
        <button onClick={(e) => handleAgregarTarea(e.target.value)}>Agregar</button>
      </div>
    </div>
  );
};

export default App;
