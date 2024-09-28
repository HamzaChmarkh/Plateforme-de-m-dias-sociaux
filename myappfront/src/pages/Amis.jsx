import React, { useEffect, useState } from 'react';
import axios from 'axios';

/* */
import Personne from './Test';
/* */

const Amis = () => {
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [showForm, setShowForm] = useState(false);
  const [showFormButton, setShowFormButton] = useState(true);
  const [amiid, setId] = useState('');
  const [nom_prenom, setNom_prenom] = useState("");
  const [nom_prenom_2, setNom_prenom_2] = useState("");
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  const [date, setDate] = useState(formattedDate);
  const [amis, setAmis] = useState([]);
  
  /* */
  const personneNames = Personne().getPersonneNames();
  /* */

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://localhost:8081/api/v1/ami/getall");

    const amisWithDuration = result.data.map(ami => {
      const amiDate = new Date(ami.date);
      const durationInMilliseconds = currentDate - amiDate;
      const days = Math.floor(durationInMilliseconds / (24 * 60 * 60 * 1000));
      const hours = Math.floor((durationInMilliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      return { ...ami, duration: `${days} jours ${hours} heures` };
    });

    setAmis(amisWithDuration);
    console.log(amisWithDuration);
  }

  async function save(event) {
    event.preventDefault();

    // Vérification des champs obligatoires
    if (!nom_prenom || !nom_prenom_2) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      await axios.post("http://localhost:8081/api/v1/ami/save", {
        nom_prenom: nom_prenom,
        nom_prenom_2: nom_prenom_2,
        date: date
      });
      alert("Ami enregistré avec succès");
      setId("");
      setNom_prenom("");
      setNom_prenom_2("");
      setDate(formattedDate);
      Load();
      setShowForm(false); // Hide the form after saving
      setShowFormButton(true); // Afficher le bouton après avoir sauvegardé
    } catch (err) {
      alert("Échec de l'enregistrement de l'ami");
    }
  }

  function cancel() {
    setId("");
    setNom_prenom("");
    setNom_prenom_2("");
    setDate(formattedDate);
    setShowForm(false); // Hide the form without saving
    setShowFormButton(true); // Afficher le bouton après l'annulation
    setFormMode('add'); // Reset form mode
  }

  async function editAmi(ami) {
    setNom_prenom(ami.nom_prenom);
    setNom_prenom_2(ami.nom_prenom_2);
    setDate(ami.date);
    setId(ami._id);
    setShowForm(true);
    setFormMode('edit');
  }

  async function deleteAmi(amiid) {
    await axios.delete("http://localhost:8081/api/v1/ami/delete/" + amiid);
    alert("Ami supprimé avec succès");
    Load();
  }

  async function update(event) {
    event.preventDefault();

    // Vérification des champs obligatoires
    if (!nom_prenom || !nom_prenom_2) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      await axios.put("http://localhost:8081/api/v1/ami/edit/" + amiid, {
        nom_prenom: nom_prenom,
        nom_prenom_2: nom_prenom_2,
        date: date,
      });
      alert("Ami mis à jour avec succès");
      setId("");
      setNom_prenom("");
      setNom_prenom_2("");
      setDate(formattedDate);
      Load();
      setShowForm(false);
      setFormMode('add'); // Reset form mode after editing
    } catch (err) {
      alert("Échec de la mise à jour de l'ami");
    }
  }

  return (
    <div style={{ maxWidth: '100%', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
        <div style={{ width: '75%', margin: '0 auto' }}>
          <h1 style={{ color: '#142d4c', textAlign: 'center', marginBottom: '20px' }}>Détails Amis </h1>

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
            Afficher le formulaire
          </button>

          {showForm && (
            <div style={{ background: '#385170', borderRadius: '10px', padding: '20px', margin: '15px 0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <form>
                <div style={{ color: '#ececec', marginBottom: '15px' }}>
                  <label htmlFor="nom_prenom_2">Première Personne</label>
                  <br /><br />
                  <select
                    value={nom_prenom_2}
                    onChange={(event) => {
                      setNom_prenom_2(event.target.value);
                    }}
                    style={{ width: '97%', padding: '8px' }}
                  >
                    <option value="">Sélectionner une personne</option>
                    {personneNames.map((nom, index) => (
                      <option key={index} value={nom}>{nom}</option>
                    ))}
                  </select>
                </div>
                <div style={{ color: '#ececec', marginBottom: '15px' }}>
                  <label htmlFor="nom_prenom">Deuxième Personne</label>
                  <br /><br />
                  <input
                    type="text"
                    id="nom_prenom"
                    value={nom_prenom}
                    onChange={(event) => {
                      setNom_prenom(event.target.value);
                    }}
                    style={{ width: '97%', padding: '8px' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {formMode === 'add' ? (
                    <>
                      <button style={{ background: '#ececec', color: '#000', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} onClick={save}>
                        Envoyer
                      </button>
                      <button style={{ background: '#ececec', color: '#000', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} onClick={cancel}>
                        Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button style={{ background: '#ececec', color: '#000', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} onClick={update}>
                        Éditer
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
                <th style={{ padding: '15px', border: '1px solid #ddd' }}>Première Personne</th>
                <th style={{ padding: '15px', border: '1px solid #ddd' }}>Deuxième Personne</th>
                <th style={{ padding: '15px', border: '1px solid #ddd' }}>Ami Date</th>
                <th style={{ padding: '15px', border: '1px solid #ddd' }}>Durée d'amitié</th>
                <th style={{ padding: '15px', border: '1px solid #ddd' }}>Option</th>
              </tr>
            </thead>
            {amis.map((ami) => (
              <tbody key={ami._id}>
                <tr>
                  <td style={{ padding: '15px', border: '1px solid #ddd' }}>{ami.nom_prenom_2}</td>
                  <td style={{ padding: '15px', border: '1px solid #ddd' }}>{ami.nom_prenom}</td>
                  <td style={{ padding: '15px', border: '1px solid #ddd' }}>{ami.date}</td>
                  <td style={{ padding: '15px', border: '1px solid #ddd' }}>{ami.duration}</td>
                  <td style={{ padding: '15px', border: '1px solid #ddd' }}>
                    <button style={{ backgroundColor: '#385170', color: '#fff', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginRight: '5px' }} type="button" onClick={() => editAmi(ami)}>
                      Éditer
                    </button>
                    <button style={{ backgroundColor: '#385170', color: '#fff', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer', padding: '6px' }} type="button" onClick={() => deleteAmi(ami._id)}>
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

export default Amis;



