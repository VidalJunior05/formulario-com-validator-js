let validator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true;

        let inputs = document.querySelectorAll('input');
        
        validator.clearErros();

        for(let i=0; i<inputs.length; i++){
            let input = inputs[i];
            let check = validator.checkInput(input);
            if(check !== true){
                send = false;
                validator.showError(input, check);
            }

        }
        if(send){
            //formValidator.submit();
            let msgSucess = document.querySelector('.msgSucessRegistration');
             msgSucess.style.display = 'block';
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null){
            rules = rules.split('|');
            for(let k in rules){
                let rDetails = rules[k].split('=');

                
                switch(rDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Este campo é obrigatório';
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return 'O Campo tem que ter pelo menos '+ rDetails[1] +' caracteres';
                        }
                    break;
                    case 'email':
                        if(input.value != ''){
                            //Expressão regular
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é válido!';
                            }
                        }   
                    break;
                }   
            }
        }
        return true;
    },
    showError:(input, error) => {
        input.style.borderColor = '#FF0000';

        let errorElement= document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        //Inserindo elemento abaixo do input
        input.parentElement.insertBefore(errorElement, input.ElementSibling);

    },
    clearErros:() => {
        let inputs = formValidator.querySelectorAll('input');
        for(let i=0;i<inputs.length;i++){
            inputs[i].style= '';
        }

        let errorElementsRemove = document.querySelectorAll('.error');
        for( let i=0; i<errorElementsRemove.length; i++){
            errorElementsRemove[i].remove();
        }
    }
};

let formValidator = document.querySelector('.form-validator');
formValidator.addEventListener('submit', validator.handleSubmit);