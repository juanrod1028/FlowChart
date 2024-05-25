import  { useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import './updatenode.css';

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

const UpdateNode = () => {
  const [nods, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgs, setEdges, onEdgesChange] = useEdgesState(edges);

  const [nodeName, setNodeName] = useState('Node 1');
  const [nodeBg, setNodeBg] = useState('#eee');
  const [nodeHidden, setNodeHidden] = useState(false);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }

        return node;
      })
    );
  }, [nodeName, setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.style = { ...node.style, backgroundColor: nodeBg };
        }

        return node;
      })
    );
  }, [nodeBg, setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          // when you update a simple type you can just update the value
          node.hidden = nodeHidden;
        }

        return node;
      })
    );
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === 'e1-2') {
          edge.hidden = nodeHidden;
        }

        return edge;
      })
    );
  }, [nodeHidden, setNodes, setEdges]);

  return (
    <ReactFlow
      nodes={nods}
      edges={edgs}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      minZoom={0.2}
      maxZoom={4}
      attributionPosition="bottom-left"
    >
      <div className="updatenode__controls">
        <label>label:</label>
        <input value={nodeName} onChange={(evt) => setNodeName(evt.target.value)} />

        <label className="updatenode__bglabel">background:</label>
        <input value={nodeBg} onChange={(evt) => setNodeBg(evt.target.value)} />

        <div className="updatenode__checkboxwrapper">
          <label>hidden:</label>
          <input
            type="checkbox"
            checked={nodeHidden}
            onChange={(evt) => setNodeHidden(evt.target.checked)}
          />
        </div>
      </div>
    </ReactFlow>
  );
};

export default UpdateNode;
