const form = document.getElementById('loginForm');
form.addEventListener('submit', async function(event) { 
    event.preventDefault();
    let id = document.getElementById('loginUsername').value;
    let pass = document.getElementById('loginPassword').value;

    const credentials = {
        'userid':id,
        'newpass':pass
    }


    const usersinputdata = JSON.stringify(credentials);
    
    const realcredentials = await fetch('users.json').then(response => response.json());

    checkdata(credentials,realcredentials);

    console.log(usersinputdata);
    console.log(realcredentials);
     });

function checkdata(input,real){
    for(let i=0;i<=1;i++){    
        console.log(Object.values(input),Object.values(real[i]))
        if(JSON.stringify(Object.values(input)) === JSON.stringify(Object.values(real[i]))){
            window.alert("LOGIN SUCCESSFULL")
            location.href = 'weather.html'
            break;
        }
        else{
            window.alert("LOGIN UNSUCCESSFULL")
            location.reload();
        }
        
    }
}

