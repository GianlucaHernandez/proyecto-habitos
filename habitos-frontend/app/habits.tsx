type Habit = {
    _id: string;
    title: string;
    description: string;
}

type HabitState = {
    habits: Habit[];
}

export default function Habits({habits}: HabitState) {

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-4 text-black">Habits</h1>
        <ul className="space-y-4">
          {habits.map((habit:Habit) => (
            <li className="flex items-center justify-between" key={habit._id}>
                <span className="text-black">{habit.title}</span>
                <div className="flex items-center space-x-2">
                  <progress className="w-50" value="70" max="100"> </progress>
                  <button className="relative px-2 py-1 text-lg font-bold text-white uppercase transition-all duration-300 bg-blue-600 border border-blue-400 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-blue-500/50 active:scale-95">Done</button>
                </div>
            </li>
          ))}
      </ul>
    </div>
  );
}