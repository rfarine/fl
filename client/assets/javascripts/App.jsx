import $ from 'jquery';
import React from 'react';
import CommentBox from './components/CommentBox';

$(function onLoad() {
  function render() {
    if ($('#content').length > 0) {
      React.render(
        <div>
          <CommentBox url='comments.json' pollInterval={5000}/>
        </div>,
        document.getElementById('content')
      );
    }
  }

  render();

  // Next part is to make this work with turbo-links
  $(document).on('page:change', () => {
    render();
  });
});
