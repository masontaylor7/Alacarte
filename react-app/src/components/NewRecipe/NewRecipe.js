import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NewRecipe.css'
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs'
import { VscDiffAdded } from 'react-icons/vsc'

import { allCategories } from '../../store/category';

const NewRecipe = () => {
    const dispatch = useDispatch();
    const categories = Object.values(useSelector(state => state.categories))
    console.log(categories)

    useEffect(() => {
        dispatch(allCategories())
    }, [dispatch])

    const [inputFields, setInputFields] = useState([
        { title: '', amount: '', measurement: '' },
    ])
    const [imageUrl, setImageUrl] = useState('')
    const [categoryId, setCategoryId] = useState()


    const imageStyle = {
        width: "400px",
        height: 'auto'
    }

    const handleChangeInput = (index, e) => {
        const ingredients = [...inputFields]
        ingredients[index][e.target.name] = e.target.value
        setInputFields(ingredients)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(inputFields, '<<<<<<<<<<<<<<<<')
    }

    const handleAddField = () => {
        setInputFields([...inputFields, {
            title: '', amount: '', measurement: ''
        }])
    }

    const handleRemoveField = (index) => {
        const values = [...inputFields]
        if (values.length > 1) {
            values.splice(index, 1)
            setInputFields(values)
        } else {
            return;
        }
    }

    return (
        <div>
            <div>Recipe Information</div>

            <form className='new_recipe_form'>
                <div>
                    <label>Name of your dish:</label>
                    <input type='text'
                        className='input title-input'
                        name='title'
                        placeholder='Alaskan Salmon w/ Herbs and Lemon Caper Sauce...'
                    />
                </div>
                <div>
                    {imageUrl ? <img src={imageUrl} style={imageStyle} alt='image' /> : <img src='https://img.buzzfeed.com/buzzfeed-static/static/2019-12/4/16/tmp/96ecd548dea3/tmp-name-2-109-1575477795-3_dblbig.jpg?resize=1200:*' style={imageStyle} alt='image' />}
                </div>
                <label>Finished Dish Image:</label>
                <input type='text'
                    className='input image-input'
                    name='image_url'
                    placeholder='Image URL'
                />
                <div className='category-block'>
                    <div className='field-title'>Category:</div>
                    <select onChange={(e) => setCategoryId(e.target.value)}>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.title}</option>
                        ))}
                    </select>
                </div>
                <div className='cook-time-block'>
                    <div className='field-title'>Time:</div>
                    <label>Prep Time:</label>
                    <input type='text'
                        className='input prep-time-input'
                        name='prep_time'
                        placeholder='30 mins | 2 hrs'
                    />
                    <label>Cook Time:</label>
                    <input type='text'
                        className='input cook-time-input'
                        name='cook_time'
                        placeholder='30 mins | 2 hrs'
                    />
                    <label>Total Time:</label>
                    <input type='text'
                        className='input total-time-input'
                        name='total_time'
                        placeholder='30 mins | 2 hrs'
                    />
                </div>
                <div className='servings-block'>
                    <div className='field-title'>Servings:</div>
                    <input type='text'
                        className='input servings_input'
                        name='servings'
                        placeholder='2 - 4 servings | 16 pancakes'
                    />
                </div>
                <div>Ingredients:</div>
                {inputFields.map((inputField, index) => (
                    <div key={index}>
                        <label>Amount:</label>
                        <input type='text'
                            className='input amount-input'
                            name='amount'
                            placeholder='1 | 20 | 1/2 | (optional)'
                            value={inputField.amount}
                            onChange={e => handleChangeInput(index, e)}
                        />
                        <label>Measurement:</label>
                        <input type='text'
                            className='input measurement-input'
                            name='measurement'
                            placeholder='cup | bunch | whole | (optional)'
                            value={inputField.measurement}
                            onChange={e => handleChangeInput(index, e)}
                        />
                        <label>Ingredient:</label>
                        <input type='text'
                            className='required-input input ingredient-input'
                            name='title'
                            placeholder='flour | eggs | milk'
                            value={inputField.title}
                            onChange={e => handleChangeInput(index, e)}
                        />
                        <BsDashSquare onClick={() => handleRemoveField(index)} />
                        <BsPlusSquare onClick={handleAddField} />
                        <div className='field-title'>Directions:</div>
                        <input type='text'
                            className='input directions_input'
                            name='directions'
                            placeholder='1. In a large bowl mix flour, eggs, and milk...'
                        />
                    </div>
                ))}
                <label></label>
                <button type='submit' onClick={handleSubmit}>
                    CREATE RECIPE
                    <VscDiffAdded />
                </button>
            </form>
        </div>
    );
};

export default NewRecipe;
