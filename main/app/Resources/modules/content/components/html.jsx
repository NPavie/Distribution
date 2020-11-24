import React from 'react'
import {PropTypes as T} from 'prop-types'
import classes from 'classnames'
import omit from 'lodash/omit'


import JsxParser from 'react-jsx-parser';
import { HashLink } from 'react-router-hash-link';



/**
 * Interprets and displays HTML content.
 *
 * @param props
 * @constructor
 */
const ContentHtml = props => {
    const anchorsMatcher = RegExp(/<a[^>]*href="#[^\/"]*"[^>]*>.*<\/a>/gi);
    var contentWithHashLinks = props.children.replace(anchorsMatcher, (match) => {
      return match.replace('<a','<HashLink')
        .replace('/a>','/HashLink>')
        .replace('href=','to=');
    });

    return <div
        {...omit(props, 'children')}
        className={classes('text-html-content text-justify', props.className)}>
      <JsxParser 
        components={{ HashLink }}
        jsx={contentWithHashLinks}/>
    </div>;
  }

ContentHtml.propTypes = {
  /**
   * HTML content to display.
   */
  children: T.string.isRequired,

  /**
   * Additional classes to add to the DOM.
   */
  className: T.string
}

export {
  ContentHtml
}
