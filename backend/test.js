const fetch = require("node-fetch"); // install node-fetch if not already

async function testRegister() {
  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test User",
      email: "test@example.com",
      password: "123456"
    })
  });
  const data = await res.json();
  console.log("Register Response:", data);
}

async function testLogin() {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "test@example.com",
      password: "123456"
    })
  });
  const data = await res.json();
  console.log("Login Response:", data);
}

(async () => {
  await testRegister();
  await testLogin();
})();
