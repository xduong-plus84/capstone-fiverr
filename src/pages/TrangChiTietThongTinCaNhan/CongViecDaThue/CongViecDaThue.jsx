import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { Avatar, List, Space, Popconfirm, message } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../../redux/actions/actionTrangLoading";
import { dichVuServ } from "../../../services/serviceThueCongViec";

const CongViecDaThue = ({ tokenUser }) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const titleXoa = `Bạn có chắc muốn xoá?`;

  const handleXoaDichVu = (id) => {
    dispatch(setLoadingOnAction());

    dichVuServ
      .xoaDichVu(id)
      .then(() => {
        message.success("Xoá dịch vụ thành công!");
        dichVuServ
          .layCongViecDaThueTheoUser(tokenUser)
          .then((res) => {
            setData(res.data.content);
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

  useEffect(() => {
    dispatch(setLoadingOnAction());

    dichVuServ
      .layCongViecDaThueTheoUser(tokenUser)
      .then((res) => {
        setData(res.data.content);
        dispatch(setLoadingOffAction());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoadingOffAction());
      });
  }, []);

  return data.length !== 0 ? (
    <List
      bordered
      style={{
        backgroundColor: "#fff",
        borderColor: "#e5e7eb",
        width: "100%",
      }}
      itemLayout="vertical"
      size="small"
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          extra={<img width={272} alt="logo" src={item.congViec.hinhAnh} />}
        >
          <List.Item.Meta title={item.congViec.tenCongViec} />

          {item.congViec.moTa}

          <Popconfirm
            placement="right"
            title={titleXoa}
            onConfirm={() => {
              handleXoaDichVu(item.id);
            }}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <button className="flex text-2xl">
              <DeleteFilled style={{ color: "#e63946" }} />
            </button>
          </Popconfirm>
        </List.Item>
      )}
    />
  ) : (
    <div
      className="border h-full flex items-center justify-center text-2xl text-red-400"
      style={{ borderColor: "#e5e7eb" }}
    >
      Không có công việc đã thuê
    </div>
  );
};
export default CongViecDaThue;
