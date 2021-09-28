import React, { Fragment } from 'react';
import { CloseCircleOutlined } from "@ant-design/icons"

export default function ModalTrailer(props) {
    let { modal, trailer, setModal, setTrailer } = props;

    const renderModal = () => {
        if (modal) {
            return <div className="modal modal-active" className={modal ? "modal modal-active" : "modal"}>
                <div className="modal__video">
                    <iframe src={trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <CloseCircleOutlined className="modal__btnClose" />
                </div>
            </div>
        }
        return ""
    }

    /* Close modal when press ESC */
    window.addEventListener("keydown", (e) => {
        e = e || window.event;
        if (e.keyCode === 27) {
            setTrailer("");
            setModal(false);
        }
    })
    /* Close modal when click another place */
    window.addEventListener('mouseup', (e) => {
        setTrailer("");
        setModal(false);
    });

    /* Overflow: hidden when modal is opened */
    if (modal) {
        document.documentElement.style.overflow = 'hidden';
    } else {
        document.documentElement.style.overflow = 'auto';
    }

    return (
        <Fragment>
            {renderModal()}
        </Fragment>
    )
}
