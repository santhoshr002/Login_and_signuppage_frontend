const form = document.getElementById('login');
    
          form.addEventListener('submit', (event) => {
            event.preventDefault(); // prevent form submission
    
            // get form input values
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
    
            // perform form validation
            if (username === '') {
               window.alert('Please enter your username');
              return;
            }
    
            if (password === '') {
              alert('Please enter your password');
              return;
            }
    
            if (!isValidUsername(username)) {
              alert('Please enter a valid username');
              return;
            }
            // if (!isValidPassword(password)) {
            //   alert('Please enter a valid  password');
            //   return;
            // }
            if(password.length<5)
            {
              alert('password not less than 6 characters');
              return;
            }
            fetch('http://localhost:3000/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ username: username, password: password })
              
            })
              .then(response => response.json())
              .then(data => {
                console.log(data);
                if (data.success) {
                  window.location.href = "view.html"; 
                } else {
                  window.location.href = "index.html";
                  alert(data.message);
                }
              })
              .catch(error => {
                console.log("error")
                console.error(error);
              });
            // if input passes validation, submit the form
            form.submit();
          });
    
          function isValidUsername(username) {
            
            const usernameRegex = /^[a-zA-Z0-9_-]{4,16}$/;
            return usernameRegex.test(username);
          }
          function isValidPassword(password) {
            
            const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordRegex.test(password);
          }

         