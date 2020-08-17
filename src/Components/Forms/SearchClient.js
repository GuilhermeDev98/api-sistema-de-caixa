import React, { useState } from "react";
import Api from "Services/Api";
import swal from "sweetalert";

const SearchClient = ({ SetClient }) => {
  /*   const [ClientSelected, SetClientSelected] = useState([]); */
  const [Search, SetSearch] = useState();

  const searchClient = async (client) => {
    if (client.length >= 1) {
      try {
        const { data } = await Api.get(`users/search/${client}`);
        SetSearch(data);
      } catch (error) {
        swal("", "Erro, Contacte o Programador !", Error);
      }
    }
  };

  const HandleSelectClient = (client) => {
    SetClient(client);
  };

  return (
    <div className="wrapper">
      <form>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Nome ou CPF do cliente"
            required
            autoComplete="off"
            onChange={(e) => {
              searchClient(e.target.value);
            }}
          />
        </div>
      </form>
      <ul className="list-group">
        {Search &&
          Search.map((client) => (
            <li
              className="list-group-item"
              onClick={() => HandleSelectClient(client)}
              key={client.id}
            >
              <div className="media-body">
                <strong>
                  {client.username} - {client.cpf} - {client.email}
                </strong>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchClient;
