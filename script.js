const client = new Appwrite.Client();
    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
        .setProject('67309edd0038034a0603'); // Your project ID

const account = new Appwrite.Account(client);

async function readBook(BookName) {
    let user;
    try {
    user = await account.get();
    // Logged in
    if (user) {
        window.open(`../Books PDF/Strategy/${BookName}`, "_blank"); // Opens the PDF in a new tab
    }
    else {
        alert("You have not access to read this book please login first");
        window.location.href = "../Log/index.html";
    }
    } catch (err) {
    // Not logged in
        console.log(err);
    }
    if (!user) {
        alert("You don't have access to read this book please login first");
        window.location.href = "../Log/index.html";
    }
}


    // Function to handle logout
    const logoutUser = async () => {
        try {
          await account.deleteSession('current'); // Logout current session
          alert('You are now logged out.');
          document.getElementById('loginBtn').innerHTML = 'Login'; // Update button text
        } catch (error) {
          alert('Logout failed. Please try again.');
          console.error(error);
        }
      };
    // Function to check if the user is authenticated
    const checkAuthStatus = async () => {
        try {
        const user = await account.get(); // Fetch user details if logged in
        return !!user; // Return true if user exists
        } catch (error) {
            console.error("authError: " + error);
        return false; // Return false if no user found or error occurs
        }
    };

    const loginUser = async () => {
        alert('Redirecting to login...');
        window.location.href = '../Log/index.html'; // Replace with your login page URL
    };

 // Function to handle button click
    const handleButtonClick = async () => {
        const isAuthenticated = await checkAuthStatus();
        if (isAuthenticated) {
        await logoutUser(); // Call logout if authenticated
        } else {
        await loginUser(); // Redirect to login page if not authenticated
        }
    };

    const loginBtn = document.getElementById('loginBtn');
    loginBtn.addEventListener('click', handleButtonClick);

    (async () => {
        const isAuthenticated = await checkAuthStatus();
        loginBtn.innerHTML = isAuthenticated ? 'Logout' : 'Login';
    })();

