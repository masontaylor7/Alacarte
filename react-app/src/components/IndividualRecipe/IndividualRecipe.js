import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { oneRecipe, deleteRecipe, updateRecipe } from '../../store/recipe';
import { allCategories } from '../../store/category';
import { BsDot, BsPlusSquare, BsDashSquare } from 'react-icons/bs'
import { BiBookAdd } from 'react-icons/bi'
import './IndividualRecipe.css'
import { deleteIngredient, specificIngredients, createIngredient, updateIngredient } from '../../store/ingredient';
import { createCollectionRecipe } from '../../store/collection_recipe';
import { allCollections, createCollection } from '../../store/collection';


const IndividualRecipe = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { recipeId } = useParams();
    const recipe = useSelector(state => state.recipes[+recipeId])

    const categories = Object.values(useSelector(state => state.categories))
    const collections = Object.values(useSelector(state => state.collections))
    const sessionUser = useSelector(state => state.session.user)

    const [deleteModal, setDeleteModal] = useState(false)
    const [editActive, setEditActive] = useState(false)
    const [deleteIngredientModal, setDeleteIngredientModal] = useState(false)
    const [showErrors, setShowErrors] = useState(false)
    const [validationErrors, setValidationErrors] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false)
    const [newCollectionErrors, setNewCollectionErrors] = useState([])
    const [collTitle, setCollTitle] = useState('')

    useEffect(() => {
        const errors = []
        if (collTitle.length === 0) errors.push('A name is required')
        setNewCollectionErrors(errors)
    }, [collTitle])
    // console.log(validationErrors)

    {/* current fields*/ }
    const [deleteIndex, setDeleteIndex] = useState(-1)
    const [removedIng, setRemovedIng] = useState([])
    const [showAddToCollectionModal, setShowAddToCollectionModal] = useState(false)


    useEffect(() => {
        dispatch(oneRecipe(+recipeId))
        dispatch(allCollections(sessionUser?.id))
    }, [dispatch, editActive])

    const [currTitle, setCurrTitle] = useState(recipe?.title || '')
    const [inputFields, setInputFields] = useState(recipe?.ingredients || [])
    const [categoryId, setCategoryId] = useState(recipe?.category_id || '')
    const [image, setImage] = useState(recipe?.image_url || '')
    const [title, setTitle] = useState(recipe?.title || '')
    const [prepTime, setPrepTime] = useState(recipe?.prep_time || '')
    const [cookTime, setCookTime] = useState(recipe?.cook_time || '')
    const [totalTime, setTotalTime] = useState(recipe?.total_time || '')
    const [servingSize, setServingSize] = useState(recipe?.servings || '')
    const [directionsInp, setDirectionsInp] = useState('')
    const [placeholder, setPlaceholder] = useState("default");
    const [photoPreview, setPhotoPreview] = useState('#')

    // console.log(currTitle, inputFields, categoryId, imageUrl, title, prepTime, prepTime, cookTime, totalTime, servingSize, directionsInp, placeholder, inputFields)

    useEffect(() => {
        const errors = []
        if (currTitle?.length === 0) errors.push('"Name" field cannot be empty')
        if (directionsInp?.length === 0) errors.push('"Directions" field cannot be empty')
        if (prepTime?.length === 0) errors.push('"Prep Time" field cannot be empty')
        if (cookTime?.length === 0) errors.push('"Cook Time" field cannot be empty')
        if (totalTime?.length === 0) errors.push('"Total Time" field cannot be empty')
        if (servingSize?.length === 0) errors.push('"Servings" field cannot be empty')
        inputFields?.map(ingredientObj => {
            if (ingredientObj.title.length === 0) errors.push('An ingredient field has an empty input for "Ingredient Name" (there may be an unused ingredient input)')
        })
        // if (!isImageUrl(imageUrl)) errors.push('"Image URL" is not a valid URL')
        setValidationErrors(errors)
    }, [image, currTitle, prepTime, cookTime, totalTime, servingSize, directionsInp, inputFields])


    useEffect(() => {
        setCategoryId(recipe?.category_id)
        setInputFields(recipe?.ingredients)
        setImage(recipe?.image_url)
        setCurrTitle(recipe?.title)
        setPrepTime(recipe?.prep_time)
        setCookTime(recipe?.cook_time)
        setTotalTime(recipe?.total_time)
        setServingSize(recipe?.servings)
        setDirectionsInp(recipe?.directions)
    }, [editActive])


    const handleEdit = () => {
        setEditActive(true)

    }

    const handleCancelEdit = () => {
        handleReAddIngredients()
        setEditActive(false)
        setImage(recipe?.image_url)
        setPhotoPreview(recipe?.image_url)
        setCurrTitle(recipe?.title)
        setPrepTime(recipe?.prep_time)
        setCookTime(recipe?.cook_time)
        setTotalTime(recipe?.total_time)
        setServingSize(recipe?.servings)
        setDirectionsInp(recipe?.directions)
    }

    const handleAddToCollectionClose = () => {
        setShowAddToCollectionModal(false)

    }

    const handleAddRecipe = async (collectionId) => {
        const entry = {
            recipe_id: recipeId,
            collection_id: collectionId
        }

        await dispatch(createCollectionRecipe(entry))
        setShowAddToCollectionModal(false)


    }

    const handleAddToCollectionOpen = (recipeId) => {
        setShowAddToCollectionModal(true)

    }

    const handleDeleteIngredientModalClose = () => {
        setDeleteIngredientModal(false)
    }

    const handleDeleteIngredientModalOpen = () => {
        setDeleteIngredientModal(true)
    }

    const handleDeleteModalClose = () => {
        setDeleteModal(false)
    }

    const handleDeleteModalOpen = () => {
        setDeleteModal(true)
    }

    const handleImageField = (e) => {
        setImage(e.target.value)
    }

    const handleSetTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleSetCollTitle = (e) => {
        setCollTitle(e.target.value)
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

    const imageStyle = {
        width: "500px",
        height: 'auto'
    }

    useEffect(() => {
        dispatch(specificIngredients(recipeId))
    }, [dispatch])

    useEffect(() => {
        dispatch(allCategories())
    }, [dispatch])

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteRecipe(recipe?.id))
        handleDeleteModalClose()
        await history.push('/browse/all')
    }

    const handleCreateCollection = async (e) => {
        e.preventDefault()

        const collection = {
            user_id: sessionUser.id,
            title: collTitle
        }

        if (newCollectionErrors.length === 0 && collTitle.length > 0) {
            dispatch(createCollection(collection))
            setCollTitle('')
            setShowAddModal(false)
        } else {
            setNewCollectionErrors(true)
        }
    }

    const handleAddField = () => {
        setInputFields([...inputFields, {
            title: '', amount: '', measurement: '', recipe_id: recipe?.id
        }])
    }

    const handleReAddIngredients = () => {
        if (removedIng.length > 0) {

            removedIng.map(ingredientobj => {
                dispatch(createIngredient(ingredientobj))
            })
            setRemovedIng([])
        } else {
            return
        }

    }

    const handleDeleteIngredient = () => {
        const values = [...inputFields]
        const removedInp = values.splice(deleteIndex, 1)
        const removed = [...removedIng]
        removed.push(...removedInp)
        setRemovedIng(removed)

        dispatch(deleteIngredient(removedInp[0].id))
        handleDeleteIngredientModalClose()
        setInputFields(values)
    }

    const handleRemoveField = (index) => {
        const values = [...inputFields]
        const verifyInp = values.slice(index, index + 1)
        if (verifyInp[0].id) {
            setDeleteIndex(index)
            handleDeleteIngredientModalOpen()
        } else {
            values.splice(index, 1)
            setInputFields(values)
        }
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
        formData.append('title', currTitle)
        formData.append("image", image);
        // formData.append("user_id", sessionUser.id);
        formData.append("category_id", categoryId);
        formData.append("prep_time", prepTime);
        formData.append("cook_time", cookTime);
        formData.append("total_time", totalTime);
        formData.append("servings", servingSize);
        formData.append("directions", directionsInp);

        // const recipe = {
        //     id: recipeId,
        //     image_url: imageUrl,
        //     title: currTitle,
        //     category_id: categoryId,
        //     prep_time: prepTime,
        //     cook_time: cookTime,
        //     total_time: totalTime,
        //     servings: servingSize,
        //     directions: directionsInp,
        // }

        if (validationErrors.length === 0) {
            dispatch(updateRecipe(+recipeId, formData))

            inputFields?.map(ingredientobj => {
                if (ingredientobj.id) {
                    dispatch(updateIngredient(ingredientobj))
                } else {
                    dispatch(createIngredient(ingredientobj))
                }

            })
            setRemovedIng([])
            setEditActive(false)

        } else {
            setShowErrors(true)
        }


    }

    // const isImageUrl = () => {
    //     if (imageUrl?.includes('http') || imageUrl?.includes('https')) {
    //         if (imageUrl?.includes('.jpg') || imageUrl?.includes('.png') || imageUrl?.includes('.img') || imageUrl?.includes('.jpeg')) {
    //             return true;
    //         }
    //     }
    //     return false
    // }


    return (
        <div>


            <form className='update_recipe_form'>
                <div className='individual_recipe_page'>
                    {/* <form> */}
                    <div className='sticky_block'>
                        <div className='image_block'>
                            {!editActive && recipe?.image_url ? <img src={recipe?.image_url} className='recipe_img' style={imageStyle} alt='image' /> : null}

                            {editActive &&
                                <div>

                                    <div>
                                        {photoPreview !== '#' ? <img src={photoPreview} style={imageStyle} alt='preview' /> : <img src={recipe?.image_url} className='recipe_img' style={imageStyle} alt='image' />}
                                    </div>

                                    <label>Finished Dish Image:</label>
                                    <input type='file'
                                        className='input image-input'
                                        name='image_url'
                                        placeholder='Valid Image URL'
                                        accept="image/*"
                                        onChange={updateImage}
                                    // value={imageUrl}

                                    />

                                </div>
                            }
                        </div>


                        <div className='information_block'>
                            <div className='recipe_info_block'>
                                <div className='recipe_info_top_portion'>

                                    {!editActive ? <div className='recipe_category'>{recipe?.category.title}</div> : <div className='category-block'>
                                        <select className='input' defaultValue={placeholder} onChange={(e) => setCategoryId(e.target.value)}>
                                            <option value="default" disabled hidden>
                                                {recipe?.category.title}
                                            </option>
                                            {categories?.map(category => (
                                                <option key={category.id} value={category.id}>{category.title}</option>
                                            ))}
                                        </select>
                                    </div>}

                                    {sessionUser.id === recipe?.user_id && !editActive ?
                                        <div className='button_block'>
                                            <button type='button' className='update_recipe_button top_button' onClick={handleEdit}>Update Recipe</button>
                                            <button type='button' className='remove_recipe_button top_button' onClick={handleDeleteModalOpen}>Remove Recipe</button>
                                        </div> : null}



                                    {sessionUser.id === recipe?.user_id && editActive ?
                                        <div className='button_block'>
                                            <button type='button' className='remove_recipe_button top_button' onClick={handleCancelEdit}>Cancel Update</button>
                                            <button type='submit' className='update_recipe_button top_button' onClick={handleSubmit}>Submit Update</button>
                                        </div> : null}


                                </div>
                                {editActive ?
                                    <div className='title_block'>
                                        <div className='title_block_inner'>
                                            <label>Name of your dish:</label>
                                            <input type='text'
                                                className='input title-input'
                                                name='title'
                                                // placeholder={recipe?.title}
                                                onChange={(e) => setCurrTitle(e.target.value)}
                                                value={currTitle}
                                            />
                                        </div>
                                        <div className='recipe_title'>{recipe?.title}</div>
                                    </div> : <div className='recipe_title'>{recipe?.title}</div>
                                }

                                <div className='recipe_user_info'>Created By: <span className='username'>
                                    {recipe?.user.username}</span></div>


                            </div>

                            <div className='full_time_block'>

                                <div className='time_block'>
                                    <div className='time_label'>PREP TIME</div>
                                    {editActive ?
                                        <input type='text'
                                            className='input prep-time-input'
                                            name='prep_time'
                                            // placeholder='30 mins | 2 hrs'
                                            onChange={handleSetPrepTime}
                                            value={prepTime}

                                        />
                                        : <div className='time_count'>
                                            {recipe?.prep_time}
                                        </div>}
                                </div>

                                <div className='time_block'>
                                    <div className='time_label'>COOK TIME</div>
                                    {editActive ?
                                        <input type='text'
                                            className='input cook-time-input'
                                            name='cook_time'
                                            // placeholder='30 mins | 2 hrs'
                                            onChange={handleSetCookTime}
                                            value={cookTime}

                                        />
                                        : <div className='time_count'>
                                            {recipe?.cook_time}
                                        </div>}
                                </div>

                                <div className='time_block'>
                                    <div className='time_label'>TOTAL TIME</div>
                                    {editActive ?
                                        <input type='text'
                                            className='input total-time-input'
                                            name='total_time'
                                            // placeholder='30 mins | 2 hrs'
                                            onChange={handleSetTotalTime}
                                            value={totalTime}

                                        />
                                        : <div className='time_count'>
                                            {recipe?.total_time}
                                        </div>}
                                </div>
                            </div>

                            {editActive ?
                                <div className='field-title'>Servings:
                                    <input type='text'
                                        className='input servings_input'
                                        name='servings'
                                        // placeholder='2 - 4 servings | 16 pancakes'
                                        onChange={handleSetServingSize}
                                        value={servingSize}

                                    />
                                </div>

                                : <div className='add_icon_block'> <div className='serving_size'>Servings: {recipe?.servings}</div>
                                    {sessionUser ? <div className='add_button_block'>
                                        <div>Save this recipe: </div>
                                        <BiBookAdd className='icon add_to_collection_bigger' onClick={() => handleAddToCollectionOpen(recipe.id)} />
                                    </div> : null}
                                </div>

                            }


                            <div className='ingredients_label'>Ingredients </div>

                            {!editActive ? recipe?.ingredients.sort((a, b) => a.id - b.id).map(ingredient => (
                                <div key={ingredient.id} className='individual_ingredient_info'>
                                    <BsDot />
                                    <div className='ingredient_amount'>{ingredient.amount}&nbsp;</div>
                                    <div className='ingredient_measurement'>{ingredient.measurement}&nbsp;</div>
                                    <div className='ingredient_title'>{ingredient.title}</div>
                                </div>
                            )) :

                                inputFields?.map((ingredient, index) => (
                                    <div key={index} className='ingredient_row'>
                                        <label>A:</label>
                                        <input type='text'
                                            className='input amount-input'
                                            name='amount'
                                            placeholder='1 | 20 | 1/2 | (optional)'
                                            value={ingredient?.amount}
                                            onChange={e => handleChangeInput(index, e)}
                                        />
                                        <label>M:</label>
                                        <input type='text'
                                            className='input measurement-input'
                                            name='measurement'
                                            placeholder='cup | tbsp |(optional)'
                                            value={ingredient?.measurement}
                                            onChange={e => handleChangeInput(index, e)}
                                        />
                                        <label>I:</label>
                                        <input type='text'
                                            className='required-input input ingredient-input'
                                            name='title'
                                            placeholder='flour | eggs | milk'
                                            value={ingredient?.title}
                                            onChange={e => handleChangeInput(index, e)}
                                        />
                                        <BsDashSquare className='icon square' onClick={() => handleRemoveField(index)} />
                                        <BsPlusSquare className='icon square' onClick={handleAddField} />
                                    </div>
                                ))

                            }
                        </div>
                    </div>

                    <div className='directions_block'>
                        <div className='directions_text'>
                            <div className='directions_label'>Directions: </div>
                            {editActive ?
                                <textarea type='text'
                                    className='input directions_input'
                                    name='directions'
                                    placeholder='1. In a large bowl mix flour, eggs, and milk...'
                                    onChange={handleSetDirectionsInp}
                                    value={directionsInp}

                                /> :
                                recipe?.directions}
                        </div>
                    </div>

                    {deleteModal ?
                        <div className='opaque_container' onClick={handleDeleteModalClose} >

                            <div className='delete_modal'>
                                <div>Are you sure you want to delete your recipe?</div>
                                <div className='delete_modal_buttons'>
                                    <button className='modal_button' type='button' onClick={handleDeleteModalClose}>No, Cancel</button>
                                    <button className='modal_button' onClick={handleDelete}>Yes, Remove</button>
                                </div>
                            </div>
                        </div>
                        : null}

                    {deleteIngredientModal ?
                        <div className='opaque_container' onClick={handleDeleteIngredientModalClose} >

                            <div className='delete_modal'>
                                <div>Are you sure you want to remove this ingredient?</div>
                                <div className='delete_modal_buttons'>
                                    <button className='modal_button' type='button' onClick={handleDeleteIngredientModalClose}>No, Cancel</button>
                                    <button className='modal_button' onClick={handleDeleteIngredient}>Yes, Remove</button>
                                </div>
                            </div>
                        </div>
                        : null}

                    {showErrors ?
                        <div className='opaque_container' onClick={() => setShowErrors(false)} >

                            <div className='error_modal'>
                                <div>You cannot update this recipe until these fields are filled in properly:</div>
                                <div className='error_block'>
                                    {showErrors && <div>
                                        {validationErrors.map((error, ind) => (
                                            <div key={ind}>- {error}</div>
                                        ))}
                                    </div>}
                                    <button className='modal_button' type='button' onClick={() => setShowErrors(false)}>Close Window</button>
                                </div>
                            </div>
                        </div>
                        : null}

                    {showAddToCollectionModal ?
                        <div className='opaque_container' onClick={() => setShowAddToCollectionModal(false)}>
                            <div className='add_recipe_modal' onClick={(e) => e.stopPropagation()}>
                                <div className='modal_title_add'>Select a collection to save this recipe to: </div>
                                <div className='collection_link_list'>
                                    <div className='individual_collection_block_new' onClick={() => setShowAddModal(true)}>
                                        <div className='collection_titles'>Create New Collection</div>
                                    </div>
                                    {collections?.map(collection => (
                                        <div key={collection.id} className='individual_collection_block' onClick={() => handleAddRecipe(collection.id)}>
                                            <div className='collection_titles'>{collection.title}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className='remove_button_block_two'>
                                    <button type='button' className='cancel_button' onClick={handleAddToCollectionClose}>Cancel</button>
                                </div>
                            </div>
                        </div>
                        : null}

                    {showAddModal ?
                        <div className='opaque_container' onClick={() => setShowAddModal(false)}>
                            <div className='add_collection_modal' onClick={(e) => e.stopPropagation()}>
                                <div>Give your new collection a name!</div>
                                {newCollectionErrors.length > 0 ?
                                    newCollectionErrors.map((error, ind) => (
                                        <div key={ind} className='error_message'>{error}</div>
                                    ))
                                    : null}
                                <form className='new_collection_form'>
                                    <input type='text'
                                        className='input title-input'
                                        name='title'
                                        onChange={handleSetCollTitle}
                                        value={collTitle}
                                    />
                                    <button onClick={handleCreateCollection} className='submit_button'>Create Collection</button>
                                </form>
                            </div>
                        </div>
                        : null}
                </div>
            </form>
        </div>
    );
};

export default IndividualRecipe;
