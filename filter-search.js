<script type="text/javascript">
/***
*   @author Victor Chimenti, MSCS 2020
*   @file filter-search.js
*   @see UCOR, UNIVERSITY CORE CURRICULUM, https://www.seattleu.edu/core/for-students/courses/
*   as an example of this filter engine
*   This URI will change after launch to to suit the host department
*
*   jQuery
*   This script searches the Bibliography content items for matches to the
*   user selected search parameters in the filter field dropdown menus
*
*   @version 1.3
*/






$(function () {
    // After the DOM is ready, Wait until the window loads
    $(window).load(function () {
        // Once window loads set a timeout delay
        setTimeout(function () {




            //** global array holds list of content items that will render after filter selection **//
            var visibleItems = [];
            var parseItems = {};



            
            //   ***   Process and Parse Visible Items   ***   //
            $(function () {
                let parseItemsToDisplay = function() {
                    // assign array of currently visible content items
                    visibleItems = $('.knowledgeBaseItemWrapper').not('.hideByText, .hideByType');
                    // check to see if array is empty
                    if (visibleItems.length == 0) {
                        // when array is empty show the results message
                        $('.noResultsToShow').removeClass('hideResultsMessage');
                    } else {
                        // when array has content items suppress the results message
                        $('.noResultsToShow').addClass('hideResultsMessage');
                    }
                };
                parseItems.process = parseItemsToDisplay;
            });
            
            
            
            
            //   ***   Keyword Search   ***   //
            $(function () {
                // scan the keyword each character the user inputs
                $('#keystroke_filter').on('keyup', function () {
                    // Assign Search Key
                    let keyword = $(this).val().toLowerCase();
                    // filter the education abroad items for the input key
                    $(function () {
                        $('.knowledgeBaseItemWrapper').filter(function () {
                            // when the search key is not present in the item then hide the item
                            $(this).toggleClass('hideByText', !($(this).text().toLowerCase().indexOf(keyword) > -1));
                        });
                    });
                    // parse out unselected content items and limit display to user selected items
                    parseItems.process();
                });
            });




            //   ***   Type Filter   ***   //
            $(function () {
                $('#SelectBox-ByType').change(function () {
                    let typeKey = $(this).val();
                    if (typeKey) {
                        $('ul.tags').each(function (i,e) {
                            let typeValue = $(this).text();
                            if (typeValue.match(typeKey)) {
                                $(this)
                                    .parents('.knowledgeBaseItemWrapper')
                                    .removeClass('hideByType');
                            } else {
                                $(this)
                                    .parents('.knowledgeBaseItemWrapper')
                                    .addClass('hideByType');
                            }
                        });
                    } else {
                        $('.knowledgeBaseItemWrapper')
                            .removeClass('hideByType');
                    }
                    parseItems.process();
                });
            });




        }, 10);
    });
});
</script>