import data from "./data.json";

export function processJsonToNodesAndEdges() {
  const nodes = [];
  const edges = [];

  // Create organization node
  const organizationId = "1";
  nodes.push({
    id: organizationId,
    type: "input",
    data: { label: data.Organizacion },
    position: { x: 250, y: 25 },
  });

  let nodeId = 2; // Start with 2 since 1 is for organization
  let edgeId = 1;
  const xSpacing = 125; // Spacing between nodes in x direction

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
    });
    nodeId++;
    banco.Celulas.forEach((celula, celulaIndex) => {
      const celulaId = `${nodeId}`;
      nodes.push({
        id: celulaId,
        data: { label: celula.Nombre },
        position: { x: 125 + celulaIndex * xSpacing, y: 100 },
      });
      edges.push({
        id: `e${edgeId++}`,
        source: bancoId,
        target: celulaId,
        label: `Responsable: ${celula.PO}`,
      });
      nodeId++;

      celula.Proyectos.forEach((proyecto, proyectoIndex) => {
        const proyectoId = `${nodeId}`;
        nodes.push({
          id: proyectoId,
          data: { label: proyecto.Nombre },
          position: { x: 125 + proyectoIndex * xSpacing, y: 100 },
        });
        edges.push({
          id: `e${edgeId++}`,
          source: celulaId,
          target: proyectoId,
        });
        nodeId++;
      });
    });
  });

  return { nodes, edges };
}
