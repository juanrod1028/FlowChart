import { processJsonToNodesAndEdges } from "../processData";

const { nodes } = processJsonToNodesAndEdges();

export default nodes.map((node, index) => ({
  ...node,
  position: {
    x: node.position.x + index * 50,
    y: node.position.y + index * 50,
  }, // Ajusta las posiciones para evitar superposición
}));
