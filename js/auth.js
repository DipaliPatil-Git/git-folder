// ======================
// SIGNUP
// ======================

const signupForm = document.getElementById("signup-form");

if (signupForm) {

    signupForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("signup-name").value;

        const email = document.getElementById("signup-email").value;

        const role = document.getElementById("signup-role").value;

        const password = document.getElementById("signup-password").value;

        try {

            // Insert into Supabase
            const { data, error } = await supabaseClient
                .from("users")
                .insert([
                    {
                        name: name,
                        email: email,
                        role: role,
                        password: password
                    }
                ]);

            if (error) {

                alert("Signup Error: " + error.message);

            } else {

                alert("Account Created Successfully!");

                window.location.href = "login.html";

            }

        } catch (err) {

            console.log(err);

            alert("Something went wrong!");

        }

    });

}



// ======================
// LOGIN
// ======================

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("login-email").value;

        const password = document.getElementById("login-password").value;

        try {

            // Check user
            const { data, error } = await supabaseClient
                .from("users")
                .select("*")
                .eq("email", email)
                .eq("password", password);

            if (error) {

                alert("Login Error: " + error.message);

            } else if (data.length > 0) {

                // Save user locally
                localStorage.setItem(
                    "loggedInUser",
                    data[0].name
                );

                alert("Login Successful!");

                window.location.href = "index.html";

            } else {

                alert("Invalid Email or Password");

            }

        } catch (err) {

            console.log(err);

            alert("Something went wrong!");

        }

    });

}