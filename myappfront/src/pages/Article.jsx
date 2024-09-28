import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Article = () => {
    const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
    const [showForm, setShowForm] = useState(false);
    const [articleid, setId] = useState('');
    const [contenu, setContenu] = useState("");
    const [source, setSource] = useState("");
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    const [date, setDate] = useState(formattedDate);
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        (async () => await Load())();
    }, []);

    async function Load() {
        const result = await axios.get("http://localhost:8081/api/v1/article/getall");
        setArticles(result.data);
        console.log(result.data);
    }

    function clearForm() {
        setId("");
        setContenu("");
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
        if (!contenu || !source || !date) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        try {
            await axios.post("http://localhost:8081/api/v1/article/save", {
                contenu: contenu,
                source: source,
                date: date
            });
            alert("Article enregistré avec succès");
            clearForm();
            Load();
        } catch (err) {
            alert("Échec de l'enregistrement de l'article");
        }
    }

    async function editArticle(article) {
        setContenu(article.contenu);
        setSource(article.source);
        setDate(article.date);
        setId(article._id);
        setShowForm(true);
        setFormMode('edit');
    }

    async function deleteArticle(articleid) {
        await axios.delete("http://localhost:8081/api/v1/article/delete/" + articleid);
        alert("Article supprimé avec succès");
        Load();
    }

    async function update(event) {
        event.preventDefault();

        // Vérification des champs obligatoires
        if (!contenu || !source || !date) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        try {
            await axios.put("http://localhost:8081/api/v1/article/edit/" + articleid, {
                contenu: contenu,
                source: source,
                date: date,
            });
            alert("Article mis à jour avec succès");
            clearForm();
            setShowForm(false);
            setFormMode('add');
            Load();
        } catch (err) {
            alert("Échec de la mise à jour de l'article");
        }
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredArticles = articles.filter((article) => {
        return (
            article.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.contenu.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.date.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div style={{ maxWidth: '100%', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
                <div style={{ width: '75%', margin: '0 auto' }}>
                    <h1 style={{color: '#142d4c', textAlign: 'center', marginBottom: '20px' }}>Détails Articles</h1>

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
                        Ajouter Article
                    </button>
                    <br /><br />
                    <input
                        type="text"
                        placeholder="Rechercher des articles..."
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
                                    <label htmlFor="source">Article source</label>
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
                                <div style={{color: '#ececec', marginBottom: '15px' }}>
                                    <label htmlFor="contenu">Article contenu</label>
                                    <br /><br />
                                    <textarea
                                        id="contenu"
                                        placeholder="Type a message..."
                                        value={contenu}
                                        onChange={(event) => {
                                            setContenu(event.target.value);
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
                                        {formMode === 'add' ? 'Envoyer' : 'Éditer'}
                                    </button>
                                    <button style={{ background: '#ececec', color: '#000', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} onClick={cancel}>
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {filteredArticles.map((article) => (
                            <div key={article._id} style={{ width: '100%', marginBottom: '10px' }}>
                                <div style={{ background: '#9fd3c7', borderRadius: '10px', padding: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                <p style={{ margin: '0', fontWeight: 'bold' }}>Source : {article.source}</p>
                                    <p style={{ margin: '5px 0', fontSize: '0.8em' }}> {article.contenu}</p>
                                    <p style={{ margin: '0', fontWeight: 'bold' }}>Date: {article.date}</p>
                                    <br />
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    
                                        <button
                                            style={{ backgroundColor: '#ececec', color: '#000', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                                            type="button"
                                            onClick={() => {
                                                editArticle(article);
                                            }}
                                        >
                                            Éditer
                                        </button>
                                        <button
                                            style={{ background: '#ececec', color: '#000', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                                            type="button"
                                            onClick={() => {
                                                deleteArticle(article._id);
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

export default Article;
