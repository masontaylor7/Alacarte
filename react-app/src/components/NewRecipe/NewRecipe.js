import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './NewRecipe.css'
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs'
import { VscDiffAdded } from 'react-icons/vsc'

import { allCategories } from '../../store/category';
import { createRecipe } from '../../store/recipe';
import { createIngredient, allIngredients } from '../../store/ingredient';
import { createCollectionRecipe } from '../../store/collection_recipe';

const NewRecipe = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const categories = Object.values(useSelector(state => state.categories))
    const ingredients = Object.values(useSelector(state => state.ingredients))
    const sessionUser = useSelector(state => state.session.user);

    const [showErrors, setShowErrors] = useState(false)
    const [validationErrors, setValidationErrors] = useState([]);
    const [photoPreview, setPhotoPreview] = useState('#')

    const [inputFields, setInputFields] = useState([
        { title: '', amount: '', measurement: '', },
    ])

    const [categoryId, setCategoryId] = useState(0)
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [prepTime, setPrepTime] = useState('')
    const [cookTime, setCookTime] = useState('')
    const [totalTime, setTotalTime] = useState('')
    const [servingSize, setServingSize] = useState('')
    const [directionsInp, setDirectionsInp] = useState('')
    const [placeholder, setPlaceholder] = useState("default");

    useEffect(() => {
        const errors = []
        if (title?.length === 0) errors.push('"Name" field cannot be empty')
        if (image?.length === 0) errors.push('"Image" field cannot be empty')
        if (directionsInp?.length === 0) errors.push('"Directions" field cannot be empty')
        if (prepTime?.length === 0) errors.push('"Prep Time" field cannot be empty')
        if (cookTime?.length === 0) errors.push('"Cook Time" field cannot be empty')
        if (totalTime?.length === 0) errors.push('"Total Time" field cannot be empty')
        if (servingSize?.length === 0) errors.push('"Servings" field cannot be empty')
        if (categoryId === 0) errors.push('Please select a "Category" for your recipe')
        inputFields?.map(ingredientObj => {
            if (ingredientObj.title.length === 0) errors.push('An ingredient field has an empty input for "Ingredient Name" (there may be an unused ingredient input)')
        })
        setValidationErrors(errors)
    }, [title, image, prepTime, cookTime, totalTime, servingSize, directionsInp, inputFields, categoryId])

    useEffect(() => {
        dispatch(allCategories())
    }, [dispatch])

    useEffect(() => {
        dispatch(allIngredients())
    }, [dispatch])

    const imageStyle = {
        width: "400px",
        height: 'auto'
    }

    const handleChangeInput = (index, e) => {
        const ingredients = [...inputFields]
        ingredients[index][e.target.name] = e.target.value
        setInputFields(ingredients)
    }

    const updateImage = (e) => {
        const file = e.target.files[0]
        setImage(file)
        if (file) {
            setPhotoPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('title', title)
        formData.append("image", image);
        formData.append("user_id", sessionUser.id);
        formData.append("category_id", categoryId);
        formData.append("prep_time", prepTime);
        formData.append("cook_time", cookTime);
        formData.append("total_time", totalTime);
        formData.append("servings", servingSize);
        formData.append("directions", directionsInp);

        // const recipe = {
        //     user_id: sessionUser.id,
        //     image_url: image,
        //     title,
        //     category_id: categoryId,
        //     prep_time: prepTime,
        //     cook_time: cookTime,
        //     total_time: totalTime,
        //     servings: servingSize,
        //     directions: directionsInp,
        // }

        if (validationErrors.length === 0) {
            const created_recipe = await dispatch(createRecipe(formData))
            // console.log(created_recipe)

            if (created_recipe.errors) {
                // setVideoLoading(false)
                setValidationErrors([ ...validationErrors, created_recipe.errors]);
                setShowErrors(true)
            } else if (created_recipe) {
                if (!created_recipe.errors) {
                    inputFields?.map(ingredientobj => {
                        ingredientobj["recipe_id"] = created_recipe.id
                        dispatch(createIngredient(ingredientobj))
                    })
                    history.push(`/recipes/${created_recipe.id}`)
                }
            }
        } else {
            setShowErrors(true)
        }
    }

    const handleAddField = () => {
        setInputFields([...inputFields, {
            title: '', amount: '', measurement: '',
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

    const handleImageField = (e) => {
        setImage(e.target.value)
    }

    const handleSetTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleSetPrepTime = (e) => {
        setPrepTime(e.target.value)
    }

    const handleSetCookTime = (e) => {
        setCookTime(e.target.value)
    }

    const handleSetTotalTime = (e) => {
        setTotalTime(e.target.value)
    }

    const handleSetServingSize = (e) => {
        setServingSize(e.target.value)
    }

    const handleSetDirectionsInp = (e) => {
        setDirectionsInp(e.target.value)
    }

    // const isImageUrl = () => {
    //     if (image.includes('http') || imageUrl.includes('https')) {
    //         if (imageUrl.includes('.jpg') || imageUrl.includes('.png') || imageUrl.includes('.img') || imageUrl.includes('.jpeg')) {
    //             return true;
    //         }
    //     }
    //     return false
    // }


    return (
        <div>
            <div className='recipe_form_block'>
                <div className='image_div_background'>
                    <img src='https://img.freepik.com/free-photo/fresh-colourful-ingredients-mexican-cuisine_23-2148254294.jpg?w=2000' />
                </div>

                <form className='new_recipe_form'>

                    <label>Name of your dish:</label>
                    <input type='text'
                        className='input title-input'
                        name='title'
                        placeholder='Alaskan Salmon w/ Herbs and Lemon Caper Sauce...'
                        onChange={handleSetTitle}
                        value={title}
                    />

                    <div className='field_block'>
                        {photoPreview !== '#' ? <img src={photoPreview} style={imageStyle} alt='preview' /> : <img src='https://img.buzzfeed.com/buzzfeed-static/static/2019-12/4/16/tmp/96ecd548dea3/tmp-name-2-109-1575477795-3_dblbig.jpg?resize=1200:*' style={imageStyle} alt='preview' />}
                    </div>
                    <label>Finished Dish Image:</label>
                    <input type='file'
                        id='img'
                        className='input image-input'
                        name='image_url'
                        placeholder='Valid Image URL'
                        accept="image/*"
                        onChange={updateImage}
                    />
                    <label className='image-type-label'>image file must be pdf/png/jpg/jpeg/gif</label>
                    {/* {"pdf", "png", "jpg", "jpeg", "gif"} */}
                    <div className='category-block field_block'>
                        <div className='field-title'>Category:</div>
                        <select className='input' defaultValue={placeholder} onChange={(e) => setCategoryId(e.target.value)}>
                            <option value="default" disabled hidden>
                                Choose a Category
                            </option>
                            {categories?.map(category => (
                                <option key={category.id} value={category.id}>{category.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className='cook-time-block'>
                        <div className='ingredient_details_block'>

                            <label>Prep Time:</label>
                            <input type='text'
                                className='input prep-time-input'
                                name='prep_time'
                                placeholder='30 mins | 2 hrs | 5 Days'
                                onChange={handleSetPrepTime}
                                value={prepTime}

                            />
                        </div>
                        <div className='ingredient_details_block'>

                            <label>Cook Time:</label>
                            <input type='text'
                                className='input cook-time-input'
                                name='cook_time'
                                placeholder='30 mins | 2 hrs | 5 Days'
                                onChange={handleSetCookTime}
                                value={cookTime}

                            />
                        </div>
                        <div className='ingredient_details_block'>

                            <label>Total Time:</label>
                            <input type='text'
                                className='input total-time-input'
                                name='total_time'
                                placeholder='30 mins | 2 hrs'
                                onChange={handleSetTotalTime}
                                value={totalTime}

                            />
                        </div>
                    </div>
                    <div className='servings-block field_block'>
                        <div className='field-title'>Servings:</div>
                        <input type='text'
                            className='input servings_input'
                            name='servings'
                            placeholder='2 - 4 servings | 16 pancakes'
                            onChange={handleSetServingSize}
                            value={servingSize}

                        />
                    </div>
                    <div className='field_block'>

                        <div>Ingredients: (add and remove input fields with the + and - buttons)</div>
                        <div className='ingredients_block'>
                            {inputFields.map((inputField, index) => (
                                <div key={index} className='i_c'>
                                    <div className='ingredient_details_block'>

                                        <label>Amount:</label>
                                        <input type='text'
                                            className='input amount-input'
                                            name='amount'
                                            placeholder='1 | 20 | 1/2 | (optional)'
                                            value={inputField.amount}
                                            onChange={e => handleChangeInput(index, e)}
                                        />
                                    </div>
                                    <div className='ingredient_details_block'>

                                        <label>Measurement:</label>
                                        <input type='text'
                                            className='input measurement-input'
                                            name='measurement'
                                            placeholder='cup | whole | (optional)'
                                            value={inputField.measurement}
                                            onChange={e => handleChangeInput(index, e)}
                                        />
                                    </div>
                                    <div className='ingredient_details_block'>
                                        <label>Ingredient:</label>
                                        <input type='text'
                                            className='required-input input ingredient-input'
                                            name='title'
                                            placeholder='flour | eggs | milk'
                                            value={inputField.title}
                                            onChange={e => handleChangeInput(index, e)}
                                        />
                                    </div>
                                    <div className='ingredient_buttons'>
                                        <BsPlusSquare className='submit_button' onClick={handleAddField} />
                                        <BsDashSquare className='submit_button' onClick={() => handleRemoveField(index)} />
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='field_block'>

                        <div>Directions:</div>
                        <textarea type='text'
                            className='input directions_input'
                            name='directions'
                            placeholder='1. In a large bowl mix flour, eggs, and milk...'
                            onChange={handleSetDirectionsInp}
                            value={directionsInp}

                        />
                    </div>
                    <label></label>
                    <button type='submit' className='button_style1' onClick={handleSubmit}>
                        CREATE RECIPE
                    </button>
                </form>

            </div>
            {
                showErrors ?
                    <div className='opaque_container' onClick={() => setShowErrors(false)} >

                        <div className='error_modal'>
                            <div>You cannot update this recipe until these fields are filled in properly:</div>
                            <div className='error_block'>
                                {showErrors && <div>
                                    {validationErrors.map((error, ind) => (
                                        <div key={ind}>- {error}</div>
                                    ))}
                                </div>}
                                <div className='button_block'>

                                    <button className='modal_button' type='button' onClick={() => setShowErrors(false)}>Close Window</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>
    );
};

export default NewRecipe;
