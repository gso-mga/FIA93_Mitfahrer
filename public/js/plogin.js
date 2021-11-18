import * as js from 'jquery.session';

window.onload = function(){
    document.getElementById('pw').style.display = 'none';
    $.session.set('some key', 'a value');
};




