import React, { Fragment, useState } from 'react';
import { Modal, Rate } from 'antd';
import { CloseCircleOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT } from '../../redux/types/QuanLyNguoiDungType';

export default function ModalComment() {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [contentComment, setContentComment] = useState("");
    const [start, setStart] = useState(0)
    const dispatch = useDispatch()

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        let today = new Date();
        let date = await today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        
        let userComment = {
            id: 10,
            name: `${userLogin.taiKhoan}`,
            like: 0,
            score: start,
            comment: contentComment,
            avatar: "/images/header/avatar.jfif",
            day: date
        }

        dispatch({
            type: ADD_COMMENT,
            userComment,
        })
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setStart(0)
    };

    const handleStartRate = (value) => {
        setStart(value)
    };

    const handleComment = (e) => {
        let { value } = e.target
        setContentComment(value)
    }

    return (
        <Fragment>
            <div className="comment__modal-toggle" onClick={showModal}>
                <img type="text" src="/images/header/avatar.jfif" alt="UserName" onError={(e) => { e.target.onError = null; e.target.src = `/images/header/avatar-user.jpg` }} />
                <input placeholder="Bạn nghĩ gì về bộ phim này?" />
                <Rate disabled allowHalf defaultValue={100} />
            </div>
            <Modal
                okText="Đăng"
                cancelText="Hủy"
                closeIcon={<CloseCircleOutlined />}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="comment__modal">
                    <h3>{(start * 2).toFixed(1)}</h3>
                    <div className="comment__modal-startRate">
                        <Rate allowHalf defaultValue={start} onChange={handleStartRate} />
                    </div>
                    <textarea placeholder="Bạn nghĩ gì về phim này..." name="comment" onChange={handleComment}></textarea>
                </div>
            </Modal>
        </Fragment>
    )
}

