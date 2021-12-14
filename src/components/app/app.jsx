import React, { useState } from "react";
import appStyles from "./app.module.css";
import data from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";

function App() {
  const [modalVisibility, setModaVisibility] = useState(true);
  const modalRef = React.createRef(); // forwardRef?
  const closeIconRef = React.createRef();

  const handleModalOpen = () => {
    setModaVisibility(true);
  };

  const handleModalClose = (evt) => {
    // закрытие попапа по нажатию на оверлей, но не на нем самом
    if (
      (modalRef && !modalRef.current.contains(evt.target)) ||
      (closeIconRef && closeIconRef.current.contains(evt.target))
    )
      setModaVisibility(false);
  };

  return (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} onOpen={handleModalOpen} />
        {modalVisibility && (
          <Modal
            modalRef={modalRef}
            closeIconRef={closeIconRef}
            onClose={handleModalClose}
          ></Modal>
        )}
      </main>
    </>
  );
}

export default App;
