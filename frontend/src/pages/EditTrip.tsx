import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditTrip.css";
import { toast } from "react-toastify";

type Props = {
  trips:any;
  setTrips: any;
};

export default function CreateTrip({trips,setTrips}:Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [memo, setMemo] = useState("");
  const [category, setCategory] = useState("");


  const trip = trips.find((trip:any)=>trip.id === Number(id));

  useEffect(()=>{
    if(trip){
        setTitle(trip.title);
        setDestination(trip.destination);
        setCategory(trip.category);
        setStartDate(new Date(trip.start_date).toLocaleDateString("sv-SE"));
        setEndDate(new Date(trip.end_date).toLocaleDateString("sv-SE"));
        setMemo(trip.memo);
    }
  },[]);

  const handleSave = () => {
    const reqFields=[
      {value:title,message:"旅行名を入力してください" },
      {value:destination,message:"行き先を入力してください" },
      {value:category,message:"旅行タイプを選択してください" },
      {value:start_date,message:"開始日を入力してください" },
      {value:end_date,message:"終了日を入力してください" }
    ]
    const error =reqFields.find((field)=>!field.value);
    if(error){
      alert(error.message);
      return
    }
    const UpdatedTrip: any = {
      title,
      destination,
      category,
      start_date,
      end_date,
      memo
    };

    try{
      fetch(`https://travel-planner-api-dksu.onrender.com/trips/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(UpdatedTrip)
      })
        .then((res)=>res.json())
        .then(()=>{
          return fetch("https://travel-planner-api-dksu.onrender.com/trips");
        })
        .then((res)=>res.json())
        .then((data)=>{
          setTrips(data);
          toast.success("旅行内容を更新しました。");
          navigate("/");
        });
    } catch(err){
      toast.error("旅行内容の更新に失敗しました。");
    }
  };

  return (
    <div className="create-trip">
      <h2 className="title">旅行内容を更新</h2>
      <button
      className="back-btn"
      onClick={()=>navigate("/")}
      >
        ＜
      </button>

      <div className="form-group">
        <label>旅行名</label>
        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />
      </div>

      <div className="form-group">
        <label>行き先</label>
        <input
          value={destination}
          onChange={(e) =>
            setDestination(e.target.value)
          }
        />
      </div>

      <div className="radio-group">
        <label>旅行タイプ</label>

        <div className="radio-options">
          <label>
            <input
              type="radio"
              name="category"
              value="国内"
              checked={category === "国内"}
              onChange={(e) => setCategory(e.target.value)}
            />
            国内
          </label>

          <label>
            <input
              type="radio"
              name="category"
              value="海外"
              checked={category === "海外"}
              onChange={(e) => setCategory(e.target.value)}
            />
            海外
          </label>
        </div>
      </div>
      
      <div className="form-group">
        <label>開始日</label>
        <input
          type="date"
          value={start_date}
          onChange={(e) =>
            setStartDate(e.target.value)
          }
        />
      </div>

      <div className="form-group">
        <label>終了日</label>
        <input
          type="date"
          value={end_date}
          onChange={(e) =>
            setEndDate(e.target.value)
          }
        />
      </div>

      <div className="form-group">
        <label>メモ</label>
        <textarea
          value={memo}
          onChange={(e) =>
            setMemo(e.target.value)
          }
        />
      </div>

      <button
        className="button"
        onClick={handleSave}
      >
        更新する
      </button>
      
    </div>
  );
}

