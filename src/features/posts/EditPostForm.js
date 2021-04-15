import { nanoid } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { selectPostById, updatePost } from './postSlice'

export const EditPostForm = ({ match }) => {
    const { postId } = match.params

    const post = useSelector(state => selectPostById(state, postId))

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)

    const dispatch = useDispatch()
    const history = useHistory()

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(updatePost({ id: postId, title, content }))
            history.push(`/posts/${postId}`)
        }
    }

    return (
        <div>
            <h2>Update Post</h2>
            <form>
                <input type="text" value={title} onChange={onTitleChanged} placeholder="Post Title" />
                <textarea value={content} onChange={onContentChanged} placeholder="Post Content"></textarea>
                <button type="button" onClick={onSavePostClicked}>Save Post</button>
            </form>
        </div>
    )
}
