window.addEventListener('load', function(){

    var textarea = document.querySelector('#editor textarea');
    var preview = document.querySelector('#preview');

    var button = document.querySelector('#editor button');

    textarea.addEventListener('input', function(){
        preview.innerText = textarea.value;
        MathJax.Hub.Typeset();
    });

    button.addEventListener('click', function(){
        var value = textarea.value;
        if(value.length > 0){
            console.log(value);
            alert('question registered');

            textarea.value = '';
            preview.innerText = '';
        }
    });

});