import React from "react";
import "./Result.scss";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dataNIM } from "../utilities/dataNIM";

const Result = ({ state }) => {
  const { result } = state;
  const [showCount, setShowCount] = React.useState(10);
  const handleClick = () => {
    setShowCount(
      showCount + 10 <= result.length ? showCount + 10 : result.length
    );
  };
  const backToTop = () => {
    window.scrollTo({ top: 0 });
  };
  const copyText = (text) => {
    copy(text);
    toast.success("Copied to clipboard!", {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  React.useEffect(() => {
    if (result.length < 10) {
      setShowCount(result.length);
    } else {
      setShowCount(10);
    }
  }, [result]);

  const getJurusan = (jurusan) => {
    return dataNIM[jurusan.slice(0, 3)];
  };

  return (
    <section className={`${result.length > 0 ? "result" : "result close"}`}>
      <div className="container">
        <div className="title-container">
          <p>
            Ditampilkan {showCount}/{result.length} hasil.
          </p>
        </div>
        <div className="result-container">
          {result.slice(0, showCount).map((res) => {
            const [nama, nimTPB, nimJurusan] = res;
            return (
              <article>
                <div className="left">
                  <p className="jurusan">
                    {nimJurusan ? getJurusan(nimJurusan) : getJurusan(nimTPB)}
                  </p>
                  <p className="nama" onClick={() => copyText(nama)}>
                    {nama}
                  </p>
                </div>
                <div className="right">
                  {nimTPB && (
                    <p className="nimTPB" onClick={() => copyText(nimTPB)}>
                      {nimTPB}
                    </p>
                  )}
                  {nimJurusan && (
                    <p
                      className="nimJurusan"
                      onClick={() => copyText(nimJurusan)}
                    >
                      {nimJurusan}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        {showCount < result.length && (
          <div className="button-container">
            <button onClick={handleClick}>Tampilkan lebih banyak</button>
          </div>
        )}
      </div>
      {showCount > 10 && (
        <div className="back-container">
          <button className="back" onClick={backToTop}>
            Kembali ke atas
          </button>
        </div>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
};

export default Result;
