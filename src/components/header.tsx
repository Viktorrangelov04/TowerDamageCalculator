import { ModeToggle } from "./ModeToggle.tsx";

export default function Header() {
    return (
        <header className="flex justify-between items-center mb-8 border-b pb-4">
            <h1 className="text-3xl font-bold tracking-tight">Damage Calculator</h1>
            
            {/* The toggle sits nicely on the right side */}
            <ModeToggle />
        </header>
    );
}

