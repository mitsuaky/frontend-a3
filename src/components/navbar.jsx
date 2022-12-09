import { NavLink } from "react-router-dom";

function navbar() {
  return (
    <div className="navbar bg-slate-800 text-primary-content ">
      <div className="navbar-start">
        <NavLink
          to="/"
          className="btn btn-ghost normal-case text-xl text-secondary"
        >
          Escola Criativa
        </NavLink>
      </div>
      <div className="navbar-center">
        <NavLink className="btn btn-ghost normal-case" to="turmas">
          Turmas
        </NavLink>
        <NavLink className="btn btn-ghost normal-case" to="professores">
          Professores
        </NavLink>
        <NavLink className="btn btn-ghost normal-case" to="alunos">
          Alunos
        </NavLink>
        <NavLink className="btn btn-ghost normal-case" to="boletins">
          Boletins
        </NavLink>
      </div>
    </div>
  );
}

export default navbar;
