const client = new Appwrite.Client();
      client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
        .setProject('67309edd0038034a0603'); // Your project ID

const account = new Appwrite.Account(client);


const container = document.querySelector(".container"),
  pwShowHide = document.querySelectorAll(".showHidePw"),
  pwFields = document.querySelectorAll(".password"),
  signUp = document.querySelector(".signup-link"),
  login = document.querySelector(".login-link");

// js code to show/hide password and change icon
pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    pwFields.forEach((pwField) => {
      if (pwField.type === "password") {
        pwField.type = "text";

        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye-slash", "uil-eye");
        });
      } else {
        pwField.type = "password";

        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye", "uil-eye-slash");
        });
      }
    });
  });
});

// js code to appear signup and login form
signUp.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.add("active");
});

login.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.remove("active");
});

// const signUpButton = document.querySelector(".signup-button");
// console.log(signUpButton);
// signUpButton.addEventListener('click', function(event) {
//   validateForm(event);
// });


async function validateFormSighUp() {
  // Clear previous error messages
  const errorMessagesDiv = document.getElementById('errorMessages');
  errorMessagesDiv.innerHTML = '';

  // Get form field values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const termsChecked = document.getElementById('termCon').checked; // Checkbox value

  // Flag to check if there are any validation errors
  let errorMessages = [];

  // Check if name is empty
  if (!name) {
    errorMessages.push('Name is required.');
  }

  // Check if email is empty or not a valid email
  if (!email) {
    errorMessages.push('Email is required.');
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errorMessages.push('Please enter a valid email address.');
  }

  // Check if password is empty
  if (!password) {
    errorMessages.push('Password is required.');
  }

  // Check if confirm password is empty
  if (!confirmPassword) {
    errorMessages.push('Confirm Password is required.');
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    errorMessages.push('Passwords do not match.');
  }

  // Check if terms & conditions checkbox is checked
  if (!termsChecked) {
    errorMessages.push('You must agree to the Terms & Conditions.');
  }

  // If there are any errors, display them and prevent form submission
  if (errorMessages.length > 0) {
    errorMessagesDiv.innerHTML = "please fill above information correctly first";
    errorMessagesDiv.style.marginTop = "14px"
    errorMessagesDiv.style.color = "red"
  } else {
    registerUser(email, password, name);
  }
}

async function validateFormLogin() {

  // Clear previous error messages
  const errorMessagesDiv = document.getElementById('LoginerrorMessages');
  errorMessagesDiv.innerHTML = '';

  const email = document.getElementById('emailLogin').value;
  const password = document.getElementById('passwordLogin').value;

  // Flag to check if there are any validation errors
  let errorMessages = [];

  // Check if email is empty or not a valid email
  if (!email) {
    errorMessages.push('Email is required.');
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errorMessages.push('Please enter a valid email address.');
  }

  // Check if password is empty
  if (!password) {
    errorMessages.push('Password is required.');
  }

  // If there are any errors, display them and prevent form submission
  if (errorMessages.length > 0) {
    errorMessagesDiv.innerHTML = "please fill above information correctly first";
    errorMessagesDiv.style.marginTop = "14px"
    errorMessagesDiv.style.color = "red"
  } else {
    loginUser(email, password);
  }
}


function registerUser(email, password, name) {
  account.create('unique()', email, password, name)
      .then(response => {
          console.log('User registered successfully', response);
          alert('Registration successful!');
          window.location.href = '/';
      })
      .catch(error => {
          console.error('Error registering user', error);
          alert('Registration failed: ' + error.message);
      });
}
function loginUser(email, password) {
account.createEmailPasswordSession(email, password)
  .then(response => {
      console.log('User logged in successfully', response);
      alert('Login successful!');
      window.location.href = '/';
  })
  .catch(error => {
      console.error('Login failed', error);
      alert('Login failed: ' + error.message);
  });
}
async function authenticateStatus() {
try {
const user = await account.get();
// Logged in
} catch (err) {
// Not logged in
  console.log(err);
}
} 
function logoutUser() {
account.deleteSession('current')
.then(response => {
  console.log('User logged out successfully', response);
  alert('Logout successful!');
  window.location.href = '/'; // Redirect to login page after logout
})
.catch(error => {
  console.error('Logout failed', error);
  alert('Logout failed: ' + error.message);
});
}

document.getElementById('registerFORM').addEventListener('submit', function (event) {
  event.preventDefault();
  
  validateFormSighUp(name, email, password);
});
document.getElementById('loginFORM').addEventListener('submit', function (event) {
event.preventDefault(); // Prevents page reload

  validateFormLogin(email, password);
});
