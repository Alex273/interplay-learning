import * as $ from 'jquery';
import Post from './Post';
import React from 'react';
import {render} from 'react-dom';
import Image from './assets/images/image.png';
import './babel';
import './styles/styles.css';
import './styles/scss.scss';

const post = new Post('Webpack post Title', Image);

$('pre').html(post.toString());

const App = () => (
    <div className="container">
        <h1>Interplay Learning</h1>
        <hr />
        <div className="logo" />

        <div className="box">
            <h2>Sass</h2>
        </div>
    </div>
);

render(<App />, document.getElementById('app'));