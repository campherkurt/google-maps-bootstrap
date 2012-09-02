$(document).ready(function(){
    var options = {'show':false};
    $('#search_box').modal(options);

    $("input#search_input").autocomplete({
        source: build_search_list()
    });

    $("#search_form").submit(function() {
        var search_query = $("#search_input").val();
        query_marker = find_marker(search_query);
        if(query_marker != null) {
            query_marker.setIcon(SEARCH_MARKER_ICON);
        }
        else {
            alert('An error has occurred. Please try again.');
        };
        $('#search_box').modal('hide');
        return false;
    });

    function build_search_list() {
        var titles = []
        for (var indx in coordinateArray){
            titles.push(coordinateArray[indx]['title']);
        }
        return titles;
    };
    
    function find_marker(query) {
        var marker_id
        for (var indx in coordinateArray) {
            if(query == coordinateArray[indx]['title']) {
                marker_id = coordinateArray[indx]['id'];
                break;
            }
        }
        for (var indx in ALL_MARKERS) {
            if (ALL_MARKERS[indx]['id'] == marker_id) {
                return ALL_MARKERS[indx];
                break;
            }
        }
        return null;
    };
})