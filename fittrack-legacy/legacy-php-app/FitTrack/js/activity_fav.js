$(function() {
    // Step 12: Adding onClick events
    $('body').on('click', '#addFav', function(e) {
        // Step 13: Storing activity ID
        var activity_id = $(this).data('activityid');

        // Step 14: Making an AJAX call
        $.ajax({
            method: "POST",
            url: "./ajax/togglefav.php",
            dataType: 'json',
            data: { activity_id: activity_id }
        })
        .done(function(rtnData) {
            console.log(rtnData);
            // Step 17: Changing button to "Remove from favourites"
            $('#addFav').text('Remove from favourites').attr('id', 'removeFav');
        });
    });

    $('body').on('click', '#removeFav', function(e) {
        // Step 16: Storing activity ID
        var activity_id = $(this).data('activityid');

        // Step 16: Making an AJAX call
        $.ajax({
            method: "POST",
            url: "./ajax/togglefav.php",
            dataType: 'json',
            data: { activity_id: activity_id }
        })
        .done(function(rtnData) {
            console.log(rtnData);
            // Independent Step: Changing button to "Add to favourites"
            $('#removeFav').text('Add to favourites').attr('id', 'addFav');
        });
    });
});

