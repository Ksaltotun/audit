import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import './ModalWindow.scss'
import { toggleModal } from '../../redux/reducers/ActionCreators';


export const ModalWindow = (props) => {
    const { isVisible } = useAppSelector((state) => state.ModalWindowReducer)
    const dispatch = useAppDispatch()

    return (
        <Modal
            title="МОДАЛЬНОЕ ОКНО"
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
            <h1>
                ТУТ ИНФА ПРО СИСТЕМУ<br />
                "ИМЯ: аыва" <br />
                "АЙПИ: олловллдфолв"<br />
                "ПОСЛЕДНИЙ РЕПОРТ: гггг.мм.дд" <br />



            </h1>
        </Modal>
    )
}
