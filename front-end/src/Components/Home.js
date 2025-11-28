import { useEffect } from "react";
export default function Home() {
  // alors ici on consulte sessionStorage pour savoir est ce qu'il ya une erreur/stockage et  si ilya on doit
  // la savoir et puis l'effacer ca se fait a chaque fois en recharge la page home
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
