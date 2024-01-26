import { Button } from "@/components/ui/button";
import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1>Vite + React</h1>
            <div className="card">
                <Button
                    className="rounded bg-blue-500 px-4  py-2 font-bold text-white hover:bg-blue-700"
                    onClick={() => setCount((count) => count + 1)}
                >
                    count is {count}
                </Button>
            </div>
        </>
    );
}

export default App;
