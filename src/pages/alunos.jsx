import { useEffect, useState } from "react";

function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [alunoEdit, setAlunoEdit] = useState({});

  useEffect(() => {
    getAlunos();
  }, []);

  function getAlunos() {
    fetch("http://localhost:3333/aluno").then((response) => {
      response.json().then((data) => {
        console.log(data);
        setAlunos(data);
      });
    });
  }

  function editAluno(e) {
    e.preventDefault();

    fetch(`http://localhost:3333/aluno/${alunoEdit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: e.target[0].value,
        cpf: e.target[1].value,
        matricula: e.target[2].value,
        sala: e.target[3].value,
      }),
    }).then((response) => {
      if (response.status === 200) {
        getAlunos();
      }
    });
  }

  function deleteAluno(id) {
    fetch(`http://localhost:3333/aluno/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        getAlunos();
      }
    });
  }

  //   Check if aluno has boletim, if so, check if boletim has nota, if so,

  function adiconarAluno(e) {
    e.preventDefault();
    fetch("http://localhost:3333/aluno", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: e.target[0].value,
        cpf: e.target[1].value,
        matricula: e.target[2].value,
        sala: e.target[3].value,
      }),
    }).then((response) => {
      if (response.status === 202) {
        getAlunos();
      }
    });
  }

  if (!alunos) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center my-6">
        <h1 className="text-3xl font-bold">Alunos</h1>
        <label htmlFor="adicionar-aluno" className="btn btn-primary btn-md">
          Adicionar Aluno
        </label>
      </div>
      <table className="table w-full table-zebra text-center">
        <thead>
          <tr className="">
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Matrícula</th>
            <th>Módulo</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {/* Create a new row for each turma */}
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>
                {/* Return the professor name by the id */}
                {aluno.cpf}
              </td>
              <td>{aluno.matricula}</td>
              <td>{aluno.sala}</td>
              <td>
                <label
                  className="btn"
                  htmlFor="editar-aluno"
                  onClick={() => setAlunoEdit(aluno)}
                >
                  ✏️
                </label>
              </td>
              <td>
                <a className="btn" onClick={() => deleteAluno(aluno.id)}>
                  🗑️
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Adicionar Turma */}
      <input type="checkbox" id="adicionar-aluno" className="modal-toggle" />
      <div className="modal">
        <label className="btn btn-sm btn-circle absolute right-2 top-2">
          ✕
        </label>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Adicionar Novo Aluno</h3>
          <label
            htmlFor="adicionar-aluno"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={adiconarAluno}>
            <label className="label">
              <span className="label-text">Nome</span>
            </label>
            <input type="text" className="input input-secondary" />

            <label className="label">
              <span className="label-text">CPF</span>
            </label>
            <input type="text" className="input input-secondary" />

            <label className="label">
              <span className="label-text">Matrícula</span>
            </label>
            <input type="text" className="input input-secondary" />

            <label className="label">
              <span className="label-text">Módulo</span>
            </label>
            <select className="select select-secondary">
              <option value="1">1</option>
              <option value="2" disabled>
                2
              </option>
              <option value="3" disabled>
                3
              </option>
            </select>

            <div className="modal-action">
              <input
                type="submit"
                value="Criar"
                className="btn btn-primary"
                // close the modal
                onClick={() =>
                  (document.getElementById("adicionar-aluno").checked = false)
                }
              />
            </div>
          </form>
        </div>
      </div>

      {/* Editar Turma */}
      <input type="checkbox" id="editar-aluno" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Editar Aluno</h3>
          <label
            htmlFor="editar-aluno"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={editAluno}>
            <label className="label">
              <span className="label-text">Nome</span>
            </label>
            <input
              type="text"
              className="input input-secondary"
              defaultValue={alunoEdit.nome}
            />

            <label className="label">
              <span className="label-text">CPF</span>
            </label>
            <input
              type="text"
              className="input input-secondary"
              defaultValue={alunoEdit.cpf}
            />

            <label className="label">
              <span className="label-text">Matrícula</span>
            </label>
            <input
              type="text"
              className="input input-secondary"
              defaultValue={alunoEdit.matricula}
            />

            <label className="label">
              <span className="label-text">Módulo</span>
            </label>
            <select className="select select-secondary">
              <option value="1">1</option>
              <option value="2" disabled>
                2
              </option>
              <option value="3" disabled>
                3
              </option>
            </select>

            <div className="modal-action">
              <input
                type="submit"
                value="Editar"
                className="btn btn-primary"
                // close the modal
                onClick={() =>
                  (document.getElementById("editar-aluno").checked = false)
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Alunos;
