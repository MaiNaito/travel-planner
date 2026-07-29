import TripCard from "../components/TripCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Home.css";
import type { Trip } from "../types/trip";
type Props ={
  trips: Trip[]
  setTrips:any;
}

export default function Home({trips,setTrips}:Props) {
const [sortType, setSortType] = useState("dateAsc");
const [filterType,setFilterType]=useState("すべて");
const navigate = useNavigate();
const filteredTrips =
  filterType==="すべて"
    ? trips
    : trips.filter(
        trip => trip.category===filterType
      );
const sortedTrips = [...filteredTrips];

switch (sortType) {
  case "dateAsc":
    sortedTrips.sort(
      (a, b) =>
        new Date(a.start_date).getTime() -
        new Date(b.start_date).getTime()
    );
    break;

  case "dateDesc":
    sortedTrips.sort(
      (a, b) =>
        new Date(b.start_date).getTime() -
        new Date(a.start_date).getTime()
    );
    break;

  case "new":
    sortedTrips.sort((a, b) => b.id - a.id);
      break;
}


const handleCreateTrip = () => {
  navigate("/create");
}

  return (
    <div>
      <h1 className="home-title">Travel Planner</h1>
      <h2 className="home-subtitle">あなたの旅行</h2>
      <div className="sort-container">
        <label htmlFor="sort">並び替え</label>
        <select
          id="sort"
          className="sort-select"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="dateAsc">出発日が近い順</option>
          <option value="dateDesc">出発日が遠い順</option>
          <option value="new">新しく作成した順</option>
        </select>
      </div>

      <div className="filter-group">
      <p>旅行タイプ</p>

      <div className="filter-options">
        <label>
          <input
            type="radio"
            name="filterType"
            value="すべて"
            checked={filterType === "すべて"}
            onChange={(e) => setFilterType(e.target.value)}
          />
          すべて
        </label>

        <label>
          <input
            type="radio"
            name="filterType"
            value="国内"
            checked={filterType === "国内"}
            onChange={(e) => setFilterType(e.target.value)}
          />
          国内
        </label>

        <label>
          <input
            type="radio"
            name="filterType"
            value="海外"
            checked={filterType === "海外"}
            onChange={(e) => setFilterType(e.target.value)}
          />
          海外
        </label>
      </div>
    </div>
      {
        trips.length === 0 ? (
          <p>まだ旅行がありません</p>
        ) : (
          sortedTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              setTrips={setTrips}
            />
          ))
        )
      }
      <button
        className="button"
        onClick={handleCreateTrip}
      >
        ＋旅行を作成
      </button>
    </div>
  );
}