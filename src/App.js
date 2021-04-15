import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Footer } from './app/Footer';
import { NavBar } from './app/NavBar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { PostList } from './features/posts/PostList';
import { AddPostForm } from './features/posts/AddPostForm';
import { SinglePostPage } from './features/posts/SinglePostPage';
import { EditPostForm } from './features/posts/EditPostForm';
import './api/server'

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" render={() => (
          <React.Fragment>
            <AddPostForm />
            <PostList />
          </React.Fragment>
        )} />
        <Route exact path="/posts/:postId" component={SinglePostPage} />
        <Route exact path="/posts/:postId/edit" component={EditPostForm} />
        <Route exact path="/counter" component={Counter} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
