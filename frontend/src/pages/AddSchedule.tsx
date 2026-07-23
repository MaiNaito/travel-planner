import { useState } from "react";
import { useParams,useNavigate, useLocation } from "react-router-dom";
import type { Schedule } from "../types/schedule";
import "./AddSchedule.css";

export default function AddSchedule() {
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [memo, setMemo] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const {state} = useLocation();
  const days = state.days;

  const handleSave = () => {
    const reqFields=[
      {value:day,message:"日付を入力してください" },
      {value:time,message:"時間を入力してください" },
      {value:title,message:"タイトルを入力してください" },
      {value:place,message:"場所を入力してください" }
    ]
    const error =reqFields.find((field)=>!field.value);
    if(error){
      alert(error.message);
      return
    }
    
    const newSchedule:Schedule = {
      id: Date.now(),
      trip_id: Number(id), 
      day: Number(day),
      time,
      title,
      place,
      memo,
    };

    console.log(newSchedule);

    fetch("https://travel-planner-api-dksu.onrender.com/schedules",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(newSchedule)
    })
      .then((res)=>res.json())
      .then(()=>{
        navigate(`/trip/${id}`);
      })
  };

  return (
    <div>
      <h2 className="title">予定を追加</h2>
      <button
      className="back-btn"
      onClick={()=>navigate(`/trip/${id}`)}
      >
        ＜
      </button>

      <div className="form-group">
        <label>日付</label>
        <select
          value={day}
          onChange={(e) =>
            setDay(e.target.value)
          }
        >
          {days.map((day:number) => (
          <option key={day} value={day}>
            {day}day
          </option>
           ))}
        </select>
      </div>

      <div className="form-group">
        <label>時間</label>
        <input
          type="time"
          value={time}
          onChange={(e) =>
            setTime(e.target.value)
          }
        />
      </div>

      <div className="form-group">
        <label>タイトル</label>
        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />
      </div>

      <div className="form-group">
        <label>場所</label>
        <input
          value={place}
          onChange={(e) =>
            setPlace(e.target.value)
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
        追加する
      </button>
      
    </div>
  );
}