import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const authError = sessionStorage.getItem("auth_error");

    if (authError) {
      alert(authError);

      sessionStorage.removeItem("auth_error");
    }
  }, []);

  return (
    <div className="home dFlex container">
      <div className="mainText">
        <h1>
          Fly Higher, Go Further and Turn Every Destination Into a Lifetime
          Memory
        </h1>
      </div>
    </div>
  );
}
