import { useNavigate } from "react-router-dom";
import type { Trip } from "../types/trip";
import "./TripCard.css";


type Props = {
  trip: Trip;
  setTrips: any;
};

export default function TripCard({
  trip,
  setTrips
}: Props) {
  const navigate = useNavigate();

  const getImage = (trip:any) =>{
    if(trip.destination.includes("ハワイ")||trip.title.includes("ハワイ")){
      return "/images/hawaii.jpg"
    }
    if(trip.destination.includes("韓国")||trip.title.includes("韓国")){
      return "/images/korea.jpg"
    }
    if(trip.destination.includes("京都")||trip.title.includes("京都")){
      return "/images/kyoto.jpg"
    }
    if(trip.destination.includes("沖縄")||trip.title.includes("沖縄")){
      return "/images/okinawa.jpg"
    }
    if(trip.destination.includes("北海道")||trip.title.includes("北海道")){
      return "/images/hokkaido.jpg"
    }
    if(trip.destination.includes("アメリカ")||trip.title.includes("アメリカ")){
      return "/images/usa.jpg"
    }
    return "/images/default.jpg"
  }


  const handleDelete = (id:any) => {
    if(!window.confirm("本当に旅行予定を削除しますか？")){
      return;
    }
    fetch(`http://localhost:3001/trips/${id}`,{
      method:"DELETE",
    })
      .then((res)=>res.json())
      .then(()=>{
        return fetch("http://localhost:3001/trips");
      })
      .then((res)=>res.json())
      .then((data)=>{
        setTrips(data);
      });
  };

  const formataDate = (data:any) =>{
    return new Date(data).toLocaleDateString("ja-JP",{
      year: "numeric",
      month: "2-digit",
      day:"2-digit",
    });
  };


  return (
    <div
      className="trip-card"
    >
      <img
        src={getImage(trip??"")}
        alt={trip.title}
        onClick={() =>
          navigate(`/trip/${trip.id}`)
        }
      />
      <button
        className="delete-btn" 
        onClick={()=> handleDelete(trip.id)}>
        ×
      </button>

 

      <div className="trip-card-body">
        <h3>
          {trip.title}
          <br />
        </h3>
        <p className="trip-date">
        {formataDate(trip.start_date)}
          〜
        {formataDate(trip.end_date)}
        </p>
        <button
        className="btn"
        onClick={()=> navigate(`/edit/${trip.id}`)}>
        編集
      </button> 
      </div>
    </div>
  );
}