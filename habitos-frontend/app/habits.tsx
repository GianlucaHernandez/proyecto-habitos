import { useSelector, useDispatch } from "react-redux";
import { markAsDoneThunk } from "@/features/habit/habitSlice";
import { AppDispatch, RootState } from "@/Redux/store";
import { fetchHabitsThunk } from "@/features/habit/habitSlice";

type Habit = {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    days: number;
    lastDone: Date;
    lastUpdated: Date;
}

type HabitsProps = {
    habits: Habit[];
}

const handleMarkAsDone = (habitId: string, dispatch: AppDispatch) => {
  dispatch(markAsDoneThunk(habitId));
  dispatch(fetchHabitsThunk());
}

export default function Habits({habits}: HabitsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.habits.status);
  const error = useSelector((state: RootState) => state.habits.error);

  const calcularProgress = (days: number): number => {
    return Math.min((days / 66) * 100, 100);
  }
  
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-4 text-black">Habits</h1>
        <ul className="space-y-4">
          {habits.map((habit:Habit) => (
            <li className="flex items-center justify-between" key={habit._id}>
                <span className="text-black">{habit.title}</span>
                <div className="flex items-center space-x-2">
                  <progress className="w-30" value={calcularProgress(habit.days)} max="100"> </progress>
                  <button className="relative px-3 py-2 text-sm font-bold text-white uppercase transition-all duration-300 bg-blue-400 border border-blue-200 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-blue-500/50 active:scale-95"onClick={() => handleMarkAsDone(habit._id,dispatch)}>{status[habit._id] === "loading"?"Processing" : "Done"} </button>
                  {status[habit._id] === "failed" && <span className="text-red-500">{error[habit._id]}</span>}
                  {status[habit._id] === "success" && <span className="text-green-500">Already marked as done!</span>}
                </div>
            </li>
          ))}
      </ul>
    </div>
  );
}