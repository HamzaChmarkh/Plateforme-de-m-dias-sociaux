import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";

const Personne = () => {
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [showForm, setShowForm] = useState(false);
  const [personneid, setId] = useState('');
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [personnes, setUsers] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://localhost:8081/api/v1/personne/getall");
    setUsers(result.data);
    console.log(result.data);
  }

  const getPersonneNames = () => {
    return personnes.map(personne => personne.nom);
    
  };
  return {
    getPersonneNames: getPersonneNames
  };

  
};

export default Personne;
