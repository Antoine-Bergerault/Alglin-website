window.addEventListener('load', () => {

    const textarea = document.querySelector('#editor textarea');
    const preview = document.querySelector('#preview');

    const button = document.querySelector('#editor button');

    textarea.addEventListener('input', () => {
        preview.innerText = textarea.value;
        MathJax.Hub.Typeset();
    });

    button.addEventListener('click', () => {
        const value = textarea.value;
        if(value.length > 0){
            console.log(value);
            alert('question registered');

            textarea.value = '';
            preview.innerText = '';
        }
    });

});