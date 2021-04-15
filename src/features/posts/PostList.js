import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { fetchPosts, selectAllPosts } from './postSlice'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'

export const PostList = () => {
    const dispatch = useDispatch()

    const posts = useSelector(selectAllPosts)
    const postStatus = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content

    if (postStatus === 'loading') {
        content = <div>Loading...</div>
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => (
            <article className="post-excerpt" key={post.id}>
                <h3>{post.title}</h3>
                <p className="post-content">{post.content.substring(0, 100)}</p>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
                <Link to={`/posts/${post.id}`}>View Post</Link>
                <ReactionButtons post={post} />
            </article>
        ))
    } else if (postStatus === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <div className="post-list">
            <h2>Posts</h2>
            {content}
        </div>
    )
}
