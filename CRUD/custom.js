const table = document.getElementById("userTable");

function getUserList(){
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response=>response.json())
    .then(json => {
        for(user of json){
            table.innerHTML+= `<tr>
                <td><input type="text" class="text-box" id="name_${user.id}" value='${user.name}'></td>
                <td><input type="text" class="text-box" id="username_${user.id}" value='${user.username}'></td>
                <td><input type="text" class="text-box" id="email_${user.id}" value='${user.email}'></td>
                <td>
                    <button class="buton" onclick='updateUser(${user.id})'>Güncelle</button>
                    <button class="buton" onclick="deleteUser(${user.id})">Sil</button>
                </td>
            </tr>`
        }
    })
}

getUserList();


function refreshData(){
    getUserList();
} 


function createUser(){
    let data = {
        name:document.getElementById("name").value || "Değer Yok",
        username:document.getElementById("username").value || "Geçersiz",
        email:document.getElementById("email").value || "Geçersiz",
    };
    fetch("https://jsonplaceholder.typicode.com/users",{
        method:"POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        body:JSON.stringify(data)
    })
    .then(response=>response.json())
    .then(json => {
            console.log(json);
            table.innerHTML+= `<tr>
                <td><input type="text" class="form-control" id="" value="${data.name}"></td>
                <td><input type="text" class="form-control" id="" value="${data.username}"></td>
                <td><input type="text" class="form-control" id="" value="${data.email}"></td>
                <td>
                <a href="" class="btn btn-warning" onclick='updateUser(${data.id})'>Güncelle</a>
                <a href="" class="btn btn-danger" onclick='deleteUser(${data.id})'>Sil</a>
                </td> 
            </tr>`
    })
    .catch((error)=>{
        console.log("Hata",error);
    })
}

function updateUser(id){
    console.log(id);
    let data = {
        name:document.getElementById("name_"+id).value || "Geçersiz",
        username:document.getElementById("username_"+id).value || "Geçersiz",
        email:document.getElementById("email_"+id).value || "Geçersiz"
    };
    console.log(data); 
    fetch("https://jsonplaceholder.typicode.com/users",{
        method:"PUT",
        headers:{
            'Content-type': 'application/json; charset=UTF-8',
        },
        body:JSON.stringify(data),
    })
    .then((response)=>response.json())
    .then((json) => console.log("Kullanıcı Düzenlendi ",(json) ))
    .catch((error)=>console.log(error))
}


function deleteUser(id){
    console.log(id);
    fetch("https://jsonplaceholder.typicode.com/users"+id,{
        method:"DELETE",
        headers:{
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response=>console.log(response))
    .then(data=>{
        console.log("Kullanıcı Silindi",data);
    })
    .catch((error)=>console.log(error));
}
