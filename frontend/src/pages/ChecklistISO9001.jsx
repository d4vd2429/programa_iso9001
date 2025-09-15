import React, { useState, useEffect } from "react";

const checklistItems = [
  { id: "4.1", text: "¿Se han determinado las cuestiones internas y externas relevantes para el propósito y dirección estratégica?" },
  { id: "4.2", text: "¿Se han identificado las necesidades y expectativas de las partes interesadas?" },
  { id: "4.3", text: "¿Se ha definido el alcance del sistema de gestión de calidad?" },
  { id: "4.4", text: "¿Se han determinado y gestionado los procesos necesarios para el sistema de gestión de calidad?" },
  { id: "5.1", text: "¿La alta dirección demuestra liderazgo y compromiso con el sistema de gestión de calidad?" },
  { id: "5.2", text: "¿Existe una política de calidad establecida, comunicada y mantenida?" },
  { id: "5.3", text: "¿Se han asignado roles, responsabilidades y autoridades dentro de la organización?" },
  { id: "6.1", text: "¿Se han abordado los riesgos y oportunidades que pueden afectar el sistema de gestión de calidad?" },
  { id: "6.2", text: "¿Se han establecido objetivos de calidad medibles y coherentes con la política de calidad?" },
  { id: "6.3", text: "¿Se han planificado los cambios necesarios en el sistema de gestión de calidad?" },
  { id: "7.1", text: "¿Se han determinado y proporcionado los recursos necesarios?" },
  { id: "7.2", text: "¿El personal es competente y recibe formación adecuada?" },
  { id: "7.3", text: "¿Se promueve la toma de conciencia sobre la calidad?" },
  { id: "7.4", text: "¿La comunicación interna y externa es eficaz?" },
  { id: "7.5", text: "¿La información documentada está controlada y disponible?" },
  { id: "8.1", text: "¿Se planifican y controlan los procesos operativos?" },
  { id: "8.2", text: "¿Se cumplen los requisitos para los productos y servicios?" },
  { id: "8.3", text: "¿Se controla el diseño y desarrollo de productos/servicios?" },
  { id: "8.4", text: "¿Se gestionan los proveedores y procesos externos?" },
  { id: "8.5", text: "¿Se controla la producción y prestación del servicio?" },
  { id: "8.6", text: "¿Se verifica la conformidad de los productos y servicios?" },
  { id: "8.7", text: "¿Se gestionan los productos/servicios no conformes?" },
  { id: "9.1", text: "¿Se realiza seguimiento, medición, análisis y evaluación del desempeño?" },
  { id: "9.2", text: "¿Se llevan a cabo auditorías internas periódicas?" },
  { id: "9.3", text: "¿La alta dirección revisa el sistema de gestión de calidad?" },
  { id: "10.1", text: "¿Se identifican y gestionan oportunidades de mejora?" },
  { id: "10.2", text: "¿Se gestionan las no conformidades y acciones correctivas?" },
  { id: "10.3", text: "¿Se mejora continuamente el sistema de gestión de calidad?" },
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
