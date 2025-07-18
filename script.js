function maskPassword(pass){
  let str="";
  for (let index = 0; index < pass.length; index++) {
    str += "*";
    
  }
  return str;
}
function copyText(txt){
  navigator.clipboard.writeText(txt);
  // alert("Copied the text: ",txt);
  document.querySelector(".copy").classList.remove("alert");
  setTimeout(()=>{
    document.querySelector(".copy").classList.add("alert");
  },2000);
}
const deletePassword = (website)=>{
  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data);
  arrUpdated = arr.filter((e)=>{
    return e.website != website;
  })
  localStorage.setItem("passwords", JSON.stringify(arrUpdated));
  alert(`Successfully Deleted! ${website}'s and password`);
  showPasswords();
}
//Logic to fill the table
let showPasswords = () => {
  const tb = document.querySelector(".dataTable");
  let data = localStorage.getItem("passwords");
  if (data == null) {
    tb.innerHTML = `<h1>No Data To Show</h1>`;
    } 
    else {
        tb.innerHTML=`<tr>
                        <th>Website</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Delete</th>
                     </tr>`;
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        str += `<tr>
                    <td>${element.website}</td>
                    <td>${element.username}<img onclick="copyText('${element.username}')" src="copy.svg" alt="Copy Button" class="copySvg"></td>
                    <td>${maskPassword(element.password)}<img onclick="copyText('${element.password}')" src="copy.svg" alt="Copy Button" class="copySvg"></td>
                    <td><button onclick="deletePassword('${element.website}')" class="delBtn">Delete</button></td>
                </tr>`;
        }
        tb.innerHTML = tb.innerHTML + str;
    }
    website.value="";
    username.value="";
    password.value="";
};
showPasswords();
document.querySelector(".btn").addEventListener("click", (event) => {
  event.preventDefault();
  console.log("the button was clicked");
  console.log(website.value, username.value, password.value);
  let passwords = localStorage.getItem("passwords");
  console.log("the password is : ", passwords);
  if (passwords == null) {
    let json = [];
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert("Your Password successfully saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert("Your Password successfully saved");
    localStorage.setItem("passwords", JSON.stringify(json));
    showPasswords();
  }
});
