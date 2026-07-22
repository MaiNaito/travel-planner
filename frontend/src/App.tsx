import { BrowserRouter,Routes, Route  } from "react-router-dom";
import { useState,useEffect } from "react";
import Home from "./pages/Home";
import CreateTrip from "./pages/CreateTrip";
import TripDetail from "./pages/TripDetail";
import AddSchedule from "./pages/AddSchedule";
import EditTrip from "./pages/EditTrip";
import type { Trip } from "./types/trip";
import EditSchedule from "./pages/EditSchedule";

function App() {
  const [trips,setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/trips")
      .then((res) => res.json())
      .then((data) => {
        setTrips(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>

      <Routes>

      <Route 
        path="/" 
        element={<Home trips={trips} setTrips={setTrips}/>}        
      />
      <Route
        path="/create"
        element={<CreateTrip setTrips={setTrips}/>}
      />
      <Route
        path="/edit/:id"
        element={<EditTrip trips={trips} setTrips={setTrips}/>}
      />
      <Route 
        path="/trip/:id" 
        element={<TripDetail />}
      />
      <Route 
        path="/trip/:id/add"
        element={<AddSchedule />}
      />
      <Route
        path="/schedules/edit/:id"
        element={<EditSchedule />}
      />

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
