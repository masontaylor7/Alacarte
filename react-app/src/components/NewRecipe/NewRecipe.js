import React, { useState } from 'react';
import './NewRecipe.css'
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs'
import { VscDiffAdded } from 'react-icons/vsc'

const NewRecipe = () => {
    const [inputFields, setInputFields] = useState([
        { title: '', amount: '', measurement: '' },
    ])

    const handleChangeInput = (index, e) => {
        const ingredients = [...inputFields]
        ingredients[index][e.target.name] = e.target.value
        setInputFields(ingredients)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputFields, '<<<<<<<<<<<<<<<<')
    }

    const handleAddField = () => {
        setInputFields([...inputFields, {
            title: '', amount: '', measurement: ''
        }])
    }

    const handleRemoveField = (index) => {
        const values = [...inputFields]
        values.splice(index, 1)
        setInputFields(values)
    }

    return (
        <div>
            <div>Recipe Info</div>
            <div>Ingredients:</div>
            <form className='new_recipe_form'>
                {inputFields.map((inputField, index) => (
                    <div key={index}>
                        <label>amount:</label>
                        <input type='text'
                            name='amount'
                            placeholder='1 | 20 | 1/2'
                            value={inputField.amount}
                            onChange={e => handleChangeInput(index, e)}
                        />
                        <label>measurement:</label>
                        <input type='text'
                            name='measurement'
                            placeholder='cup/cups/whole/bunch'
                            value={inputField.measurement}
                            onChange={e => handleChangeInput(index, e)}
                        />
                        <label>ingredient:</label>
                        <input type='text'
                            name='title'
                            placeholder='flour | eggs | milk'
                            value={inputField.title}
                            onChange={e => handleChangeInput(index, e)}
                        />
                        <BsDashSquare onClick={() => handleRemoveField(index)} />
                        <BsPlusSquare onClick={handleAddField} />
                    </div>
                ))}
                <button type='submit' onClick={handleSubmit}>
                    CREATE RECIPE
                    <VscDiffAdded />
                </button>
            </form>
        </div>
    );
};

export default NewRecipe;
