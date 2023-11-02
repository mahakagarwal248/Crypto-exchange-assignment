import { syncData } from "../libs/apiEndpoints";
import "./Header.css";

function Header({ param, setParam, totalCount }) {
  const onSync = async (e) => {
    e.preventDefault();
    const res = await syncData()
      .then((data) => data)
      .catch((err) => {
        window.alert(err);
        return err;
      });
    if (res?.status === 200) {
      setParam({ ...param, pageNumber: 0 });
      window.alert("Data synced successfully");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div>
        <h3 className="header-h1">Top crypto exchanges</h3>
        <p className="header-p">
          Compare all {totalCount} top crypto exchanges. The list is ranked by
          trading volume
        </p>
      </div>
      <div style={{ position: "absolute", right: "10px", top: "25px" }}>
        <button className="sync-btn" onClick={(e) => onSync(e)}>
          Sync Data
        </button>
      </div>
    </div>
  );
}

export default Header;
