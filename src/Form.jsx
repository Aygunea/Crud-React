import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState({ id: '', body: '', title: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentData.id) {
            updateCategory(currentData);
        } else {
            addcategory({ body: currentData.body, title: currentData.title });
        }
        setCurrentData({ id: '', body: '', title: '' }); // Formu sıfırla
    };

    const handleChangeBody = (e) => {
        setCurrentData({ ...currentData, body: e.target.value });
    };

    const handleChangeTitle = (e) => {
        setCurrentData({ ...currentData, title: e.target.value });
    };

    const deleteCategory = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => {
                console.log(response.data);
                fetchData();
            })
            .catch(error => {
                console.error('Error deleting category:', error);
            });
    };

    const addcategory = (newCategory) => {
        axios.post('https://jsonplaceholder.typicode.com/posts', newCategory)
            .then(() => {
                fetchData();
            });
    };

    const updateCategory = (updatedCategory) => {
        axios.put(`https://jsonplaceholder.typicode.com/posts/${updatedCategory.id}`, updatedCategory)
            .then(() => {
                fetchData();
            });
    };

    const fetchData = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setData(response.data);
            });
    };

    const handleEdit = (item) => {
        setCurrentData(item); // Edit butonuna tıklanınca ilgili verileri input alanlarına doldur
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <form action="#" onSubmit={handleSubmit}>
                <input type="text" value={currentData.body} placeholder="Company Body" onChange={handleChangeBody} />
                <input type="text" value={currentData.title} placeholder="Contact Title" onChange={handleChangeTitle} />
                <button type='submit'>Add</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Body</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.body}</td>
                            <td>{item.title}</td>
                            <td>
                                <button onClick={() => handleEdit(item)}>Edit</button>
                                <button onClick={() => deleteCategory(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Form;
