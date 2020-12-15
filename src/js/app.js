window.addEventListener('load', function(){

    var firebaseConfig = {
        apiKey: "AIzaSyAU0Q5-G_p-IRMqtBVDi7pY2zajZOO7vT8",
        authDomain: "alglin-509c3.firebaseapp.com",
        databaseURL: "https://alglin-509c3-default-rtdb.firebaseio.com",
        projectId: "alglin-509c3",
        storageBucket: "alglin-509c3.appspot.com",
        messagingSenderId: "52030178919",
        appId: "1:52030178919:web:703dbfee90b5c10ed1b6c2"
    };

    firebase.initializeApp(firebaseConfig);

    function reload(value){
        var questionsElement = document.querySelector('#questions');
        questionsElement.innerHTML = '';

        Object.values(value).forEach(function(child){
            var question = child.question;
            var questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.innerText = question;

            var toolbar = document.createElement('div');
            toolbar.classList.add('toolbar');
            var answer = document.createElement('div');
            answer.classList.add('answer');
            answer.innerText = child.value == '0' ? 'Vrai' : 'Faux';

            toolbar.appendChild(answer);

            questionElement.appendChild(toolbar);

            questionsElement.appendChild(questionElement);
        });
        
        MathJax.Hub.Typeset();
    }

    firebase.database().ref('/questions').on('value', function(data){
        var value = data.val();
        reload(value);
    });

    var textarea = document.querySelector('#editor textarea');
    var preview = document.querySelector('#preview');

    var button = document.querySelector('#submit');

    textarea.addEventListener('input', function(){
        preview.innerText = textarea.value;
        MathJax.Hub.Typeset();
    });

    button.addEventListener('click', function(){
        var value = textarea.value;
        if(value.length > 0 && document.querySelector('#buttons button.active') !== null){
            console.log(value);

            firebase.database().ref().child('questions').push({
                question: value,
                value: document.querySelector('#buttons button.active').dataset.value
            });

            textarea.value = '';
            preview.innerText = '';
        }
    });

    Array.from(document.querySelectorAll('#buttons button')).forEach(function(button){
        button.addEventListener('click', function(){
            Array.from(document.querySelectorAll('#buttons button')).forEach(function(button){
                if(button.classList.contains('active')){
                    button.classList.remove('active');
                }
            });

            button.classList.add('active');
        });
    });

});