import React, { cloneElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './SavedRecipes.css'

import { allCollections, createCollection, deleteCollection } from '../../store/collection';

import { AiOutlineFieldTime } from 'react-icons/ai'
import { RiEditBoxLine, RiDeleteBack2Fill } from 'react-icons/ri'
import { ImBoxAdd } from 'react-icons/im'

const SavedRecipes = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const collections = Object.values(useSelector(state => state.collections))

    const [showAddModal, setShowAddModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedCollectionId, setSelectedCollectionId] = useState(0)
    const [title, setTitle] = useState('')

    useEffect(() => {
        dispatch(allCollections(sessionUser.id))
    }, [dispatch])

    const handleSetTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const collection = {
            user_id: sessionUser.id,
            title
        }
        dispatch(createCollection(collection))
        setShowAddModal(false)
    }

    const handleDeleteModalOpen = (collectionId) => {
        setShowDeleteModal(true)
        setSelectedCollectionId(collectionId)
    }

    const handleDeleteModalClose = () => {
        setShowDeleteModal(false)
        setSelectedCollectionId(0)
    }

    const handleDeleteCollection = async () => {
        await dispatch(deleteCollection(selectedCollectionId))
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
                                <div>

                                </div>
                                <div key={collection.id} className='title_div'>
                                    <div>{collection.title} ({collection.recipes.length})</div>

                                </div>
                            </NavLink>
                        </div>
                        <div className='single_collection_icons'>
                            <RiDeleteBack2Fill id={collection.id} className='edit_icon' onClick={() => handleDeleteModalOpen(collection.id)} />
                            <RiEditBoxLine id={collection.id} className='remove_icon' />
                        </div>

                    </div>
                ))}
            </div>

            {showAddModal ?
                <div className='opaque_container' onClick={() => setShowAddModal(false)}>
                    <div className='add_collection_modal' onClick={(e) => e.stopPropagation()}>
                        <div>Give your new collection a name!</div>
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
                        <div className='remove_button_block'>
                            <button type='button' className='cancel_button' onClick={handleDeleteModalClose}>Cancel</button>
                            <button type='button' className='delete_button' onClick={handleDeleteCollection}>Delete</button>
                        </div>
                    </div>
                </div>
                : null}


        </div>
    );
};

export default SavedRecipes;
