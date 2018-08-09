import React from 'react';
import { Link } from 'react-router-dom';

// as opposed to the <a></a> tag that doesn't
// use client side refresh advantages.
// Link calls render instead of asking the server
// for the seekd html page.
const NotFound = () => (    
    <div>
        404! - <Link to="/">Go home.</Link>
    </div>
);

export default NotFound;
