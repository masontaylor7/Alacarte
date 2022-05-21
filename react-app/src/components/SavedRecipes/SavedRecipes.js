import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './SavedRecipes.css'

import { allCollections } from '../../store/collection';

import { AiOutlineFieldTime } from 'react-icons/ai'
import { ImBoxAdd } from 'react-icons/im'

const SavedRecipes = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const collections = Object.values(useSelector(state => state.collections))
    // const firstThree = collections.recipes.slice(0, 3)
    console.log(collections, '.......')

    useEffect(() => {
        dispatch(allCollections(sessionUser.id))
    }, [dispatch])

    const imageStyle = {
        width: "100px",
        height: 'auto',
    }

    return (
        <div className='collections_page'>
            <div className='button_block'>
                <button type='button' className='button_style1 add_collection_button'>Create New Collection<ImBoxAdd className='add_icon'/></button>
            </div>

            <div className='collections_block'>
                {collections.map(collection => (
                    <div key={collection.id} className='image_container'>
                        {/* <div className='images_block'>
                        <img src={collection?.recipes[0]?.image_url} style={imageStyle} className='one_image'/>
                        <img src={collection?.recipes[1]?.image_url} style={imageStyle} />
                        <img src={collection?.recipes[2]?.image_url} style={imageStyle} />
                        <img src={collection?.recipes[3]?.image_url} style={imageStyle} />
                    </div> */}
                        <NavLink className='single_collection' to={`/collections/${collection.id}`}>
                            <div key={collection.id}>
                                <div>{collection.title} ({collection.recipes.length})</div>

                            </div>
                        </NavLink>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedRecipes;
