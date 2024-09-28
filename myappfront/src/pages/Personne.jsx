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

  function clearForm() {
    setId("");
    setPrenom("");
    setNom("");
    setEmail("");
    setPassword("");
    setImage("");
  }

  function cancel() {
    setShowForm(false);
    setFormMode('add');
    clearForm();
  }

  async function save(event) {
    event.preventDefault();

    // Vérification des champs obligatoires
    if (!prenom || !nom || !email || !password || !image) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      await axios.post("http://localhost:8081/api/v1/personne/save", {
        prenom: prenom,
        nom: nom,
        email: email,
        password: password,
        image: image
      });
      alert("Enregistrement de la personne réussi");
      clearForm();
      Load();
    } catch (err) {
      alert("Échec de l'enregistrement de la personne");
    }
  }

  async function editPersonne(personne) {
    setPrenom(personne.prenom);
    setNom(personne.nom);
    setEmail(personne.email);
    setPassword(personne.password);
    setImage(personne.image);
    setId(personne._id);
    setShowForm(true);
    setFormMode('edit');
  }

  async function deletePersonne(personneid) {
    await axios.delete("http://localhost:8081/api/v1/personne/delete/" + personneid);
    alert("Personne supprimée avec succès");
    Load();
  }

  async function update(event) {
    event.preventDefault();

    // Vérification des champs obligatoires
    if (!prenom || !nom || !email || !password || !image) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      await axios.put("http://localhost:8081/api/v1/personne/edit/" + personneid, {
        prenom: prenom,
        nom: nom,
        email: email,
        password: password,
        image: image
      });
      alert("Mise à jour de la personne réussie");
      clearForm();
      setShowForm(false);
      setFormMode('add');
      Load();
    } catch (err) {
      alert("Échec de la mise à jour de la personne");
    }
  }
  

  return (
    <div style={{ maxWidth: '100%', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
        <div style={{ width: '75%', margin: '0 auto' }}>
          <h1 style={{ color: '#142d4c', textAlign: 'center', marginBottom: '20px' }}>Détails Personnes</h1>

          <button
            style={{
              backgroundColor: '#142d4c',
              color: '#fff',
              padding: '10px',
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              boxSizing: 'border-box',
              fontSize: '1em',
              cursor: 'pointer',
            }}
            onClick={() => setShowForm(true)}
          >
            Ajouter Personne
          </button>

          {showForm && (
            <div style={{ background: '#385170', borderRadius: '10px', padding: '20px', margin: '15px 0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <form>
                <div style={{ color: '#ececec', marginBottom: '15px' }}>
                  <label htmlFor="prenom">Personne Prénom</label>
                  <br /><br />
                  <input
                    type="text"
                    id="prenom"
                    value={prenom}
                    onChange={(event) => {
                      setPrenom(event.target.value);
                    }}
                    style={{ width: '97%', padding: '8px', borderRadius: '5px' }}
                  />
                </div>
                <div style={{ color: '#ececec', marginBottom: '15px' }}>
                  <label htmlFor="nom">Personne Nom</label>
                  <br /><br />
                  <input
                    type="text"
                    id="nom"
                    value={nom}
                    onChange={(event) => {
                      setNom(event.target.value);
                    }}
                    style={{ width: '97%', padding: '8px', borderRadius: '5px' }}
                  />
                </div>
                <div style={{ color: '#ececec', marginBottom: '15px' }}>
                  <label htmlFor="email">Personne Email</label>
                  <br /><br />
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    style={{ width: '97%', padding: '8px', borderRadius: '5px' }}
                  />
                </div>
                <div style={{ color: '#ececec', marginBottom: '15px' }}>
                  <label htmlFor="password">Personne Mot de Passe</label>
                  <br /><br />
                  <input
                    type="text"
                    id="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    style={{ width: '97%', padding: '8px', borderRadius: '5px' }}
                  />
                </div>
                <div style={{ color: '#ececec', marginBottom: '15px' }}>
                  <label htmlFor="image">Personne Image</label>
                  <br /><br />
                  <input
                    type="text"
                    id="image"
                    value={image}
                    onChange={(event) => {
                      setImage(event.target.value);
                    }}
                    style={{ width: '97%', padding: '8px', borderRadius: '5px' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {formMode === 'add' ? (
                    <>
                      <button style={{ background: '#ececec', color: '#000', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} onClick={save}>
                        Enregistrer
                      </button>
                      <button style={{ background: '#ececec', color: '#000', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} onClick={cancel}>
                        Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button style={{ background: '#ececec', color: '#000', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} onClick={update}>
                        Mettre à jour
                      </button>
                      <button style={{ background: '#ececec', color: '#000', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} onClick={cancel}>
                        Annuler
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
            
          )}

          <br />
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', border: '4px solid #142d4c', marginTop: '20px', overflow: 'hidden' }} className="table table-dark">
            <thead style={{ backgroundColor: '#142d4c', color: 'white', fontSize: '18px' }}>
              <tr>
                <th style={{ padding: '15px', border: '1px solid #ddd' }}>Prénom </th>
                <th style={{ padding: '15px', border: '1px solid #ddd' }}>Nom </th>
                <th style={{ padding: '15px', border: '1px solid #ddd' }}>Email </th>
                <th style={{ padding: '15px', border: '1px solid #ddd' }}>Mot de Passe </th>
                <th style={{ padding: '15px', border: '1px solid #ddd' }}>Image </th>
                <th style={{ padding: '15px', border: '1px solid #ddd' }}>Option</th>
              </tr>
            </thead>
            {personnes.map((personne) => (
              <tbody key={personne._id}>
                <tr>
                  <td style={{ padding: '15px', border: '1px solid #ddd' }}>{personne.prenom}</td>
                  <td style={{ padding: '15px', border: '1px solid #ddd' }}>{personne.nom}</td>
                  <td style={{ padding: '15px', border: '1px solid #ddd' }}>{personne.email}</td>
                  <td style={{ padding: '15px', border: '1px solid #ddd' }}>{personne.password}</td>
                  <td style={{ padding: '15px', border: '1px solid #ddd' }}>{personne.image}</td>
                  <td style={{ padding: '15px', border: '1px solid #ddd' }}>
                   <button style={{ backgroundColor: '#385170', color: '#fff', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginRight: '5px' }} type="button" onClick={() => editPersonne(personne)}>
                      Éditer
                    </button>
                    <button style={{ backgroundColor: '#385170', color: '#fff', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginRight: '6px' }} type="button" onClick={() => deletePersonne(personne._id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );



};

export default Personne;



/* Affichage table 
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }} className="personnes-container">
  {personnes.map((personne) => (
    <div key={personne._id} style={{ backgroundColor: '#343a40', color: '#fff', borderRadius: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px' }} className="personne-card">
      <div style={{ flex: 1 }} className="personne-info">
        <p><strong>Personne Prénom:</strong> {personne.prenom}</p>
        <p><strong>Personne Nom:</strong> {personne.nom}</p>
        <p><strong>Personne Email:</strong> {personne.email}</p>
        <p><strong>Personne Mot de Passe:</strong> {personne.password}</p>
        <p><strong>Personne Image:</strong> {personne.image}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }} className="personne-options">
        <button style={{ backgroundColor: '#ffc107', color: '#000', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} type="button" onClick={() => editPersonne(personne)}>
          Éditer
        </button>
        <button style={{ backgroundColor: '#dc3545', color: '#fff', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} type="button" onClick={() => deletePersonne(personne._id)}>
          Supprimer
        </button>
      </div>
    </div>
  ))}
</div>

########################################  Affichage avec image #########################################

<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }} className="personnes-container">
  {personnes.map((personne) => (
    <div key={personne._id} style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', ':hover': { transform: 'scale(1.05)' } }} className="personne-card">
      <img src={personne.image} alt={`${personne.prenom} ${personne.nom}`} style={{ width: '100%', height: '200px', objectFit: 'cover', borderBottom: '1px solid #ddd' }} className="personne-image" />
      <div style={{ padding: '15px', flex: '1' }} className="personne-details">
        <p><strong>Prénom:</strong> {personne.prenom}</p>
        <p><strong>Nom:</strong> {personne.nom}</p>
        <p><strong>Email:</strong> {personne.email}</p>
        <p><strong>Mot de Passe:</strong> {personne.password}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderTop: '1px solid #ddd' }} className="personne-options">
        <button style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} className="edit-button" onClick={() => editPersonne(personne)}>
          Éditer
        </button>
        <button style={{ backgroundColor: '#dc3545', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} className="delete-button" onClick={() => deletePersonne(personne._id)}>
          Supprimer
        </button>
      </div>
    </div>
  ))}
</div>
#################################################

*/



