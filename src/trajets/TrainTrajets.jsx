import { useState } from "react";

export default function TrainTrajets() {
  const [trains, setTrains] = useState([
    {
      id: "t1",
      nom: "Buraq",
      villes: [{ nom: "rabat" }, { nom: "fes" }, { nom: "casa" }]
    },
    { id: "t2", nom: "Gazel", villes: [] },
    { id: "t3", nom: "Eagle-Wins", villes: [] },
    { id: "t4", nom: "Fennec", villes: [] }
  ]);

  const [id, setId] = useState("");
  const [train, setTrain] = useState(null);
  const [error, setError] = useState("");
  const [newVille, setNewVille] = useState("");

  const containerStyle = {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif"
  };

  const titleStyle = {
    color: "#333",
    marginBottom: "20px",
    textAlign: "center"
  };

  const formStyle = {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px"
  };

  const inputStyle = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginRight: "10px",
    width: "200px"
  };

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  };

  const trainInfoStyle = {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  };

  const villeListStyle = {
    listStyle: "none",
    padding: 0,
    marginTop: "10px"
  };

  const villeItemStyle = {
    padding: "8px",
    margin: "4px 0",
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
    border: "1px solid #dee2e6"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundTrain = trains.find((t) => t.id === id);
    if (foundTrain) {
      setTrain(foundTrain);
      setError("");
    } else {
      setTrain(null);
      setError("Train non trouvé");
    }
  };

  const handleAddVille = (e) => {
    e.preventDefault();
    if (!newVille.trim()) {
      setError("Veuillez entrer un nom de ville");
      return;
    }

    const updatedTrains = trains.map(t => {
      if (t.id === train.id) {
        return {
          ...t,
          villes: [...t.villes, { nom: newVille.trim() }]
        };
      }
      return t;
    });

    setTrains(updatedTrains);
    setTrain(updatedTrains.find(t => t.id === train.id));
    setNewVille("");
    setError("");
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Gestion des trajets de trains</h3>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label>
          Id Train
          <input 
            type="text" 
            value={id} 
            onChange={(e) => setId(e.target.value)}
            placeholder="Entrer l'ID du train"
            style={inputStyle}
          />
        </label>
        <button type="submit" style={buttonStyle}>
          Recherche
        </button>
      </form>
      
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      
      {train && (
        <>
          <div style={trainInfoStyle}>
            <div>
              <label>Nom</label>
              <input 
                type="text" 
                value={train.nom} 
                readOnly 
                style={inputStyle}
              />
            </div>
            <div>
              <label>Ville depart</label>
              <input 
                type="text" 
                value={train.villes[0]?.nom || "Non défini"} 
                readOnly 
                style={inputStyle}
              />
            </div>
            <div>
              <label>Ville terminus</label>
              <input 
                type="text" 
                value={train.villes[train.villes.length - 1]?.nom || "Non défini"} 
                readOnly 
                style={inputStyle}
              />
            </div>

            <div style={{ marginTop: "20px" }}>
              <h4>Ajouter une ville</h4>
              <form onSubmit={handleAddVille} style={formStyle}>
                <input
                  type="text"
                  value={newVille}
                  onChange={(e) => setNewVille(e.target.value)}
                  placeholder="Nom de la ville"
                  style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>
                  Ajouter
                </button>
              </form>
            </div>

            <div style={{ marginTop: "20px" }}>
              <h4>Liste des villes:</h4>
              <ul style={villeListStyle}>
                {train.villes.map((ville, index) => (
                  <li key={index} style={villeItemStyle}>
                    {ville.nom}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}