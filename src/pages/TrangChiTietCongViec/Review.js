import { Comment, List, Rate, Avatar, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { serviceBinhLuan } from "../../services/serviceBinhLuan";
import { serviceLocalStorage } from "../../services/serviceLocalStorage";
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../redux/actions/actionTrangLoading";
import { useDispatch } from "react-redux";
const { TextArea } = Input;

//form comment
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={
      <div>
        <span className="text-3xl font-semibold text-left pt-14 mr-2 mt-14">
          Comments
        </span>
        ({comments.length} replies)
      </div>
    }
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        className="bg-[#48d048] py-2 px-3 rounded-full font-medium text-white border-2 border-transparent hover:text-[#48d048] hover:bg-white hover:border-[#48d048] duration-300"
      >
        Add Comment
      </button>
    </Form.Item>
  </>
);

export default function Review({ maCongViec }) {
  let dispatch = useDispatch();

  let renderRate = () => {
    return (
      <div className="flex flex-col max-w-xl bg-transparent text-gray-800 mx-auto py-14">
        <div className="flex flex-col w-full">
          <h2 className="text-3xl font-semibold text-left">Customer reviews</h2>
          <div className="flex flex-wrap items-center mt-2 mb-1 space-x-2">
            <Rate disabled allowHalf value={1} />
            <span className="text-gray-500 mt-1">(20)</span>
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex items-center space-x-1">
              <span className="flex-shrink-0 w-12 text-sm">5 star</span>
              <div className="flex-1 h-4 overflow-hidden rounded-sm bg-gray-300">
                <div className="bg-orange-300 h-4 w-5/6"></div>
              </div>
              <span className="flex-shrink-0 w-12 text-sm text-right">83%</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="flex-shrink-0 w-12 text-sm">4 star</span>
              <div className="flex-1 h-4 overflow-hidden rounded-sm bg-gray-300">
                <div className="bg-orange-300 h-4 w-4/6"></div>
              </div>
              <span className="flex-shrink-0 w-12 text-sm text-right">67%</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="flex-shrink-0 w-12 text-sm">3 star</span>
              <div className="flex-1 h-4 overflow-hidden rounded-sm bg-gray-300">
                <div className="bg-orange-300 h-4 w-3/6"></div>
              </div>
              <span className="flex-shrink-0 w-12 text-sm text-right">50%</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="flex-shrink-0 w-12 text-sm">2 star</span>
              <div className="flex-1 h-4 overflow-hidden rounded-sm bg-gray-300">
                <div className="bg-orange-300 h-4 w-2/6"></div>
              </div>
              <span className="flex-shrink-0 w-12 text-sm text-right">33%</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="flex-shrink-0 w-12 text-sm">1 star</span>
              <div className="flex-1 h-4 overflow-hidden rounded-sm bg-gray-300">
                <div className="bg-orange-300 h-4 w-1/6"></div>
              </div>
              <span className="flex-shrink-0 w-12 text-sm text-right">17%</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // form commnet
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // dispatch(setLoadingOnAction());
    serviceBinhLuan
      .layBinhLuanTheoCongViec(maCongViec)
      .then((res) => {
        let result = res.data.content;
        // result.map((item, index) => {
        //   console.log("item: ", item);
        //   let { ngayBinhLuan, noiDung, saoBinhLuan, tenNguoiBinhLuan, avatar } =
        //     item;
        //   console.log("index", index);
        //   return setComments([
        //     ...comments,
        //     {
        //       author: tenNguoiBinhLuan,
        //       avatar: avatar,
        //       content: <p>{noiDung}</p>,
        //       datetime: ngayBinhLuan,
        //     },
        //   ]);
        // });

        let ordersData = result.map((item) => {
          // console.log("item: ", item);
          let avatar;
          item.avatar
            ? (avatar = item.avatar)
            : (avatar = "https://joeschmoe.io/api/v1/random");
          return {
            author: item.tenNguoiBinhLuan,
            avatar: avatar,
            content: <p>{item.noiDung}</p>,
            datetime: item.ngayBinhLuan,
          };
        });
        // console.log("ordersData: ", ordersData);
        setComments(ordersData);
        // setComments([
        //   ...comments,
        //   {
        //     author: result[1].tenNguoiBinhLuan,
        //     avatar: result[1].avatar,
        //     content: <p>{result[1].noiDung}</p>,
        //     datetime: result[1].ngayBinhLuan,
        //   },
        // ]);
        // dispatch(setLoadingOffAction());
      })
      .catch((err) => {
        console.log(err);
        // dispatch(setLoadingOffAction());
      });
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments([
        ...comments,
        {
          author: serviceLocalStorage.user.get()?.user.name,
          avatar: "https://joeschmoe.io/api/v1/random",
          content: <p>{value}</p>,
          datetime: moment().format("DD/MM/YYYY"),
        },
      ]);
      let data = {
        maCongViec: maCongViec,
        maNguoiBinhLuan: serviceLocalStorage.user.get()?.user.id,
        ngayBinhLuan: moment().format("DD/MM/YYYY"),
        noiDung: value,
        saoBinhLuan: 5,
      };

      dispatch(setLoadingOnAction());
      serviceBinhLuan
        .binhLuan(data)
        .then((res) => {
          console.log(res);
          dispatch(setLoadingOffAction());
        })
        .catch((err) => {
          console.log(err);
          dispatch(setLoadingOffAction());
        });
    }, 500);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  let renderCommentForm = () => {
    return (
      <div className="flex flex-col max-w-xl bg-transparent text-gray-800 mx-auto">
        <CommentList comments={comments} />
        <Comment
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    );
  };
  return (
    <div className="review w-full mt-14 shadow-xl rounded-xl">
      {renderRate()}
      {/* {renderComment()} */}
      {renderCommentForm()}
    </div>
  );
}
