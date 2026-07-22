import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Trip } from "../types/trip";
import "./CreateTrip.css";
type Props = {
  setTrips: any;
};

export default function CreateTrip({setTrips}:Props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [memo, setMemo] = useState("");

  const handleSave = () => {
    const reqFields=[
      {value:title,message:"旅行名を入力してください" },
      {value:destination,message:"行き先を入力してください" },
      {value:start_date,message:"開始日を入力してください" },
      {value:end_date,message:"終了日を入力してください" }
    ]
    const error =reqFields.find((field)=>!field.value);
    if(error){
      alert(error.message);
      return
    }

    const newTrip: Trip = {
      id: Date.now(),
      title,
      destination,
      start_date,
      end_date,
      memo
    };

    fetch("http://localhost:3001/trips",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(newTrip)
    })
      .then((res)=>res.json())
      .then(()=>{
        return fetch("http://localhost:3001/trips");
      })
      .then((res)=>res.json())
      .then((data)=>{
        setTrips(data);
        navigate("/");
      });
  
  };

  return (
    <div className="create-trip">
      <h2 className="title">新しい旅行を作成</h2>
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
        作成する
      </button>
      
    </div>
  );
}

