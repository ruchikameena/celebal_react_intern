import { useLocation } from "react-router-dom";

const SuccessPage = () => {
  const { state } = useLocation();

  return (
    <div className="userData">
      <h2>Form Submitted Successfully!</h2>
      <h4>Here is the entry filled by user</h4>
      <div>
        {state &&
          Object.entries(state).map(([Key, value]) => (
            <div Key={Key} style={{ marginBottom: "2px", fontSize: "16px" }}>
              <strong>{Key}:</strong>
              <span>{value}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SuccessPage;
