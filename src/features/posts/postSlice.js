import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import { sub } from "date-fns"
import { client } from "../../api/client"

const initialReactions = {
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0
}

const initialState = {
    status: 'idle',
    error: null,
    posts: []
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await client.get('/fakeApi/posts')
        return response.posts
    }
)

export const storePostRemote = createAsyncThunk(
    'posts/storePostRemore',
    async initialPost => {
        // send the initial data to the fake api server
        const response = await client.post('fakeApi/posts', { post: initialPost })
        return response.post
    }
)

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: {
            reducer: (state, action) => {
                state.posts.push(action.payload)
            },
            prepare: (title, content, userId) => {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                        reactions: initialReactions
                    }
                }
            }
        },
        updatePost: (state, action) => {
            const { id, title, content } = action.payload
            const existingPost = state.posts.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        addReaction: (state, action) => {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.posts = state.posts.concat(action.payload)
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [storePostRemote.fulfilled]: (state, action) => {
            state.posts.push(action.payload)
        }
    }
})

export const { addPost, updatePost, addReaction } = postSlice.actions

export default postSlice.reducer

export const selectAllPosts = state => state.posts.posts
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id == postId)