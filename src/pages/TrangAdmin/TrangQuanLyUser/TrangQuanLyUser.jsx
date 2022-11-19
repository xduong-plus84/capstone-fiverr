import {
  Table,
  Tag,
  Button,
  Modal,
  Popover,
  Popconfirm,
  message,
  Input,
} from "antd";
import {
  EditFilled,
  DeleteFilled,
  UserAddOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React, { Fragment, useEffect, useState } from "react";
import { userServ } from "../../../services/serviceNguoiDung";
import TrangThemUser from "../TrangQuanLyUser/TrangThemUser/TrangThemUser";
import TrangSuaUser from "../TrangQuanLyUser/TrangSuaUser/TrangSuaUser";
import { useDispatch } from "react-redux";
import { SUA_MODAL, THEM_MODAL, XOA_MODAL } from "../constantAdmin";
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../../redux/actions/actionTrangLoading";

const { Search } = Input;

const TrangQuanLyUser = () => {
  const [dataUser, setDataUser] = useState(null);
  const [modalOpen, setModalOpen] = useState({ modalName: "", isOpen: false });
  const [infoUser, setInfoUser] = useState(null);

  const dispatch = useDispatch();

  const showModalThem = () => {
    setModalOpen({ modalName: THEM_MODAL, isOpen: true });
  };

  const showModalSua = (id) => {
    dispatch(setLoadingOnAction());

    userServ
      .layNguoiDungTheoId(id)
      .then((res) => {
        setModalOpen({ modalName: SUA_MODAL, isOpen: true });
        setInfoUser(res.data.content);
        dispatch(setLoadingOffAction());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setModal = (nameModal) => {
    if (nameModal === THEM_MODAL) {
      return <TrangThemUser />;
    } else {
      return <TrangSuaUser infoUser={infoUser} />;
    }
  };

  const titleXoa = `Bạn có chắc muốn xoá?`;

  const handleXoaUser = (id) => {
    dispatch(setLoadingOnAction());

    userServ
      .xoaNguoiDung(id)
      .then(() => {
        message.success("Xoá người dùng thành công!");
        userServ
          .layDsNguoiDung()
          .then((res) => {
            setDataUser(res.data.content);
            dispatch(setLoadingOffAction());
          })
          .catch((err) => {
            console.log(err);
            dispatch(setLoadingOffAction());
          });
      })
      .catch((err) => {
        message.error(err.response?.data);
        dispatch(setLoadingOffAction());
      });
  };

  const handleOk = () => {
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const onSearch = (value) => {
    dispatch(setLoadingOnAction());

    if (value.length > 0) {
      userServ
        .searchNguoiDung(value)
        .then((res) => {
          setDataUser(res.data.content);
          dispatch(setLoadingOffAction());
        })
        .catch((err) => {
          console.log(err);
          dispatch(setLoadingOffAction());
        });
    } else {
      userServ
        .layDsNguoiDung()
        .then((res) => {
          setDataUser(res.data.content);
          dispatch(setLoadingOffAction());
        })
        .catch((err) => {
          console.log(err);
          dispatch(setLoadingOffAction());
        });
    }
  };

  const columns = [
    {
      title: "Mã số",
      dataIndex: "id",
      key: "id",
      width: "10%",
    },

    {
      title: "Họ tên",
      dataIndex: "name",
      key: "id",
      width: "20%",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "id",
      width: "35%",
    },

    {
      title: "Loại người dùng",
      dataIndex: "role",
      key: "id",
      render: (role) =>
        role === "ADMIN" ? (
          <Tag color="#e63946">Quản trị viên</Tag>
        ) : (
          <Tag color="#457b9d">Khách hàng</Tag>
        ),
      width: "15%",
    },

    {
      title: <SettingOutlined className="text-xl" />,
      dataIndex: "id",
      key: "id",
      render: (id, user) => (
        <div className="text-2xl flex justify-center items-center">
          <Popover placement="top" content="Sửa thông tin">
            <button
              className="flex mx-2"
              onClick={() => {
                showModalSua(id);
              }}
            >
              <EditFilled style={{ color: "#457b9d" }} />
            </button>
          </Popover>

          <Popconfirm
            placement="top"
            title={titleXoa}
            onConfirm={() => {
              handleXoaUser(id);
            }}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <button className="flex mx-2">
              <DeleteFilled style={{ color: "#e63946" }} />
            </button>
          </Popconfirm>
        </div>
      ),
      with: "20%",
      align: "center",
    },
  ];

  useEffect(() => {
    dispatch(setLoadingOnAction());

    userServ
      .layDsNguoiDung()
      .then((res) => {
        setDataUser(res.data.content);
        dispatch(setLoadingOffAction());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoadingOffAction());
      });
  }, [modalOpen]);

  return (
    <div>
      <div className="flex items-center justify-between h-20">
        <span className="text-4xl text-left leading-none">
          Quản lý người dùng
        </span>

        <div className="text-right">
          <Popover placement="left" content="Thêm người dùng">
            <Button
              icon={<UserAddOutlined />}
              size="large"
              style={{
                backgroundColor: "#1d3557",
                color: "white",
              }}
              onClick={showModalThem}
            />
          </Popover>

          <Modal
            zIndex={45}
            centered
            open={modalOpen.isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            {setModal(modalOpen.modalName)}
          </Modal>
        </div>
      </div>

      <Search
        className="w-full mb-4"
        size="large"
        placeholder="Nhập tên người dùng"
        onSearch={onSearch}
      />

      <Table columns={columns} dataSource={dataUser} />
    </div>
  );
};
export default TrangQuanLyUser;
