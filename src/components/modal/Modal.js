import React, { Fragment } from 'react';
import { CloseCircleOutlined } from "@ant-design/icons"

export default function Modal(props) {
    let { modal, trailer, setModal, setTrailer } = props;

    const renderModal = () => {
        if (modal) {
            return <div className="modal modal-active" className={modal ? "modal modal-active" : "modal"}>  r
                <div className="modal__video">
                    <iframe  src={trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <CloseCircleOutlined className="modal__btnClose"/>
                </div>
            </div>
        }
        return ""
    }

    /* Close modal when press ESC */
    window.addEventListener("keydown", (e) => {
        e = e || window.event;
        if (e.keyCode == 27) {
            setTrailer("");
            setModal(false);
        }
    })
    /* Close modal when click another place */
    window.addEventListener('mouseup', (e) => {
        setTrailer("");
        setModal(false);
    });

    return (
        <Fragment>
            {renderModal()}
        </Fragment>
    )
}
