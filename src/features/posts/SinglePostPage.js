import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { selectPostById } from './postSlice'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'

export const SinglePostPage = ({ match }) => {
    const { postId } = match.params

    const post = useSelector(state => selectPostById(state, postId))

    if (!post) {
        return <p>Post not Found!</p>
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <PostAuthor userId={post.user} />
            <TimeAgo timestamp={post.date} />
            <Link to={`/posts/${postId}/edit`}>Edit Post</Link>
            <ReactionButtons post={post} />
        </div>
    )
}
