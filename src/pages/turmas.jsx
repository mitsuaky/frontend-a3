import { useEffect, useState } from "react";

function Turmas() {
  const [turmas, setTurmas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [turmaEdit, setTurmaEdit] = useState({});

  useEffect(() => {
    getTurmas();
  }, []);

  useEffect(() => {
    getProfessors();
  }, []);

  useEffect(() => {
    getAlunos();
  }, []);

  function getTurmas() {
    fetch("http://localhost:3333/turma/v2").then((response) => {
      response.json().then((data) => {
        console.log(data);
        setTurmas(data);
      });
    });
  }

  function getProfessors() {
    fetch("http://localhost:3333/professor").then((response) => {
      response.json().then((data) => {
        console.log(data);
        setProfessores(data);
      });
    });
  }

  function getAlunos() {
    fetch("http://localhost:3333/aluno").then((response) => {
      response.json().then((data) => {
        console.log(data);
        setAlunos(data);
      });
    });
  }

  function editTurma(e) {
    e.preventDefault();

    fetch(`http://localhost:3333/turma/${turmaEdit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        professor: e.target[0].value,
        disciplina: professores.find(
          (professor) => professor.id == e.target[0].value
        ).disciplina,
      }),
    }).then((response) => {
      if (response.status === 200) {
        getTurmas();
      }
    });
  }

  function deleteTurma(id) {
    fetch(`http://localhost:3333/turma/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        getTurmas();
      }
    });
  }

  function adiconarTurma(e) {
    e.preventDefault();
    fetch("http://localhost:3333/turma", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        professor: e.target[0].value,
        disciplina: professores.find(
          (professor) => professor.id == e.target[0].value
        ).disciplina,
        // alunos: [],
      }),
    }).then((response) => {
      if (response.status === 202) {
        getTurmas();
      }
    });
  }

  if (!turmas || !professores || !alunos) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center my-6">
        <h1 className="text-3xl font-bold">Turmas</h1>
        <label htmlFor="adicionar-turma" className="btn btn-primary btn-md">
          Adicionar Turma
        </label>
      </div>
      <table className="table w-full table-zebra text-center">
        <thead>
          <tr className="">
            <th>ID</th>
            <th>Professor</th>
            <th>Disciplina</th>
            {/* <th>Alunos</th> */}
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {/* Create a new row for each turma */}
          {turmas.map((turma) => (
            <tr key={turma.id}>
              <td>{turma.id}</td>
              <td>
                {/* Return the professor name by the id */}
                {turma.professor}
              </td>
              <td>{turma.disciplina}</td>
              {/* <td>
                <a className="btn">Ver Alunos</a>
              </td> */}
              <td>
                <label
                  className="btn"
                  htmlFor="editar-turma"
                  onClick={() => setTurmaEdit(turma)}
                >
                  ✏️
                </label>
              </td>
              <td>
                <a className="btn" onClick={() => deleteTurma(turma.id)}>
                  🗑️
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Adicionar Turma */}
      <input type="checkbox" id="adicionar-turma" className="modal-toggle" />
      <div className="modal">
        <label className="btn btn-sm btn-circle absolute right-2 top-2">
          ✕
        </label>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Adicionar Nova Turma</h3>
          <label
            htmlFor="adicionar-turma"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={adiconarTurma}>
            <label className="label">
              <span className="label-text">Professor</span>
            </label>
            <select className="select select-secondary w-full max-w-xs">
              {/* Create a new option for each professor */}
              {professores.map((professor) => (
                <option key={professor.id} value={professor.id}>
                  {professor.nome}
                </option>
              ))}
            </select>

            <label className="label">
              <span className="label-text">Alunos</span>
            </label>
            <select
              className="select select-secondary w-full max-w-xs"
              multiple
            >
              {/* Create a new option for each aluno */}
              {alunos.map((aluno) => (
                <option key={aluno.id} value={aluno.id}>
                  {aluno.nome}
                </option>
              ))}
            </select>
            <div className="modal-action">
              <input
                type="submit"
                value="Criar"
                className="btn btn-primary"
                // close the modal
                onClick={() =>
                  (document.getElementById("adicionar-turma").checked = false)
                }
              />
            </div>
          </form>
        </div>
      </div>

      {/* Editar Turma */}
      <input type="checkbox" id="editar-turma" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Editar Turma</h3>
          <label
            htmlFor="editar-turma"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={editTurma}>
            <label className="label">
              <span className="label-text">Professor</span>
            </label>
            <select className="select select-secondary w-full max-w-xs">
              {/* Create a new option for each professor */}
              {professores.map((professor) => (
                <option key={professor.id} value={professor.id}>
                  {professor.nome}
                </option>
              ))}
            </select>

            <label className="label">
              <span className="label-text">Alunos</span>
            </label>
            <select
              className="select select-secondary w-full max-w-xs"
              multiple
              defaultValue={turmaEdit.alunos}
            >
              {/* Create a new option for each aluno */}
              {alunos.map((aluno) => (
                <option key={aluno.id} value={aluno.id}>
                  {aluno.nome}
                </option>
              ))}
            </select>

            <div className="modal-action">
              <input
                type="submit"
                value="Editar"
                className="btn btn-primary"
                // close the modal
                onClick={() =>
                  (document.getElementById("editar-turma").checked = false)
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Turmas;
