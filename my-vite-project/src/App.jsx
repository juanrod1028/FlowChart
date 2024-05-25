import ReactFlow, { MiniMap, Controls, Background } from "react-flow-renderer";

const data = {
  Organizacion: "ADL",
  Banco: "BANCO POPULAR",
  Celulas: [
    {
      Nombre: "Kronos",
      PO: "po@bancoPopular",
      Proyectos: [
        {
          nombre: "FTV2",
          usado_por: ["Lb", "CT"],
          certificados: [
            {
              nombreDelCertificado: "cert1",
              fechaDeExpiracion: "fecha",
            },
            {
              nombreDelCertificado: "cert2",
              fechaDeExpiracion: "fecha2",
            },
          ],
        },
        {
          nombre: "BIOMETRIA",
          usado_por: ["Hip", "CT"],
          certificados: [],
        },
        {
          nombre: "CONTACTABILIDAD",
          usado_por: ["Hip", "Lb"],
          certificados: [],
        },
      ],
    },
    {
      Nombre: "Libranzas",
      PO: "po_libranzas@bancoPopular",
      Proyectos: [],
    },
  ],
};

const generateNodesAndEdges = (data) => {
  const nodes = [];
  const edges = [];

  nodes.push({
    id: "1",
    type: "input",
    data: { label: data.Organizacion },
    position: { x: 250, y: 0 },
  });

  nodes.push({
    id: "2",
    data: { label: data.Banco },
    position: { x: 250, y: 100 },
  });

  data.Celulas.forEach((celula, index) => {
    const celulaId = `celula-${index}`;
    nodes.push({
      id: celulaId,
      data: { label: celula.Nombre },
      position: { x: 250, y: (index + 2) * 100 },
    });

    edges.push({
      id: `e2-${celulaId}`,
      source: "2",
      target: celulaId,
      animated: true,
    });

    celula.Proyectos.forEach((proyecto, pIndex) => {
      const proyectoId = `${celulaId}-proyecto-${pIndex}`;
      nodes.push({
        id: proyectoId,
        data: { label: proyecto.nombre },
        position: { x: 250, y: (index + 2) * 100 + (pIndex + 1) * 50 },
      });

      edges.push({
        id: `e-${celulaId}-${proyectoId}`,
        source: celulaId,
        target: proyectoId,
        animated: true,
      });
    });
  });

  console.log("Nodes:", nodes);
  console.log("Edges:", edges);

  return { nodes, edges };
};

const { nodes, edges } = generateNodesAndEdges(data);

const App = () => (
  <div style={{ height: "100vh" }}>
    <ReactFlow
      elements={[...nodes, ...edges]}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      snapToGrid={true}
      snapGrid={[15, 15]}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  </div>
);

export default App;
