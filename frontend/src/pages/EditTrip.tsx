import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditTrip.css";

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

  const trip = trips.find((trip:any)=>trip.id === Number(id));

  useEffect(()=>{
    if(trip){
        setTitle(trip.title);
        setDestination(trip.destination);
        setStartDate(new Date(trip.start_date).toLocaleDateString("sv-SE"));
        setEndDate(new Date(trip.end_date).toLocaleDateString("sv-SE"));
        setMemo(trip.memo);
    }
  },[]);

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
    const UpdatedTrip: any = {
      title,
      destination,
      start_date,
      end_date,
      memo
    };

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
        navigate("/");
      });
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

