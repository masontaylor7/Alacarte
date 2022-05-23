import React, { cloneElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './SavedRecipes.css'

import { allCollections, createCollection, deleteCollection, updateCollection } from '../../store/collection';

import { AiOutlineFieldTime } from 'react-icons/ai'
import { RiEditBoxLine, RiDeleteBack2Fill } from 'react-icons/ri'
import { ImBoxAdd } from 'react-icons/im'
import { deleteEntries } from '../../store/collection_recipe';

const SavedRecipes = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const collections = Object.values(useSelector(state => state.collections))
    const [newCollectionErrors, setNewCollectionErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false)

    const [showAddModal, setShowAddModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedCollectionId, setSelectedCollectionId] = useState(0)
    const [editTitle, setEditTitle] = useState(false)
    const [editCollectionId, setEditCollectionId] = useState(0)
    const [title, setTitle] = useState('')

    useEffect(() => {
        const errors = []
        if (title.length === 0) errors.push('A name is required')
        setNewCollectionErrors(errors)
    }, [title])

    useEffect(() => {
        dispatch(allCollections(sessionUser.id))
    }, [dispatch])

    const handleSetTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleUpdateTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const collection = {
            user_id: sessionUser.id,
            title
        }

        if (newCollectionErrors.length === 0) {
            dispatch(createCollection(collection))
            setTitle('')
            setShowAddModal(false)
        } else {
            setShowErrors(true)

        }

    }

    const handleEditSubmit = async (e) => {
        e.preventDefault()

        const collection = {
            id: editCollectionId,
            title,
        }

        dispatch(updateCollection(collection))
        setTitle('')
        setEditCollectionId(0)
        setEditTitle(false)

    }

    const handleDeleteModalOpen = (collectionId) => {
        setShowDeleteModal(true)
        setSelectedCollectionId(collectionId)
    }

    const handleEditModalOpen = (collectionId, collectionTitle) => {
        console.log(collectionTitle, collectionId)
        setTitle(collectionTitle)
        setEditCollectionId(collectionId)
        setEditTitle(true)
    }

    const handleEditModalClose = () => {
        setEditTitle(false)
        setTitle('')
        setNewCollectionErrors([])
        setEditCollectionId(0)
    }

    const handleDeleteModalClose = () => {
        setShowDeleteModal(false)
        setSelectedCollectionId(0)
    }

    const handleDeleteCollection = async () => {
        await dispatch(deleteEntries(selectedCollectionId))
        await dispatch(deleteCollection(selectedCollectionId))
        setSelectedCollectionId(0)
        setShowDeleteModal(false)
    }

    return (
        <div className='collections_page'>
            <div className='button_block'>
                <button type='button' className='button_style1 add_collection_button' onClick={() => setShowAddModal(true)}>Create New Collection<ImBoxAdd className='add_icon' /></button>
            </div>

            <div className='collections_block'>
                {collections.map(collection => (
                    <div key={collection.id} className='single_container'>
                        <div className='title_nav_link'>

                            <NavLink className='single_collection' to={`/collections/${collection.id}`}>

                                <div className='title_div'>
                                    {collection.title} ({collection.recipes.length} recipes)
                                </div>
                            </NavLink>
                        </div>
                        <div className='single_collection_icons'>
                            <RiDeleteBack2Fill id={collection.id} className='edit_icon' onClick={() => handleDeleteModalOpen(collection.id)} />
                            <RiEditBoxLine id={collection.id} className='remove_icon' onClick={() => handleEditModalOpen(collection.id, collection.title)} />
                        </div>

                    </div>
                ))}
            </div>

            {showAddModal ?
                <div className='opaque_container' onClick={() => setShowAddModal(false)}>
                    <div className='add_collection_modal' onClick={(e) => e.stopPropagation()}>
                        <div>Give your new collection a name!</div>
                            {showErrors && newCollectionErrors.length > 0 ?
                                newCollectionErrors.map((error, ind) => (
                                    <div key={ind} className='error_message'>{error}</div>
                                ))
                                : null}
                        <form className='new_collection_form'>
                            <input type='text'
                                className='input title-input'
                                name='title'
                                onChange={handleSetTitle}
                                value={title}
                            />
                            <button onClick={handleSubmit} className='submit_button'>Create Collection</button>
                            </form>
                    </div>
                </div>
                : null}

            {showDeleteModal ?
                <div className='opaque_container' onClick={() => setShowDeleteModal(false)}>
                    <div className='delete_collection_modal' onClick={(e) => e.stopPropagation()}>
                        <div>Are you sure you want to delete this collection?</div>
                        <div className='remove_button_block_two'>
                            <button type='button' className='cancel_button' onClick={handleDeleteModalClose}>Cancel</button>
                            <button type='button' className='delete_button' onClick={handleDeleteCollection}>Delete</button>
                        </div>
                    </div>
                </div>
                : null}

            {editTitle ?
                <div className='opaque_container' onClick={handleEditModalClose}>
                    <div className='add_collection_modal' onClick={(e) => e.stopPropagation()}>
                        <div>What is the new name of the collection?</div>
                        <form className='new_collection_form'>
                            <input type='text'
                                className='input title-input'
                                name='title'
                                onChange={handleUpdateTitle}
                                value={title}
                            />
                            <div className='remove_button_block_two'>
                                <button type='button' className='cancel_button' onClick={handleEditModalClose}>Cancel</button>
                                <button onClick={handleEditSubmit} className='submit_button'>Update Name</button>
                            </div>
                        </form>
                    </div>
                </div>
                : null}


        </div>
    );
};

export default SavedRecipes;
