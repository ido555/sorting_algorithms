$(document).ready(function(){ // jQuery has loaded and the DOM is ready to manipulate

    const $chart = $('#chart');

    // Function to generate the bar graph
    function generate_bar_graph(data) {

        // Clear existing bars
        $chart.empty();

        // Generate bars
        for (let i = 0; i < data.length; i++) {
            let $bar = $("<div>").addClass("bar");
            
            $bar.attr("id", i);
            $bar.attr("data-value", data[i]);
            $bar.css("height", data[i] + "px");
            
            $chart.append($bar);
        }

    }

    function generate_number_array(min, count) {
        var number_array = [];
        
        for (var i = 0; i < count; i++) {
            number_array.push(min + i);
        }
        
        return number_array;
    }

    // Randomize array in-place using Durstenfeld shuffle algorithm
    function shuffleArray(array) {
        
        for (var i = array.length - 1; i > 0; i--) {

            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];

            array[i] = array[j];
            array[j] = temp;

        }

        return array;
    }

    async function bubble_sort() {

        let elements = [];

        $("#chart .bar").each(async function(){
            elements.push($(this));
        })
        
        // use for of loop so await works as expected
        for (const element of elements) {

            let $cur_bar  = element, 
                $next_bar = $cur_bar.next();
        
            // this is the last element.
            if ($next_bar.length === 0) {
                return;
            }

            $cur_bar.addClass("red");
            $next_bar.addClass("red");

            await timeout(0);

            let this_value = parseInt($cur_bar.attr("data-value")),
                next_value = parseInt($next_bar.attr("data-value"));

            // this bar is bigger than the next. swap them.
            if (this_value > next_value) {
                $cur_bar.insertAfter($next_bar);
            }

            $cur_bar.removeClass("red");
            $next_bar.removeClass("red");

        }

    }

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let stop = false;
    let interval = 0;

    $(".bubble_sort").on("click", function name() {

        if (stop) {
            clearInterval(interval);
        }else{
            interval = setInterval(()=>{
                            bubble_sort();
                        }, 50)
        }

        stop = !stop;

    })

    $(".test_button").click(function () { 
        generate_bar_graph(data);
    });

    const data = shuffleArray(generate_number_array(5,55));
    generate_bar_graph(data);

});
