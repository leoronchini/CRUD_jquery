$(function () {
  var operation = "A"; //"A"=Adição; "E"=Edição; "C"=Convidar
  var selectedIndex = -1; //Índice do item selecionado na lista
  var tbClientes = localStorage.getItem("tbClientes");// Recupera os dados armazenados
  tbClientes = JSON.parse(tbClientes); // Converte string para objeto
  console.log("tabela:")
  console.log(tbClientes)

  if (tbClientes == null) {
    tbClientes = [];
  }

  $("#clearButton").on("click", "#btnClearStorage", function () {
    localStorage.clear();
    location.reload(true);
    alert("limpou o storage")
  });

  $("#formFields").on("submit", function () {
    if (operation == "A") {
      return CreateUser(tbClientes);
    } else if (operation == "C") {
      return inviteUser(tbClientes, selectedIndex);
    } else {
      return editUser(tbClientes, selectedIndex);
    }
  });

  listUser(tbClientes);

  $("#tblListar").on("click", ".editButton", function () {
    operation = "E";
    selectedIndex = parseInt($(this).attr("alt"));
    var cli = JSON.parse(tbClientes[selectedIndex]);
    $("#nameField").val(cli.Nome);
    $("#quantityField").val(cli.QuantidadeVendas);
    $("#nameField").focus();
  });

  $("#tblListar").on("click", ".deleteButton", function () {
    selectedIndex = parseInt($(this).attr("alt"));
    deleteUser(tbClientes, selectedIndex);
    listUser(tbClientes);
  });

  $("#tblListar").on("click", ".inviteButton", function () {
    operation = "C";
    selectedIndex = parseInt($(this).attr("alt"));
    // var cli = JSON.parse(tbClientes[selectedIndex]);
    // inviteUser(tbClientes, selectedIndex);
    $("#nameField").focus();
  });
});

function CreateUser(tbClientes) {
  // var fields = {
  //   "Nome": "Maria",
  //   "QuantidadeVendas": 13,
  //   "Afiliados": [
  //     {
  //       "Nome": "Júlia",
  //       "QuantidadeVendas": 5,
  //       "Afiliados": []
  //     }
  //   ]
  // };
  var fields = JSON.stringify({
    Nome: $("#nameField").val(),
    QuantidadeVendas: $("#quantityField").val(),
    Afiliados: []
  });
  tbClientes.push(fields);
  localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
  alert(tbClientes)
  alert("Registro adicionado.");
  return true;
}

function inviteUser(tbClientes, selectedIndex) {
  var cli = JSON.parse(tbClientes[selectedIndex]);
  var fieldsInvited = JSON.stringify({
    Nome: $("#nameField").val(),
    QuantidadeVendas: $("#quantityField").val(),
    Afiliados: []
  });
  cli['Afiliados'].push(JSON.parse(fieldsInvited));
  cli = JSON.stringify(cli);
  console.log(cli);
  localStorage.setItem("tbClientes", JSON.stringify(cli));
  alert(tbClientes);
  operation = "A";
  return true;
}

function editUser(tbClientes, selectedIndex) {
  tbClientes[selectedIndex] = JSON.stringify({
    Nome: $("#nameField").val(),
    QuantidadeVendas: $("#quantityField").val(),
    Afiliados: []
  });
  localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
  alert("Informações editadas.")
  operation = "A";
  return true;
}

function deleteUser(tbClientes, selectedIndex) {
  tbClientes.splice(selectedIndex, 1);
  localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
  alert("Registro excluído.");

}


function listUser(tbClientes) {
  var table = localStorage.getItem("tbClientes")
  $("#teste").html(table);


  $("#tblListar").html("");
  $("#tblListar").html(
    "<thead>" +
    "   <tr>" +
    "   <th></th>" +
    "   <th>Nome</th>" +
    "   <th>Vendas</th>" +
    "   <th>afiliados</th>" +
    "   </tr>" +
    "</thead>" +
    "<tbody>" +
    "</tbody>"
  );
  for (var i in tbClientes) {
    console.log("ta aqui no for")
    console.log(tbClientes)
    console.log(i)
    var cli = JSON.parse(tbClientes[i]);
    $("#tblListar tbody").append("<tr>");
    $("#tblListar tbody").append("<td><img src='localStorage/edit.png' alt='" + i + "'class='editButton'/><img src='localStorage/delete.png' alt='" + i + "' class='deleteButton'/><img src='localStorage/convidado.png' alt='" + i + "' class='inviteButton'/></td>");
    $("#tblListar tbody").append("<td>" + cli.Nome + "</td>");
    $("#tblListar tbody").append("<td>" + cli.QuantidadeVendas + "</td>");
    // if (cli.Afiliados[i]) {
    //   $("#tblListar tbody").append("<tr>");
    //   $("#tblListar tbody").append("<td>afiliado:<img src='localStorage/edit.png' alt='" + i + "'class='editButton'/><img src='localStorage/delete.png' alt='" + i + "' class='deleteButton'/><img src='localStorage/convidado.png' alt='" + i + "' class='inviteButton'/></td>");
    //   $("#tblListar tbody").append("<td>" + cli.Afiliados[i].Nome + "</td>");
    //   $("#tblListar tbody").append("<td>" + cli.Afiliados[i].QuantidadeVendas + "</td>");
    //   $("#tblListar tbody").append("<td>" + cli.Afiliados[i].Afiliados + "</td>");
    //   $("#tblListar tbody").append("</tr>");
    // }
    $("#tblListar tbody").append("</tr>");

  }
}
