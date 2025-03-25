export const fetchHabits = async ()=>{
    const response = await fetch("http://localhost:3000/habit");
    if(!response.ok) {
        throw new Error("Failed to fetch habits");
      }
    return response;
}