import { useState, useEffect } from "react";

function Professores() {
  const [professores, setProfessores] = useState([]);
  const [professorEdit, setProfessorEdit] = useState({});

  useEffect(() => {
    getProfessors();
  }, []);

  function getProfessors() {
    fetch("http://localhost:3333/professor").then((response) => {
      response.json().then((data) => {
        console.log(data);
        setProfessores(data);
      });
    });
  }

  function editProfessor(e) {
    e.preventDefault();

    fetch(`http://localhost:3333/professor/${professorEdit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: e.target[0].value,
        cpf: e.target[1].value,
        titulosAcademicos: e.target[2].value,
      }),
    }).then((response) => {
      if (response.status === 200) {
        getProfessors();
      }
    });
  }

  function deleteProfessor(id) {
    fetch(`http://localhost:3333/professor/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        getProfessors();
      }
    });
  }

  function adiconarProfessor(e) {
    e.preventDefault();
    fetch("http://localhost:3333/professor", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: e.target[0].value,
        cpf: e.target[1].value,
        titulosAcademicos: e.target[2].value,
        disciplina: e.target[3].value,
      }),
    }).then((response) => {
      if (response.status === 202) {
        getProfessors();
      }
    });
  }

  if (!professores) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center my-6">
        <h1 className="text-3xl font-bold">Professores</h1>
        <label htmlFor="adicionar-professor" className="btn btn-primary btn-md">
          Adicionar Professor
        </label>
      </div>
      <table className="table w-full table-zebra text-center">
        <thead>
          <tr className="">
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Título Acadêmico</th>
            <th>Disciplina</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {/* Create a new row for each turma */}
          {professores.map((professor) => (
            <tr key={professor.id}>
              <td>{professor.id}</td>
              <td>{professor.nome}</td>
              <td>
                {/* Return the professor name by the id */}
                {professor.cpf}
              </td>
              <td>{professor.titulosAcademicos}</td>
              <td>{professor.disciplina}</td>
              <td>
                <label
                  className="btn"
                  htmlFor="editar-professor"
                  onClick={() => setProfessorEdit(professor)}
                >
                  ✏️
                </label>
              </td>
              <td>
                <a
                  className="btn"
                  onClick={() => deleteProfessor(professor.id)}
                >
                  🗑️
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Adicionar Turma */}
      <input
        type="checkbox"
        id="adicionar-professor"
        className="modal-toggle"
      />
      <div className="modal">
        <label className="btn btn-sm btn-circle absolute right-2 top-2">
          ✕
        </label>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Adicionar Novo Professor</h3>
          <label
            htmlFor="adicionar-professor"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={adiconarProfessor}>
            <label className="label">
              <span className="label-text">Nome</span>
            </label>
            <input type="text" className="input input-secondary" />

            <label className="label">
              <span className="label-text">CPF</span>
            </label>
            <input type="text" className="input input-secondary" />

            <label className="label">
              <span className="label-text">Título Acadêmico</span>
            </label>
            <input type="text" className="input input-secondary" />

            <label className="label">
              <span className="label-text">Disciplina</span>
            </label>
            <input type="text" className="input input-secondary" />

            <div className="modal-action">
              <input
                type="submit"
                value="Criar"
                className="btn btn-primary"
                // close the modal
                onClick={() =>
                  (document.getElementById(
                    "adicionar-professor"
                  ).checked = false)
                }
              />
            </div>
          </form>
        </div>
      </div>

      {/* Editar Turma */}
      <input type="checkbox" id="editar-professor" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Editar Professor</h3>
          <label
            htmlFor="editar-professor"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={editProfessor}>
            <label className="label">
              <span className="label-text">Nome</span>
            </label>
            <input
              type="text"
              className="input input-secondary"
              defaultValue={professorEdit.nome}
            />

            <label className="label">
              <span className="label-text">CPF</span>
            </label>
            <input
              type="text"
              className="input input-secondary"
              defaultValue={professorEdit.cpf}
            />

            <label className="label">
              <span className="label-text">Título Acadêmico</span>
            </label>
            <input
              type="text"
              className="input input-secondary"
              defaultValue={professorEdit.titulosAcademicos}
            />

            <label className="label">
              <span className="label-text">Disciplina</span>
            </label>
            <input
              type="text"
              readOnly
              className="input input-secondary input-disabled"
              defaultValue={professorEdit.disciplina}
            />

            <div className="modal-action">
              <input
                type="submit"
                value="Editar"
                className="btn btn-primary"
                // close the modal
                onClick={() =>
                  (document.getElementById("editar-professor").checked = false)
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Professores;
