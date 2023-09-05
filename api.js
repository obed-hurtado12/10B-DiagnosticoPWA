// URLS de la API
const apiUrl = "https://reqres.in/api/users?page=1";
const post = "https://reqres.in/api/users";

const tableBody = document.getElementById("user-table-body");
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    data.data.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                 <td>${user.id}</td>
                 <td>${user.first_name}</td>
                 <td>${user.last_name}</td>
                 <td>${user.email}</td>
                 <td><img src="${user.avatar}" class="img-thumbnail" alt="..."></td>
                 <td><button type="button" onclick="updateUser(${user.id})" class="btn btn-outline-warning">Modificar</button></td>
                 <td><button type="button" onclick="deleteUser(${user.id})" class="btn btn-outline-danger">Eliminar</button></td>

             `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => {
    console.error("Error!!!", error);
  });

  const createUser = () => {
    let name = document.getElementById("nombreInput").value;
    let job = document.getElementById("jobInput").value;
  
    const userData = {
      name: name,
      job: job,
    };

    const cuerpo = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    //console.log(JSON.stringify(userData))
    console.log(post, cuerpo)
    fetch(post, cuerpo)
      .then((response) => {
        if (response.status === 201) { 
          return response.json();
        } else {
          throw new Error(
            `La solicitud falló con el código de estado ${response.status}`
          );
        }
      })
      .then((data) => {
        console.log("Nuevo usuario creado:", data);
      })
      .catch((error) => {
        console.error("Error al crear un nuevo usuario:", error);
      });
  };
  


deleteUser = (id) => {
const apiUrl = `https://reqres.in/api/users/${id}`;

fetch(apiUrl, {
  method: 'DELETE'
})
  .then((response) => {
    if (response.status === 204) {
      console.log(`El usuario con el ID ${id} se eliminó exitosamente. `);
      alert(`El usuario con el ID ${id} se eliminó exitosamente. 
      Estado de Petición: ${response.status}`);
    } else {
      console.error(`Error al eliminar el usuario. 
      Estado:${response.status}`);
    }
  })
  .catch((error) => {
    console.error('Error al realizar la petición... ', error);
  });

}
