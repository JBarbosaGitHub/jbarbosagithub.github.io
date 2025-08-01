import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import euriborService from "../services/euriborService";

const EuriborStatus = ({ onRatesUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState("");
  const [isFresh, setIsFresh] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    updateStatus();
  }, []);

  const updateStatus = () => {
    setLastUpdate(euriborService.getLastUpdate());
    setIsFresh(euriborService.isDataFresh());
  };

  const handleForceUpdate = async () => {
    setIsUpdating(true);
    setError(null);
    
    try {
      await euriborService.forceUpdate();
      updateStatus();
      if (onRatesUpdate) {
        onRatesUpdate();
      }
    } catch (err) {
      setError("Erro ao atualizar taxas. Tente novamente.");
      console.error("Erro na atualização forçada:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: "#f0f8ff", 
      padding: "1rem", 
      borderRadius: "8px", 
      marginBottom: "1.5rem",
      border: "1px solid #eac862"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <h4 style={{ color: "#8cb4bc", margin: "0" }}>Taxas Euribor Atuais</h4>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <motion.div 
            style={{ 
              width: "8px", 
              height: "8px", 
              borderRadius: "50%", 
              backgroundColor: isFresh ? "#4caf50" : "#ff9800"
            }}
            animate={isUpdating ? { 
              opacity: [1, 0.5, 1],
              scale: [1, 1.2, 1]
            } : {}}
            transition={isUpdating ? { 
              duration: 1, 
              repeat: Infinity, 
              ease: "easeInOut" 
            } : {}}
          />
          <span style={{ 
            fontSize: "0.8rem", 
            color: isFresh ? "#4caf50" : "#ff9800",
            fontWeight: "500"
          }}>
            {isUpdating ? "A atualizar..." : (isFresh ? "Atualizado" : "Desatualizado")}
          </span>
        </div>
      </div>
      
      <p style={{ fontSize: "0.9rem", color: "#666", margin: "0 0 0.5rem 0" }}>
        Última atualização: {lastUpdate}
      </p>
      
      {error && (
        <p style={{ fontSize: "0.8rem", color: "#d32f2f", margin: "0 0 0.5rem 0" }}>
          {error}
        </p>
      )}
      
      <motion.button
        onClick={handleForceUpdate}
        disabled={isUpdating}
        style={{
          background: "none",
          border: "1px solid #8cb4bc",
          color: "#8cb4bc",
          padding: "4px 12px",
          borderRadius: "4px",
          fontSize: "0.8rem",
          cursor: isUpdating ? "not-allowed" : "pointer",
          opacity: isUpdating ? 0.6 : 1
        }}
        whileHover={!isUpdating ? { scale: 1.05, backgroundColor: "#8cb4bc", color: "white" } : {}}
        whileTap={!isUpdating ? { scale: 0.95 } : {}}
      >
        {isUpdating ? "Atualizando..." : "Atualizar Agora"}
      </motion.button>
    </div>
  );
};

export default EuriborStatus; 