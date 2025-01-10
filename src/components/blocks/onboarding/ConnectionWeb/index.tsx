"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Sparkles,
  Link as LinkIcon,
  Zap,
  Clock,
  Target,
  CheckCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// We define our interfaces to clearly structure the data
interface ProjectNode {
  id: string;
  type: "vision" | "task" | "resource" | "milestone";
  title: string;
  description: string;
  status: "active" | "pending" | "completed";
  position: { x: number; y: number };
}

interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
  type: "depends" | "influences" | "enables" | "blocks";
  strength: number;
}

// Example data structure to demonstrate the component
const exampleData = {
  nodes: [
    {
      id: "1",
      type: "vision",
      title: "Recipe Website",
      description: "A platform for sharing recipes",
      status: "active",
      position: { x: 400, y: 300 },
    },
    {
      id: "2",
      type: "task",
      title: "User Authentication",
      description: "Implement secure login system",
      status: "pending",
      position: { x: 600, y: 200 },
    },
    {
      id: "3",
      type: "resource",
      title: "Database Design",
      description: "Schema for recipe storage",
      status: "active",
      position: { x: 200, y: 400 },
    },
    {
      id: "4",
      type: "milestone",
      title: "MVP Launch",
      description: "Initial feature set ready",
      status: "pending",
      position: { x: 500, y: 500 },
    },
  ],
  connections: [
    {
      id: "c1",
      sourceId: "1",
      targetId: "2",
      type: "enables",
      strength: 0.8,
    },
    {
      id: "c2",
      sourceId: "2",
      targetId: "4",
      type: "depends",
      strength: 1,
    },
    {
      id: "c3",
      sourceId: "3",
      targetId: "4",
      type: "enables",
      strength: 0.6,
    },
  ],
};

const ConnectionWeb: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper function to get node position considering container bounds
  const getNodePosition = (node: ProjectNode) => {
    if (!containerRef.current) return node.position;
    const bounds = containerRef.current.getBoundingClientRect();
    return {
      x: (node.position.x / 800) * bounds.width,
      y: (node.position.y / 600) * bounds.height,
    };
  };

  // Function to generate the SVG path between two nodes
  const createPath = (start: ProjectNode, end: ProjectNode) => {
    const startPos = getNodePosition(start);
    const endPos = getNodePosition(end);

    // Create a curved path
    const midX = (startPos.x + endPos.x) / 2;
    const midY = (startPos.y + endPos.y) / 2;
    const curvature = 50;

    return `M ${startPos.x} ${startPos.y} 
            Q ${midX} ${midY - curvature} ${endPos.x} ${endPos.y}`;
  };

  // Get connection style based on type and state
  const getConnectionStyle = (connection: Connection) => {
    const baseStyle = "stroke-2 transition-all duration-300";
    const isHovered = hoveredConnection === connection.id;
    const isRelated =
      selectedNode &&
      (connection.sourceId === selectedNode ||
        connection.targetId === selectedNode);

    if (isHovered) return `${baseStyle} stroke-purple-500 stroke-[3]`;
    if (isRelated) return `${baseStyle} stroke-blue-400 stroke-[2]`;
    return `${baseStyle} stroke-gray-300`;
  };

  // Get icon based on node type
  const getNodeIcon = (type: ProjectNode["type"]) => {
    switch (type) {
      case "vision":
        return <Sparkles className="h-5 w-5 text-purple-500" />;
      case "task":
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case "resource":
        return <Zap className="h-5 w-5 text-green-500" />;
      case "milestone":
        return <Target className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="w-full h-[600px] bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="h-full relative" ref={containerRef}>
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                className="fill-current text-gray-400"
              />
            </marker>
          </defs>
          {exampleData.connections.map((connection) => {
            const sourceNode = exampleData.nodes.find(
              (n) => n.id === connection.sourceId
            );
            const targetNode = exampleData.nodes.find(
              (n) => n.id === connection.targetId
            );
            if (!sourceNode || !targetNode) return null;

            return (
              <motion.path
                key={connection.id}
                d={createPath(sourceNode, targetNode)}
                className={getConnectionStyle(connection)}
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                markerEnd="url(#arrowhead)"
                onMouseEnter={() => setHoveredConnection(connection.id)}
                onMouseLeave={() => setHoveredConnection(null)}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        <AnimatePresence>
          {exampleData.nodes.map((node) => {
            const position = getNodePosition(node);

            return (
              <motion.div
                key={node.id}
                className="absolute"
                style={{
                  left: position.x,
                  top: position.y,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-shadow duration-200
                    ${selectedNode === node.id ? "ring-2 ring-purple-500 shadow-lg" : ""}
                    ${
                      node.status === "completed"
                        ? "bg-green-50"
                        : node.status === "pending"
                          ? "bg-yellow-50"
                          : "bg-white"
                    }
                  `}
                  onClick={() =>
                    setSelectedNode(node.id === selectedNode ? null : node.id)
                  }
                >
                  <div className="flex items-center space-x-2">
                    {getNodeIcon(node.type)}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {node.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {node.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ConnectionWeb;
