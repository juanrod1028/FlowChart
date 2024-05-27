import data from "./data.json";

export function processJsonToNodesAndEdges() {
  const nodes = [];
  const edges = [];

  // Crear nodo de la organización
  const organizationId = "1";
  nodes.push({
    id: organizationId,
    type: "input",
    data: { label: data.Organizacion },
    position: { x: 250, y: 25 },
  });

  let nodeId = 2; // Empezar con 2 ya que 1 es para la organización
  let edgeId = 1;
  const xSpacing = 125; // Espaciado entre nodos en la dirección x

  data.Bancos.forEach((banco, bancoIndex) => {
    const bancoId = `${nodeId}`;
    nodes.push({
      id: bancoId,
      data: { label: banco.Nombre },
      position: { x: 125 + bancoIndex * xSpacing, y: 100 },
    });
    edges.push({
      id: `e${edgeId++}`,
      source: organizationId,
      target: bancoId,
      type: "smoothstep",
    });
    nodeId++;

    banco.Celulas.forEach((celula, celulaIndex) => {
      const celulaId = `${nodeId}`;
      nodes.push({
        id: celulaId,
        data: { label: celula.Nombre },
        position: { x: 125 + celulaIndex * xSpacing, y: 200 },
      });
      edges.push({
        id: `e${edgeId++}`,
        source: bancoId,
        target: celulaId,
        label: `Responsable: ${celula.PO}`,
        type: "smoothstep",
      });
      nodeId++;

      celula.Proyectos.forEach((proyecto, proyectoIndex) => {
        const proyectoId = `${nodeId}`;
        nodes.push({
          id: proyectoId,
          data: { label: proyecto.Nombre },
          position: { x: 125 + proyectoIndex * xSpacing, y: 300 },
        });
        edges.push({
          id: `e${edgeId++}`,
          source: celulaId,
          target: proyectoId,
          type: "smoothstep",
        });
        nodeId++;
        proyecto.Certificados.forEach((certificado, certificadoIndex) => {
          const certificadoId = `${nodeId}`;
          nodes.push({
            id: certificadoId,
            data: { label: certificado.Nombre },
            position: { x: 125 + certificadoIndex * xSpacing, y: 400 },
          });
          edges.push({
            id: `e${edgeId++}`,
            source: proyectoId,
            target: certificadoId,
            type: "smoothstep",
          });
          nodeId++;
          certificado.usado_por.forEach((usado_por, usado_porIndex) => {
            const usado_porId = `${nodeId}`;
            nodes.push({
              id: usado_porId,
              data: { label: usado_por.Nombre },
              position: { x: 125 + usado_porIndex * xSpacing, y: 400 },
            });
            edges.push({
              id: `e${edgeId++}`,
              source: certificadoId,
              target: usado_porId,
              type: "smoothstep",
              label: "usado por",
            });
            nodeId++;
          });
        });
      });
    });
  });

  return { nodes, edges };
}
