import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Message = () => {
    const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [messageid, setId] = useState('');
    const [contenu, setContenu] = useState("");
    const [destination, setDestination] = useState("");
    const [source, setSource] = useState("");
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    const [date, setDate] = useState(formattedDate);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        (async () => await Load())();
    }, []);

    async function Load() {
        const result = await axios.get("http://localhost:8081/api/v1/message/getall");
        setMessages(result.data);
        console.log(result.data);
    }

    function clearForm() {
        setId("");
        setContenu("");
        setDestination("");
        setSource("");
        setDate(formattedDate);
    }

    function cancel() {
        setShowForm(false);
        setFormMode('add');
        clearForm();
    }

    async function save(event) {
        event.preventDefault();

        // Vérification des champs obligatoires
        if (!contenu || !destination || !source || !date) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        try {
            await axios.post("http://localhost:8081/api/v1/message/save", {
                contenu: contenu,
                destination: destination,
                source: source,
                date: date
            });
            alert("Message enregistré avec succès");
            clearForm();
            Load();
        } catch (err) {
            alert("Échec de l'enregistrement du message");
        }
    }

    async function editMessage(message) {
        setContenu(message.contenu);
        setDestination(message.destination);
        setSource(message.source);
        setDate(message.date);
        setId(message._id);
        setShowForm(true);
        setFormMode('edit');
    }

    async function deleteMessage(messageid) {
        await axios.delete("http://localhost:8081/api/v1/message/delete/" + messageid);
        alert("Message supprimé avec succès");
        Load();
    }

    async function update(event) {
        event.preventDefault();

        // Vérification des champs obligatoires
        if (!contenu || !destination || !source || !date) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        try {
            await axios.put("http://localhost:8081/api/v1/message/edit/" + messageid, {
                contenu: contenu,
                destination: destination,
                source: source,
                date: date,
            });
            alert("Message mis à jour avec succès");
            clearForm();
            setShowForm(false);
            setFormMode('add');
            Load();
        } catch (err) {
            alert("Échec de la mise à jour du message");
        }
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredMessages = messages.filter((message) => {
        return (
            message.contenu.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.source.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div style={{ maxWidth: '100%', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
                <div style={{ width: '75%', margin: '0 auto' }}>
                    <h1 style={{color: '#142d4c', textAlign: 'center', marginBottom: '20px' }}>Messages Détails</h1>

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
                        Ajouter Message
                    </button>
                    <br /><br />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '15px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            boxSizing: 'border-box',
                            fontSize: '1em',
                        }}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    
                    
                    <br /><br />
                    {showForm && (
                        <div style={{ background: '#385170', borderRadius: '10px', padding: '20px', margin: '15px 0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            <form>
                                <div style={{color: '#ececec', marginBottom: '15px' }}>
                                    <label htmlFor="contenu">Message contenu</label>
                                    <br /><br />
                                    <input
                                        type="text"
                                        id="contenu"
                                        placeholder="Type a message..."
                                        value={contenu}
                                        onChange={(event) => {
                                            setContenu(event.target.value);
                                        }}
                                        style={{ width: '97%', padding: '8px' }}
                                    />
                                </div>
                                <div style={{color: '#ececec', marginBottom: '15px' }}>
                                    <label htmlFor="destination">Message Destination</label>
                                    <br /><br />
                                    <input
                                        type="text"
                                        id="destination"
                                        placeholder="To: User Name"
                                        value={destination}
                                        onChange={(event) => {
                                            setDestination(event.target.value);
                                        }}
                                        style={{ width: '97%', padding: '8px' }}
                                    />
                                </div>
                                <div style={{color: '#ececec', marginBottom: '15px' }}>
                                    <label htmlFor="source">Message source</label>
                                    <br /><br />
                                    <input
                                        type="text"
                                        id="source"
                                        placeholder="From: Your Name"
                                        value={source}
                                        onChange={(event) => {
                                            setSource(event.target.value);
                                        }}
                                        style={{ width: '97%', padding: '8px' }}
                                    />
                                </div>
                                <div style={{color: '#ececec', display: 'none' }}>
                                    <label htmlFor="date">Date</label>
                                    <input
                                        type="text"
                                        id="date"
                                        value={date}
                                        onChange={(event) => {
                                            const formattedDate = new Date(event.target.value).toISOString().split('T')[0];
                                            setDate(formattedDate);
                                        }}
                                        style={{ width: '100%', padding: '8px' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button style={{ background: '#ececec', color: '#000', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} onClick={formMode === 'add' ? save : update}>
                                        {formMode === 'add' ? 'Send' : 'Edit'}
                                    </button>
                                    <button style={{ background: '#ececec', color: '#000', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} onClick={cancel}>
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {filteredMessages.map((message) => (
                            <div key={message._id} style={{ width: '100%', marginBottom: '10px' }}>
                                <div style={{ background: '#9fd3c7', borderRadius: '10px', padding: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                    <h5 style={{ margin: '0', fontWeight: 'bold' }}>{message.contenu}</h5>
                                    <p style={{ margin: '5px 0', fontSize: '0.8em' }}>Destination: {message.destination}</p>
                                    <p style={{ margin: '5px 0', fontSize: '0.8em' }}>Source: {message.source}</p>
                                    <p style={{ margin: '5px 0', fontSize: '0.8em' }}>Date: {message.date}</p>
                                    <br />
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <button
                                            style={{ backgroundColor: '#ececec', color: '#000', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                                            type="button"
                                            onClick={() => {
                                                editMessage(message);
                                            }}
                                        >
                                            Éditer
                                        </button>
                                        <button
                                            style={{ background: '#ececec', color: '#000', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                                            type="button"
                                            onClick={() => {
                                                deleteMessage(message._id);
                                            }}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
