import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import "./ModalWindow.scss";
import { toggleModal } from "../../redux/reducers/ActionCreators";

export const ModalWindow = (props) => {
  const { isVisible } = useAppSelector((state) => state.ModalWindowReducer);
  const dispatch = useAppDispatch();

  return (
    <Modal
      title="КИС 'Управление'"
      className="systemDetail"
      centered={true}
      open={isVisible}
      onOk={() => dispatch(toggleModal(false))}
      onCancel={() => dispatch(toggleModal(false))}
      width={1000}
      footer={[
        <Button key="back" onClick={() => dispatch(toggleModal(false))}>
          Закрыть
        </Button>,
      ]}
    >
      <dl>
        <dt>Адрес:</dt>
        <dd>192.168.0.1</dd>

        <dt>Последний репорт получен</dt>
        <dd>26.11.2024</dd>

        <dt>Последний инцидент:</dt>
        <dd>Ошибка авторизации пользователя</dd>
      </dl>
    </Modal>
  );
};
