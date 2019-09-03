var btn= document.getElementById("signsubmit");
btn.addEventListener('click',formdata)

function request() {
    superagent
      .post("/sample")
      .send({ postdata: true, post: "hello" })
      .end(function(err, result) {
        console.log("postResponse", result.body);
        //         document.getElementById(
        //           "text1"
        //         ).innerHTML = `<form id="change" method="post" action="/addname">
        //   <label>Enter Your Name</label><br />
        //   <input
        //     type="text"
        //     name="lastName"
        //     placeholder="Enter last name..."
        //     required
        //   />
        //   <input type="submit" value="Add Name" onclick="formdata()" />
        // </form>`;
        //       });

        document.getElementById("content").innerHTML = `<input
      type="text"
     name="lastName"
     placeholder="Enter last name..."
  required
      />`;

        //   document.getElementById("text1").insertAdjacentHTML("beforeend","<div><button placeholdr ="hsiiii">Click Here</button> </div>")
        // superagent
        //   .get("/sample")
        //   .send({ getdata: true, post: "hey" })
        //   .end(function(err, result) {
        //     console.log("gettResponse", result.body);
        //   });
        // superagent
        //   .put("/sample")
        //   .send({ putdata: true, post: "hiall" })
        //   .end(function(err, result) {
        //     console.log("putResponse", result.body);
        //   });
      });
  }
  function generateCode() {
    return Math.random()
      .toString(36)
      .slice(-8);
  }
  function sendMail(code, mail) {
   
  }
  function formdata() {
    // var result = check();
    // if (result) {

    var Verificationcode = generateCode();
    sendMail(Verificationcode, document.getElementById("email").value);
    superagent
      .post("/signup")
      .send({
        username: document.getElementById("username").value,
        emailid: document.getElementById("email").value,
        password: document.getElementById("password").value,
        code: Verificationcode
      })
      .end(function(err, result) {
        if (err) {
          console.log(err);
        }
        console.log("form data", result.body);
      });
    // }
  }
  function check() {
    if (
      document.getElementById("password").value ==
      document.getElementById("confirmpass").value
    ) {
      document.getElementById("message").style.color = "green";
      document.getElementById("message").innerHTML = "matching";
      document.getElementById("Submit").disabled = false;
    } else {
      document.getElementById("message").style.color = "red";
      document.getElementById("message").innerHTML = "not matching";
      document.getElementById("Submit").disabled = true;
    }
  }

  function logindata() {
    superagent
      .post("/login")
      .send({
        username: document.getElementById("loginusername").value,
        password: document.getElementById("loginpassword").value
      })
      .end(function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log("result", result);
        }
      });
  }