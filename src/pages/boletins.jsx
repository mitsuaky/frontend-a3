import { useState, useEffect } from "react";

function Boletins() {
  const [boletins, setBoletins] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [random, setRandom] = useState([]);

  const [boletimEdit, setBoletimEdit] = useState({});

  useEffect(() => {
    getBoletins();
  }, []);

  useEffect(() => {
    getTurmas();
  }, []);

  useEffect(() => {
    getAlunos();
  }, []);

  function updateRandom() {
    setRandom(Math.floor(Math.random() * 10));
  }

  function getBoletins() {
    fetch("http://localhost:3333/boletim/v2").then((response) => {
      response.json().then((data) => {
        console.log(data);
        setBoletins(data["boletins"]);
      });
    });
  }

  function getTurmas() {
    fetch("http://localhost:3333/turma").then((response) => {
      response.json().then((data) => {
        console.log(data);
        setTurmas(data);
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

  function editBoletim(e) {
    e.preventDefault();

    fetch(`http://localhost:3333/boletim/${boletimEdit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aluno: e.target[0].value,
        turma: e.target[1].value,
        nota: e.target[2].value,
      }),
    }).then((response) => {
      if (response.status === 200) {
        getBoletins();
      }
    });
  }

  function deleteBoletim(id) {
    fetch(`http://localhost:3333/boletim/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        getBoletins();
      }
    });
  }

  function adiconarBoletim(e) {
    e.preventDefault();
    fetch("http://localhost:3333/boletim", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aluno: e.target[0].value,
        turma: e.target[1].value,
        nota: e.target[2].value,
      }),
    }).then((response) => {
      if (response.status === 200) {
        getBoletins();
      }
    });
  }

  if (!boletins) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center my-6">
        <h1 className="text-3xl font-bold">Boletins</h1>
        <label
          htmlFor="adicionar-boletim"
          className="btn btn-primary btn-md"
          onClick={updateRandom}
        >
          Adicionar Boletim
        </label>
      </div>
      <table className="table w-full table-zebra text-center">
        <thead>
          <tr className="">
            <th>ID</th>
            <th>Aluno</th>
            <th>Turma</th>
            <th>Nota Final</th>
            <th>Aprovado</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {/* Create a new row for each turma */}
          {boletins.map((boletim) => (
            <tr key={boletim.id}>
              <td>{boletim.id}</td>
              <td>{boletim.aluno}</td>
              <td>{boletim.turma}</td>
              <td>{boletim.nota}</td>
              <td>{boletim.nota >= 6 ? "✔️" : "❌"}</td>
              <td>
                <label
                  className="btn"
                  htmlFor="editar-boletim"
                  onClick={() => setBoletimEdit(boletim)}
                >
                  ✏️
                </label>
              </td>
              <td>
                <a className="btn" onClick={() => deleteBoletim(boletim.id)}>
                  🗑️
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Adicionar Turma */}
      <input type="checkbox" id="adicionar-boletim" className="modal-toggle" />
      <div className="modal">
        <label className="btn btn-sm btn-circle absolute right-2 top-2">
          ✕
        </label>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Adicionar Novo Boletim</h3>
          <label
            htmlFor="adicionar-boletim"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={adiconarBoletim}>
            <label className="label">
              <span className="label-text">Aluno</span>
            </label>
            <select className="input input-secondary">
              {alunos.map((aluno) => (
                <option key={aluno.id} value={aluno.id}>
                  {aluno.nome}
                </option>
              ))}
            </select>

            <label className="label">
              <span className="label-text">Turma</span>
            </label>
            <select className="input input-secondary">
              {turmas.map((turma) => (
                <option key={turma.id} value={turma.id}>
                  {turma.id}
                </option>
              ))}
            </select>

            <label className="label">
              <span className="label-text">Nota Final</span>
            </label>
            <input
              type="text"
              className="input input-secondary"
              defaultValue={random}
            />

            <div className="modal-action">
              <input
                type="submit"
                value="Criar"
                className="btn btn-primary"
                // close the modal
                onClick={() =>
                  (document.getElementById("adicionar-boletim").checked = false)
                }
              />
            </div>
          </form>
        </div>
      </div>

      {/* Editar Turma */}
      <input type="checkbox" id="editar-boletim" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Editar Boletim</h3>
          <label
            htmlFor="editar-boletim"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={editBoletim}>
            <label className="label">
              <span className="label-text">Aluno</span>
            </label>
            <select className="input input-secondary">
              {alunos.map((aluno) => (
                <option
                  key={aluno.id}
                  value={aluno.id}
                  selected={aluno.nome === boletimEdit.aluno}
                >
                  {aluno.nome}
                </option>
              ))}
            </select>

            <label className="label">
              <span className="label-text">Turma</span>
            </label>
            <select className="input input-secondary">
              {turmas.map((turma) => (
                <option
                  key={turma.id}
                  value={turma.id}
                  selected={turma.disciplina === boletimEdit.turma}
                >
                  {turma.id}
                </option>
              ))}
            </select>

            <label className="label">
              <span className="label-text">Nota Final</span>
            </label>
            <input
              type="text"
              className="input input-secondary"
              defaultValue={boletimEdit.nota}
            />

            <div className="modal-action">
              <input
                type="submit"
                value="Editar"
                className="btn btn-primary"
                // close the modal
                onClick={() =>
                  (document.getElementById("editar-boletim").checked = false)
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Boletins;
