import { useParams,useNavigate } from "react-router-dom";
import "./TripDetail.css";
import { useState,useEffect } from "react";
import type { Schedule } from "../types/schedule";
import type { Trip } from "../types/trip";

export default function TripDetail() {
  const { id } = useParams();
  const [selectedDay, setSelectedDay] =　useState(1);
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip|null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [days, setDays] = useState<number[]>([]);

  const handleAddSchedule = () => {
    navigate(`/trip/${trip?.id}/add`,{state:{days}})
  }

  const getImage = (destination:string,title:string) =>{
    if(destination.includes("ハワイ")|| title.includes("ハワイ")){
      return "/images/hawaii.jpg"
    }
    if(destination.includes("韓国")|| title.includes("韓国")){
      return "/images/korea.jpg"
    }
    if(destination.includes("京都")|| title.includes("京都")){
      return "/images/kyoto.jpg"
    }
    if(destination.includes("沖縄")|| title.includes("沖縄")){
      return "/images/okinawa.jpg"
    }
    if(destination.includes("北海道")|| title.includes("北海道")){
      return "/images/hokkaido.jpg"
    }
    if(destination.includes("アメリカ")|| title.includes("アメリカ")){
      return "/images/usa.jpg"
    }
    return "/images/default.jpg"
  }

  const handleDeleteSchedule = (scheduleId:any) => {
    if(!window.confirm("このスケジュールを削除しますか？")){
      return;
    }
    fetch(`https://travel-planner-api-dksu.onrender.com/schedules/${scheduleId}`,{
      method:"DELETE",
    })
      .then((res)=>res.json())
      .then(()=>{
        return fetch(`https://travel-planner-api-dksu.onrender.com/schedules?trip_id=${id}`);
      })
      .then((res)=>res.json())
      .then((data)=>{
        setSchedules(data);
      });
  };

  const formataDate = (data:any) =>{
    return new Date(data).toLocaleDateString("ja-JP",{
      year: "numeric",
      month: "2-digit",
      day:"2-digit",
    });
  };

  const filteredSchedules = schedules.filter(
    (schedule)=>schedule.day===selectedDay);

  useEffect(() => {
    fetch(`https://travel-planner-api-dksu.onrender.com/trips/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTrip(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`https://travel-planner-api-dksu.onrender.com/schedules?trip_id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSchedules([...data].sort((a,b)=>a.time.localeCompare(b.time)));
        console.log(data);
        console.log(id);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    const start = new Date(trip?.start_date??"");
    const end = new Date(trip?.end_date??"");
    const diff = Math.floor((end.getTime()-start.getTime())/ (1000*60*60*24))+1;
    setDays(Array.from({length:diff},(_,index)=>index+1));
    }, [trip]);

  return (
  <div className="trip-detail">
    <div className="image-wrapper">
    <img
      src={getImage(trip?.destination??"",trip?.title??"")}
      alt={trip?.title}
      className="detail-image"
    />
    <button
      className="back-btn"
      onClick={()=>navigate("/")}
    >
      ＜
    </button>
    </div>

    <div className="trip-info">
      <h2>{trip?.title}</h2>
      <p className="trip-date">
      {formataDate(trip?.start_date)}- {formataDate(trip?.end_date)}
      </p>
    </div>

    <div className="day-tabs">
      {days.map((day) => (
        <button
          key={day}
          className={
            selectedDay === day
              ? "day-btn active"
              : "day-btn"
          }
          onClick={() =>
            setSelectedDay(day)
          }
        >
          Day{day}
        </button>
      ))}
    </div>

    <div className="schedule-list">
      {filteredSchedules.map((schedule) => (
        <div
          key={schedule.id}
          className="schedule-row"
        >
          <div className="schedule-time">
            {schedule.time.slice(0,5)}
          </div>
          <div className="schedule-card">
          <button
            className="edit-btn"
            onClick={()=> navigate(`/schedules/edit/${schedule.id}`,{state:{days}})}>
          ✏️
          </button>             
          <h4>{schedule.title}</h4>
          <button
            className="delete-btn" 
            onClick={()=> handleDeleteSchedule(schedule.id)}>
            ×
          </button>
          <p>{schedule.place}</p>
          </div>
  

        </div>
      ))}
    </div>

    <button 
      className="add-btn"
      onClick={handleAddSchedule}
    >
      ＋予定を追加
    </button>
    
</div>
  );
}