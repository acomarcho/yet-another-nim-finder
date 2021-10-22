import React from "react";
import "./Search.scss";
import data from "../utilities/data.min";
import { FaSearch } from "react-icons/fa";

const Search = ({ state, changeInput, updateRes }) => {
  React.useEffect(() => {
    const { query } = state;
    console.log(query);
    if (query.length >= 3) {
      const res = data.filter((person) => {
        const [name, nimTPB, nimJurusan] = person;
        let condition = false;
        if (name) {
          condition = condition || name.toLowerCase().includes(query);
        }
        if (nimTPB) {
          condition = condition || nimTPB.includes(query);
        }
        if (nimJurusan) {
          condition = condition || nimJurusan.includes(query);
        }
        return condition;
      });
      updateRes(res);
    } else {
      updateRes([]);
    }
    // eslint-disable-next-line
  }, [state.query]);

  return (
    <section className="search">
      <div className="info">
        <p>Yet another NIM finder. Copyright &copy; Marchotridyo.</p>
      </div>
      <div className="container">
        <form>
          <FaSearch />
          <input
            type="text"
            placeholder="Masukkan NIM atau nama"
            value={state.query}
            onChange={(e) => changeInput(e.target.value)}
          />
        </form>
      </div>
      <div className="tip">
        <p>Klik nama atau NIM untuk menyalinnya!</p>
      </div>
    </section>
  );
};

export default Search;
