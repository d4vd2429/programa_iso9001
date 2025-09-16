import React, { useState, useEffect } from "react";

const checklistItems = [
  { id: "4.1", text: "Comprensión de la organización y de su contexto" },
  { id: "4.2", text: "Comprensión de las necesidades y expectativas de las partes interesadas" },
  { id: "4.3", text: "Determinación del alcance del sistema de gestión de la calidad" },
  { id: "4.4", text: "Sistema de gestión de la calidad y sus procesos" },
  { id: "5", text: "Liderazgo " },
  { id: "5.1", text: "Liderazgo y compromiso" },
  { id: "5.2", text: "Generalidades" },
  { id: "5.3", text: "Enfoque al cliente" },
  { id: "5.4", text: "Política " },
  { id: "5.4.1", text: "Establecimiento de la política de la calidad" },
  { id: "5.4.2", text: "Comunicación de la política de la calidad" },
  { id: "5.5", text: "Roles, responsabilidades y autoridades en la organización" },
  { id: "6", text: "Planificación" },
  { id: "6.1", text: "Acciones para abordar riesgos y oportunidades" },
  { id: "6.2", text: "Objetivos de la calidad y planificación para lograrlos" },
  { id: "6.3", text: "Planificación de los cambios" },
  { id: "7", text: "Apoyo " },
  { id: "7.1", text: "Recursos" },
  { id: "7.1.1", text: "Generalidades" },
  { id: "7.1.2", text: "Personas" },
  { id: "7.1.3", text: "Infraestructura" },
  { id: "7.1.4", text: "Ambiente para la operación de los procesos" },
  { id: "7.1.5", text: "Recursos de seguimiento y medición" },
  { id: "7.1.6", text: "Conocimientos de la organización " },
  { id: "7.2", text: "Competencia" },
  { id: "7.3", text: "Toma de conciencia" },
  { id: "7.4", text: "Comunicación" },
  { id: "7.5", text: "Información documentada" },
  { id: "7.5.1", text: "Generalidades" },
  { id: "7.5.2", text: "Creación y actualización " },
  { id: "7.5.3", text: "Control de la información documentada " },
  { id: "8", text: "Operación" },
  { id: "8.1", text: "Planificación y control operacional" },
  { id: "8.2", text: "Requisitos para los productos y servicios" },
  { id: "8.2.1", text: "Comunicación con el cliente" },
  { id: "8.2.2", text: "Determinación de los requisitos para los productos y servicios" },
  { id: "8.2.3", text: "Revisión de los requisitos para los productos y servicios" },
  { id: "8.2.4", text: "Cambios en los requisitos para los productos y servicios" },
  { id: "8.3", text: "Diseño y desarrollo de los productos y servicios" },
  { id: "8.3.1", text: "Generalidades" },
  { id: "8.3.2", text: "Planificación del diseño y desarrollo" },
  { id: "8.3.3", text: "Entradas para el diseño y desarrollo " },
  { id: "8.3.4", text: "Controles del diseño y desarrollo" },
  { id: "8.3.5", text: "Salidas del diseño y desarrollo " },
  { id: "8.3.6", text: "Cambios del diseño y desarrollo " },
  { id: "8.4", text: "Control de los procesos, productos y servicios suministrados externamente" },
  { id: "8.4.1", text: "Generalidades" },
  { id: "8.4.2", text: "Tipo y alcance del control" },
  { id: "8.4.3", text: "Información para los proveedores externos" },
  { id: "8.5", text: "Producción y provisión del servicio" },
  { id: "8.5.1", text: "Control de la producción y de la provisión del servicio" },
  { id: "8.5.2", text: "Identificación y trazabilidad" },
  { id: "8.5.3", text: "Propiedad perteneciente a los clientes o proveedores externos" },
  { id: "8.5.4", text: "Preservación" },
  { id: "8.5.5", text: "Actividades posteriores a la entrega" },
  { id: "8.5.6", text: "Control de los cambios" },
  { id: "8.6", text: "Liberación de los productos y servicios" },
  { id: "8.7", text: "Control de las salidas no conformes" },
  { id: "9", text: "Evaluación del desempeño" },
  { id: "9.1", text: "Seguimiento, medición, análisis y evaluación" },
  { id: "9.1.1", text: "Generalidades" },
  { id: "9.1.2", text: "Satisfacción del cliente" },
  { id: "9.1.3", text: "Análisis y evaluación " },
  { id: "9.2", text: "Auditoría interna" },
  { id: "9.3", text: "Revisión por la dirección" },
  { id: "9.3.1", text: "Generalidades" },
  { id: "9.3.2", text: "Entradas de la revisión por la dirección" },
  { id: "9.3.3", text: "Salidas de la revisión por la dirección" },
  { id: "10", text: "Mejora " },
  { id: "10.1", text: "Generalidades" },
  { id: "10.2", text: "No conformidad y acción correctiva" },
  { id: "10.3", text: "Mejora continua" },
];

const estados = ["Aprobado", "En proceso", "Reprobado"];

export default function ChecklistISO9001() {
  const [respuestas, setRespuestas] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // Recuperar checklist guardado
  useEffect(() => {
    const fetchChecklist = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/checklist", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          // Convertir array [{punto, estado}] a objeto { punto: estado }
          const obj = {};
          data.forEach(item => { obj[item.punto] = item.estado; });
          setRespuestas(obj);
        }
      } catch {}
      setLoading(false);
    };
    fetchChecklist();
  }, []);

  const handleChange = (id, value) => {
    setRespuestas({ ...respuestas, [id]: value });
  };

  // Guardar checklist en backend
  const handleSave = async () => {
    setSaving(true);
    setMsg("");
    try {
      const token = localStorage.getItem("token");
      const checklist = checklistItems.map(item => ({
        id: item.id,
        estado: respuestas[item.id] || ""
      }));
      const res = await fetch("/api/checklist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ checklist })
      });
      if (res.ok) setMsg("Checklist guardado correctamente.");
      else setMsg("Error al guardar el checklist.");
    } catch {
      setMsg("Error de conexión.");
    }
    setSaving(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 24 }}>
      <h2>Checklist ISO 9001 (4.1 a 10.3)</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Punto</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Pregunta</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {checklistItems.map(item => (
                <tr key={item.id}>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{item.id}</td>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{item.text}</td>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>
                    <select
                      value={respuestas[item.id] || ""}
                      onChange={e => handleChange(item.id, e.target.value)}
                    >
                      <option value="">Selecciona</option>
                      {estados.map(e => (
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleSave} disabled={saving} style={{ marginTop: 16 }}>
            {saving ? "Guardando..." : "Guardar"}
          </button>
          {msg && <p style={{ marginTop: 8 }}>{msg}</p>}
        </>
      )}
    </div>
  );
}
