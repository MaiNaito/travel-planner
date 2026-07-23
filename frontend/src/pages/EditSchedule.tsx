import { useEffect,useState } from "react";
import { useParams,useNavigate, useLocation } from "react-router-dom";
import "./EditSchedule.css";
import type { Schedule } from "../types/schedule";


export default function AddSchedule() {
  const [day, setDay] = useState(1);
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [memo, setMemo] = useState("");  
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const {state} = useLocation();
  const days = state.days;

  const schedule = schedules.find((schedule)=>schedule.id === Number(id));
  console.log(schedule);

  useEffect(()=>{
    if(schedule){
        setDay(schedule.day);
        setTime(schedule.time);
        setTitle(schedule.title);
        setPlace(schedule.place);
        setMemo(schedule.memo);
    }
  },[schedules]);

  useEffect(() => {
    fetch(`https://travel-planner-api-dksu.onrender.com/schedules`)
      .then((res) => res.json())
      .then((data) => {
        setSchedules(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  
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
    
    const updatedSchedule:any = {
      day,
      time,
      title,
      place,
      memo,
    };

    fetch(`https://travel-planner-api-dksu.onrender.com/schedules/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(updatedSchedule)
    })
      .then((res)=>res.json())
      .then(()=>{
        navigate(`/trip/${schedule?.trip_id}`);
      })
  };

  return (
    <div>
      <h2 className="title">予定内容を更新</h2>
      <button
      className="back-btn"
      onClick={()=>navigate(`/trip/${schedule?.trip_id}`)}
      >
        ＜
      </button>

      <div className="form-group">
        <label>日付</label>
        <select
          value={day}
          onChange={(e) =>
            setDay(parseInt(e.target.value))
          }
        >
          {days.map((day:number) => (
          <option key={day }value={day} >
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
        更新する
      </button>
      
    </div>
  );
}