import TripCard from "../components/TripCard";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import type { Trip } from "../types/trip";
type Props ={
  trips: Trip[]
  setTrips:any;
}

export default function Home({trips,setTrips}:Props) {
const navigate = useNavigate();

const handleCreateTrip = () => {
  navigate("/create");
}

  return (
    <div>
      <h1 className="home-title">Travel Planner</h1>
      <h2 className="home-subtitle">あなたの旅行</h2>
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} setTrips={setTrips}/>
      ))}
      <button
        className="button"
        onClick={handleCreateTrip}
      >
        ＋旅行を作成
      </button>
    </div>
  );
}