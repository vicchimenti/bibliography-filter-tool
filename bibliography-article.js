  /***
*     @author Victor Chimenti, MSCS 2020
*     @file article-content-type.js
*
*     This new content type is being adapted from the knowledge base
*     content type used by IT Services and is intended to provide a
*     searchable, sortable group of articles that can be exported to and used
*     by any department.
*
*     This specific project is intended for the Ethics and Transformative
*     Technologies initiative, although this content type should easily be
*     exportable to other teams.
*
*     This content type will work in conjunction with the Organizer and each item
*     will contain one searchable, article. The filter/search tool created in
*     in conjunction with this content type will complete to full application.
*
*     Document will write once when the page loads
*
*     @version 1.5
*/

try {
  /* -- Store all the things -- */
  var articleTitle = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Title' output='normal' display_field='value' />");

  // var articleTypes = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Categories' output='normal' display_field='value' />");
    // var articleTypes = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Categories' output='normal' display_field='value' />");
  // var articleTypes = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Categories' output='normal' display_field='value' />");

  var articleTags = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Tags' output='normal' display_field='value' />");
  var articleSummary = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Summary' output='normal' display_field='value' />");
  var lastModified = '<div class="lastModified" style="display:inline-block">Last modified: <t4 type="meta" meta="last_modified" format="MMMM d, yyyy" /></div>';
  var keyWords = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Searchable Keyword' output='normal' display_field='value' />");

  // var keyWords = content.get("Searchable Keyword");
  var listOfTags = "";
  // var listOfTypes = "";


  /* -- Prepare all the things -- */
  var beginningHTML = '<div class="knowledgeBaseItemWrapper" id="id<t4 type=\'meta\' meta=\'content_id\' />"><div class="knowledgeBaseItem standardContent">';
  var endingHTML = '</div></div>';


  /* parse the list of tags, add <li> tags*/
  if (articleTags != "") {
    var arrayOfTags = articleTags.split(',');
    for (let i = 0; i < arrayOfTags.length; i++) {
      listOfTags += '<li class="tag">' + arrayOfTags[i] + '</li>';
    }
    listOfTags = '<ul>' + listOfTags + '</ul>';
  }

    /* parse the list of categories, add <li> tags*/
  // if (articleTypes != "") {
  //   var arrayOfTypes = articleTypes.split(',');
  //   for (let i = 0; i < arrayOfTypes.length; i++) {
  //     listOfTypes += '<li class="articleType">' + arrayOfTypes[i] + '</li>';
  //   }
  //   listOfTypes = '<ul>' + listOfTypes + '</ul>';
  // }

  


  /* -- Write all the things -- */
  document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, beginningHTML));

  document.write('<div class="summaryWrapper">');
  document.write('<div class="summaryTitle">' + articleTitle + '</div>')
  document.write('<div class="summary">' + articleSummary + '</div>')
  document.write(listOfTags);


  /* -- Write Program Level 1 Details --*/
  if (listOfTypes != "") {
    document.write('<div class="levelOne">');
    document.write('<div class="articleDetails articleTypes"><h5>Categories: </h5><div class="articleTypes"><span>' + listOfTypes + '</span></div></div>');
    document.write('</div>');
  } else {
    document.write('<div class="levelOne articleDetails articleType" style="display: none";><h5>No Category Provided</h5></div>');
  }

  document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, lastModified));
  document.write('<div class="keywords" style="display:none;" aria-hidden="true">' + keyWords + '</div>');
  document.write('</div>'); // close summaryWrapper

  document.write(endingHTML);

} catch (err) {
  document.write(err.message);
}
