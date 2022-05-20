import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './SavedRecipes.css'

import { allCollections } from '../../store/collection';

import { AiOutlineFieldTime } from 'react-icons/ai'

const SavedRecipes = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const collections = Object.values(useSelector(state => state.collections))

    useEffect(() => {
        dispatch(allCollections(sessionUser.id))
    }, [dispatch])

    return (
        <div className='collections_page'>
            {collections.map(collection => (
                <NavLink key={collection.id} className='single_collection' to={`/collections/${collection.id}`}>
                    <div key={collection.id} className='single_collection'>
                        <div>{collection.title}</div>
                    </div>
                </NavLink>
            ))}
        </div>
    );
};

export default SavedRecipes;
