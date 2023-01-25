import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import CategoryService from "../services/category.service";

const Categories = props => {
    const { id }= useParams();
    let navigate = useNavigate();
    const initialCategoryState = {
        id: null,
        name: "",
    };

    let allCategories = useState("")
    const [category, setCategory] = useState(initialCategoryState);
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [message, setMessage] = useState("");


    const retrieveCategories = () => {
        CategoryService.getAllCategories()
            .then(response => {
                setCategories(response.data);
                allCategories = response.data
                console.log(allCategories)
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveCategories();
    }, []);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCategory({ ...category, [name]: value });
    };

    const setActiveCategory = (category, index) => {
        setCurrentCategory(category);
        setCurrentIndex(index);
    };
    const createCategory = () => {
        CategoryService.createCategory(category)
            .then(response => {
                setCategory({...category});
                setMessage("The category has been added successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateCategory = () => {
        CategoryService.updateCategory(currentCategory)
            .then(response => {
                setCategories({...currentCategory});
                setMessage("The category was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteCategory = () => {
        CategoryService.deleteCategory(currentCategory.id)
            .then(response => {
                setMessage("The category has been deleted successfully!");
                navigate("/categories");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="list-group">
            <div className="CategoriesList">
            <ul className="list-group">
                {categories &&
                    categories.map((category, index) => (
                        <li
                            class="list-categories"
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveCategory(category, index)}
                            key={index}
                        >
                            {category.name}
                        </li>
                    ))}
            </ul>
                <div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={category.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                        <button style={{marginTop: 10}} onClick={createCategory} className="btn btn-success">
                            Add New Category
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;
