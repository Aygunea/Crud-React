import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {

    const [data, setData] = useState([]);
    let url = `http://localhost:3000/products`;

    const [currentData, setCurrentData] = useState({ id: '', name: '', info: '', price: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentData.id) {
            updateCategory(currentData);
        } else {
            addcategory({ name: currentData.name, info: currentData.info, price: currentData.price });
        }
        setCurrentData({ id: '', name: '', info: '', price: '' });
    };
    

    const handleChangeName = (e) => {
        setCurrentData({ ...currentData, name: e.target.value });
    };

    const handleChangeInfo = (e) => {
        setCurrentData({ ...currentData, info: e.target.value });
    };
    const handleChangePrice = (e) => {
        setCurrentData({ ...currentData, price: e.target.value });
    };

    const deleteCategory = (id) => {
            axios.delete(`http://localhost:3000/products/${id}`)
                .then(response => {
                    console.log(response.data);
                    fetchData();
                })
    };

    const addcategory = (newCategory) => {
        const lastProductId = data[data.length - 1].id;
        const newId = Number(lastProductId) + 1;
        newCategory.id = newId;
    
        axios.post(url, newCategory)
            .then(() => {
                fetchData();
            })
            .catch(error => {
                console.error('Error adding category:', error);
            });;
    };
    
    const updateCategory = (updatedCategory) => {
        axios.put(`http://localhost:3000/products/${updatedCategory.id}`, updatedCategory)
            .then(() => {
                fetchData();
            });
    };

    const fetchData = () => {
        axios.get(`http://localhost:3000/products`)
            .then(response => {
                setData(response.data);
            });
    };

    const handleEdit = (item) => {
        setCurrentData(item);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <form action="#" onSubmit={handleSubmit}>
                <input type="text" value={currentData.name} placeholder="Company Name" onChange={handleChangeName} />
                <input type="text" value={currentData.info} placeholder="Contact Info" onChange={handleChangeInfo} />
                <input type="text" value={currentData.price} placeholder="Contact Price" onChange={handleChangePrice} />
                <button type='submit'>Add</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Info</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.info}</td>
                            <td>{item.price}</td>
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

export default Products;
